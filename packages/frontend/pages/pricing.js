import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function Pricing() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/subscriptions/plans');
      setPlans(response.data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-20">
      <h1 className="text-5xl font-bold text-center mb-12">Simple, Transparent Pricing</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-blue-500 transition">
            <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
            <p className="text-gray-400 mb-4">{plan.description}</p>
            <div className="text-4xl font-bold mb-6">${plan.price}/mo</div>
            <ul className="space-y-2 mb-8">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="text-gray-300">✅ {feature}</li>
              ))}
            </ul>
            <Link href={`/subscribe?plan=${plan.id}`}>
              <button className="w-full py-3 bg-blue-600 rounded font-bold hover:bg-blue-700 transition">
                Subscribe Now
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
