'use client';

import { useState } from 'react';

// Indian number formatting function
const formatIndianNumber = (num: number): string => {
  if (num < 1000) {
    return num.toString();
  }
  
  const numStr = Math.round(num).toString();
  const len = numStr.length;
  
  if (len <= 3) {
    return numStr;
  } else if (len <= 5) {
    // Thousands (1,000 to 99,999)
    return numStr.slice(0, len - 3) + ',' + numStr.slice(len - 3);
  } else if (len <= 7) {
    // Lakhs (1,00,000 to 99,99,999)
    return numStr.slice(0, len - 5) + ',' + numStr.slice(len - 5, len - 3) + ',' + numStr.slice(len - 3);
  } else {
    // Crores (1,00,00,000 and above)
    const crores = Math.floor(num / 10000000);
    const remainder = num % 10000000;
    
    if (remainder === 0) {
      return crores + ' crore' + (crores > 1 ? 's' : '');
    } else if (remainder < 100000) {
      const thousands = Math.floor(remainder / 1000);
      if (thousands === 0) {
        return crores + ' crore' + (crores > 1 ? 's' : '');
      } else {
        return crores + ' crore' + (crores > 1 ? 's' : '') + ' ' + formatIndianNumber(remainder);
      }
    } else {
      const lakhs = Math.floor(remainder / 100000);
      const remainingAfterLakhs = remainder % 100000;
      
      let result = crores + ' crore' + (crores > 1 ? 's' : '') + ' ' + lakhs + ' lakh' + (lakhs > 1 ? 's' : '');
      
      if (remainingAfterLakhs > 0) {
        result += ' ' + formatIndianNumber(remainingAfterLakhs);
      }
      
      return result;
    }
  }
};

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-heading-1 font-bold text-gray-900 mb-6">
            Compound Interest Calculator
          </h1>
          <p className="text-body-large text-gray-600 leading-relaxed">
            See how your money grows with the power of compound interest!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div className="card p-8 animate-scale-in">
            <h2 className="text-heading-2 font-bold text-gray-900 mb-8">Investment Details</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-body font-semibold text-gray-700 mb-3">Principal Amount (₹)</label>
                <input
                  type="number"
                  value={principal}
                  onChange={e => setPrincipal(Number(e.target.value))}
                  className="input-enhanced"
                  min={0}
                  placeholder="Enter your initial investment"
                />
              </div>
              <div>
                <label className="block text-body font-semibold text-gray-700 mb-3">Annual Interest Rate (%)</label>
                <input
                  type="number"
                  value={rate}
                  onChange={e => setRate(Number(e.target.value))}
                  className="input-enhanced"
                  min={0}
                  step={0.01}
                  placeholder="Enter interest rate"
                />
              </div>
              <div>
                <label className="block text-body font-semibold text-gray-700 mb-3">Investment Period (Years)</label>
                <input
                  type="number"
                  value={years}
                  onChange={e => setYears(Number(e.target.value))}
                  className="input-enhanced"
                  min={1}
                  placeholder="Enter number of years"
                />
              </div>
              <div>
                <label className="block text-body font-semibold text-gray-700 mb-3">Compounding Frequency</label>
                <select
                  value={compoundsPerYear}
                  onChange={e => setCompoundsPerYear(Number(e.target.value))}
                  className="input-enhanced"
                >
                  <option value={1}>Annually (1x per year)</option>
                  <option value={2}>Semi-Annually (2x per year)</option>
                  <option value={4}>Quarterly (4x per year)</option>
                  <option value={12}>Monthly (12x per year)</option>
                  <option value={365}>Daily (365x per year)</option>
                </select>
              </div>
            </form>
          </div>

          {/* Results */}
          <div className="card p-8 text-center animate-slide-in-right">
            <h2 className="text-heading-2 font-bold text-gray-900 mb-8">Your Investment Growth</h2>
            
            {/* Main Result */}
            <div className="mb-8">
              <div className="text-6xl font-black bg-gradient-to-r from-gray-700 to-slate-700 bg-clip-text text-transparent mb-4">
                ₹{formatIndianNumber(total)}
              </div>
              <p className="text-body-large text-gray-600">Final Amount</p>
            </div>

            {/* Breakdown */}
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl">
                <span className="text-body font-semibold text-gray-700">Initial Investment:</span>
                <span className="text-body-large font-bold text-gray-700">₹{formatIndianNumber(principal)}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                <span className="text-body font-semibold text-gray-700">Interest Earned:</span>
                <span className="text-body-large font-bold text-green-600">₹{formatIndianNumber(interest)}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl">
                <span className="text-body font-semibold text-gray-700">Growth:</span>
                <span className="text-body-large font-bold text-blue-600">
                  {((interest / principal) * 100).toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Formula */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-body-small text-gray-600 mb-2">Formula Used:</p>
              <code className="text-body font-mono bg-white px-3 py-1 rounded text-gray-800">
                A = P(1 + r/n)<sup>nt</sup>
              </code>
            </div>
          </div>
        </div>

        {/* Educational Content */}
        <div className="card p-10 mt-12 animate-fade-in">
          <h3 className="text-heading-2 font-bold text-gray-900 mb-8 text-center">Understanding Compound Interest</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-slate-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl">📈</span>
              </div>
              <h4 className="text-heading-3 font-semibold text-gray-900 mb-3">Exponential Growth</h4>
              <p className="text-body text-gray-600 leading-relaxed">Your money grows faster over time as you earn interest on both your principal and previously earned interest</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-slate-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl">⏰</span>
              </div>
              <h4 className="text-heading-3 font-semibold text-gray-900 mb-3">Time is Key</h4>
              <p className="text-body text-gray-600 leading-relaxed">The longer you invest, the more powerful compound interest becomes. Start early to maximize growth</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-slate-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl">🔄</span>
              </div>
              <h4 className="text-heading-3 font-semibold text-gray-900 mb-3">Compounding Frequency</h4>
              <p className="text-body text-gray-600 leading-relaxed">More frequent compounding (monthly vs annually) leads to slightly higher returns over time</p>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-gradient-to-r from-gray-700 via-slate-700 to-blue-700 rounded-2xl p-8 mt-8 text-white animate-slide-in-left">
          <h3 className="text-heading-2 font-bold mb-6 text-center">💡 Pro Tips for Indian Teens</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-yellow-400 text-xl">🎯</span>
                <div>
                  <h4 className="font-semibold mb-1">Start with SIPs</h4>
                  <p className="text-gray-100 text-body-small">Systematic Investment Plans let you invest small amounts regularly</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-400 text-xl">📱</span>
                <div>
                  <h4 className="font-semibold mb-1">Use Apps</h4>
                  <p className="text-gray-100 text-body-small">Apps like Groww, Zerodha allow investments starting from ₹100</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-yellow-400 text-xl">🏦</span>
                <div>
                  <h4 className="font-semibold mb-1">PPF & ELSS</h4>
                  <p className="text-gray-100 text-body-small">Tax-saving options with good compound growth potential</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-400 text-xl">💰</span>
                <div>
                  <h4 className="font-semibold mb-1">Pocket Money</h4>
                  <p className="text-gray-100 text-body-small">Even ₹500/month can grow to lakhs over 10-15 years!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 