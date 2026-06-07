import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';

export default function Subscribe() {
  const router = useRouter();
  const { plan } = router.query;
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('authToken');
      const cardElement = elements.getElement(CardElement);
      
      // Create payment method
      const { paymentMethod, error: pmError } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (pmError) throw new Error(pmError.message);

      // Create subscription
      const response = await axios.post(
        'http://localhost:3001/api/subscriptions/create',
        {
          planId: plan,
          paymentMethodId: paymentMethod.id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert('✅ Subscription created successfully!');
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6">Subscribe to {plan}</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Card Details</label>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                  },
                },
              }}
            />
          </div>

          {error && <p className="text-red-600 mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading || !stripe}
            className="w-full py-3 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Subscribe Now'}
          </button>
        </form>
      </div>
    </div>
  );
}
