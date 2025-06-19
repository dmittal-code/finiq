'use client';

import { useState } from 'react';

export default function CompoundInterestPageClient() {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(5);
  const [compoundsPerYear, setCompoundsPerYear] = useState(4);

  const calculateCompoundInterest = () => {
    const n = compoundsPerYear;
    const t = years;
    const r = rate / 100;
    const A = principal * Math.pow(1 + r / n, n * t);
    return A;
  };

  const total = calculateCompoundInterest();
  const interest = total - principal;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Compound Interest Calculator
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            See how your money grows with compound interest!
          </p>
        </div>

        {/* Calculator Form */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Principal (₹)</label>
              <input
                type="number"
                value={principal}
                onChange={e => setPrincipal(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none"
                min={0}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Annual Interest Rate (%)</label>
              <input
                type="number"
                value={rate}
                onChange={e => setRate(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none"
                min={0}
                step={0.01}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Years</label>
              <input
                type="number"
                value={years}
                onChange={e => setYears(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none"
                min={1}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Compounds Per Year</label>
              <select
                value={compoundsPerYear}
                onChange={e => setCompoundsPerYear(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none"
              >
                <option value={1}>Annually</option>
                <option value={2}>Semi-Annually</option>
                <option value={4}>Quarterly</option>
                <option value={12}>Monthly</option>
                <option value={365}>Daily</option>
              </select>
            </div>
          </form>
        </div>

        {/* Results */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Results</h2>
          <div className="text-lg text-gray-700 mb-2">
            <span className="font-semibold">Total Value:</span> ₹{total.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          <div className="text-lg text-gray-700 mb-2">
            <span className="font-semibold">Interest Earned:</span> ₹{interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          <div className="text-sm text-gray-500 mt-4">
            Formula: <code>A = P(1 + r/n)<sup>nt</sup></code>
          </div>
        </div>
      </div>
    </div>
  );
} 