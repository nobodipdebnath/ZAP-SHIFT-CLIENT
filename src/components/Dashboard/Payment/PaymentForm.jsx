import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import useTrackingLogger from "../../../Layout/useTrackingLogger";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#0f172a",
      fontFamily:
        "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      "::placeholder": {
        color: "#94a3b8",
      },
      iconColor: "#475569",
      letterSpacing: "0.3px",
      // lineHeight removed to avoid Stripe warning
    },
    invalid: {
      color: "#991b1b",
      iconColor: "#991b1b",
    },
  },
  hidePostalCode: false,
};

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const{logTracking} = useTrackingLogger();
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const { data: parcelInfo = {},} = useQuery({
    queryKey: ["parcel", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${id}`);
      return res.data;
    },
  });

  const amount = parcelInfo.cost;
  const amountInCents = amount * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!stripe || !elements) {
      setErrorMsg("Payment system is not ready");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setErrorMsg("Card field not found");
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setErrorMsg(error.message || "Payment method creation failed");
      console.log("Stripe error:", error);
    } else {
      setSuccessMsg("Payment method created: " + paymentMethod.id);
      // console.log("Payment method:", paymentMethod);
      // এখানে paymentIntent backend এ create করে confirm করতে হবে

      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
        id,
      });

      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        console.log(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          console.log("Payment Succeeded");
          // console.log(result);

          const paymentData = {
            id,
            email: user.email,
            amount,
            transactionId: result.paymentIntent.id,
            paymentMethod: result.paymentIntent.payment_method_types,
          }
          const paymentRes = await axiosSecure.post('/payments', paymentData);
          if(paymentRes.data.insertedId){
            Swal.fire({
              position: "center",
              icon: "success",
              title: `${amount} taka Payment Succeeded`,
              showConfirmButton: false,
              timer: 1500
            });
            await logTracking(
              {
                tracking_id: parcelInfo.tracking_id,
                status: 'Payment_done',
                derails: `Paid by ${user.displayName}`,
                updated_by: user.email
              }
            )
            navigate('/dashboard/myParcels')
          }
        }
      }
    }
  };

  return (
    <div className="mx-auto max-w-md p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-xl font-semibold text-slate-900 mb-3">Payment</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm font-medium text-slate-700">
          Card details
        </label>

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-300 transition">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>

        {errorMsg && (
          <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded">
            {errorMsg}
          </p>
        )}

        {successMsg && (
          <p className="text-sm text-green-700 bg-green-50 px-3 py-2 rounded">
            {successMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={!stripe}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium shadow-sm transition"
        >
          Pay {amount} taka
        </button>

        <p className="text-xs text-slate-500">
          Test card: <code>4242 4242 4242 4242</code>, any expiry, CVC 123
        </p>
      </form>
    </div>
  );
};

export default PaymentForm;
