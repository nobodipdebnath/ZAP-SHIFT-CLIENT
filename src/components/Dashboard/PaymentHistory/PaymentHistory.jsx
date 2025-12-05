import React, { useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loading from '../../Shared/Loading';
import { Search, ArrowUpDown } from "lucide-react";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [search, setSearch] = useState("");
    const [sortType, setSortType] = useState(""); // amount/date

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        }
    });


    // ---- FILTER ----
    const filtered = payments.filter((p) =>
        p.transactionId.toLowerCase().includes(search.toLowerCase()) ||
        p.paymentMethod.toLowerCase().includes(search.toLowerCase()) ||
        p.amount.toString().includes(search)
    );

    // ---- SORT ----
    if (sortType === "amount-asc") {
        filtered.sort((a, b) => a.amount - b.amount);
    } else if (sortType === "amount-desc") {
        filtered.sort((a, b) => b.amount - a.amount);
    } else if (sortType === "date-asc") {
        filtered.sort((a, b) => new Date(a.paid_at) - new Date(b.paid_at));
    } else if (sortType === "date-desc") {
        filtered.sort((a, b) => new Date(b.paid_at) - new Date(a.paid_at));
    }

    return (
        <div className="p-6 bg-white rounded-xl shadow">
            <h1 className="text-center text-4xl font-bold text-green-blue mb-6">
                Payment History
            </h1>

            {/* ---- SORT BUTTONS ---- */}
            <div className="flex gap-3 mb-4">
                <button
                    onClick={() => setSortType(sortType === "amount-asc" ? "amount-desc" : "amount-asc")}
                    className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-slate-100"
                >
                    Amount <ArrowUpDown size={16} />
                </button>

                <button
                    onClick={() => setSortType(sortType === "date-asc" ? "date-desc" : "date-asc")}
                    className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-slate-100"
                >
                    Date <ArrowUpDown size={16} />
                </button>
            </div>

            {/* ---- TABLE ---- */}
            <div className="overflow-x-auto border rounded-xl">
                <table className="min-w-full text-sm text-left text-slate-700">
                    <thead className="bg-slate-100 text-slate-900 font-semibold text-sm">
                        <tr>
                            <th className="px-6 py-3 border">#</th>
                            <th className="px-6 py-3 border">Amount</th>
                            <th className="px-6 py-3 border">Method</th>
                            <th className="px-6 py-3 border">Transaction ID</th>
                            <th className="px-6 py-3 border">Paid At</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center py-6 text-slate-500 font-medium"
                                >
                                    No payment found
                                </td>
                            </tr>
                        ) : (
                            filtered.map((pay, index) => (
                                <tr
                                    key={pay._id}
                                    className={`hover:bg-slate-50 transition ${
                                        index % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                                    }`}
                                >
                                    <td className="px-6 py-3 border">{index + 1}</td>
                                    <td className="px-6 py-3 border font-semibold text-green-700">
                                        {pay.amount} ৳
                                    </td>
                                    <td className="px-6 py-3 border capitalize">
                                        {pay.paymentMethod}
                                    </td>
                                    <td className="px-6 py-3 border text-blue-600 font-medium">
                                        {pay.transactionId}
                                    </td>
                                    <td className="px-6 py-3 border">
                                        {new Date(pay.paid_at).toLocaleString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
