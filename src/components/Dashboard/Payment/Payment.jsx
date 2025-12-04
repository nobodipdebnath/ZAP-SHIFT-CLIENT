import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe('pk_test_51SaclPBQMmNM5bRNRhWdVXsCod2H5W6BNZfXWN8LyvmiEkvwk7f9ty6aUaH1fZiQ2okk4Cl0mVcut8BeWwYVu5gK00ouZ4F4B3')
const Payment = () => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm></PaymentForm>
        </Elements>
    );
};

export default Payment;