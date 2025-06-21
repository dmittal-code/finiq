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

export default function RuleOf72PageClient() {
  const [interestRate, setInterestRate] = useState(8);
  const [principal, setPrincipal] = useState(100000);
  const [calculationMode, setCalculationMode] = useState<'time' | 'rate'>('time');
  const [targetYears, setTargetYears] = useState(9);

  const calculateDoublingTime = (rate: number) => {
    return 72 / rate;
  };

  const calculateRequiredRate = (years: number) => {
    return 72 / years;
  };

  const calculateActualCompoundGrowth = (principal: number, rate: number, years: number) => {
    return principal * Math.pow(1 + rate / 100, years);
  };

  const doublingTime = calculateDoublingTime(interestRate);
  const requiredRate = calculateRequiredRate(targetYears);
  const doubledAmount = principal * 2;
  const actualCompoundAmount = calculateActualCompoundGrowth(principal, interestRate, doublingTime);
  const ruleOf72Accuracy = ((doubledAmount / actualCompoundAmount) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-heading-1 font-bold text-gray-900 mb-6">
            Rule of 72 Calculator
          </h1>
          <p className="text-body-large text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Discover how long it takes for your money to double! The Rule of 72 is a simple formula to estimate doubling time for investments.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Calculator Form */}
          <div className="card p-8 animate-scale-in">
            <h2 className="text-heading-2 font-bold text-gray-900 mb-8">Calculate Your Doubling Time</h2>
            
            {/* Calculation Mode Toggle */}
            <div className="mb-6">
              <label className="block text-body font-semibold text-gray-700 mb-3">What do you want to calculate?</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setCalculationMode('time')}
                  className={`p-3 rounded-xl font-semibold transition-all duration-200 ${
                    calculationMode === 'time'
                      ? 'bg-gradient-to-r from-gray-700 to-slate-700 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  📅 Doubling Time
                </button>
                <button
                  onClick={() => setCalculationMode('rate')}
                  className={`p-3 rounded-xl font-semibold transition-all duration-200 ${
                    calculationMode === 'rate'
                      ? 'bg-gradient-to-r from-gray-700 to-slate-700 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  📈 Required Rate
                </button>
              </div>
            </div>

            <form className="space-y-6">
              {/* Principal Amount */}
              <div>
                <label className="block text-body font-semibold text-gray-700 mb-3">Initial Investment (₹)</label>
                <input
                  type="number"
                  value={principal}
                  onChange={e => setPrincipal(Number(e.target.value))}
                  className="input-enhanced"
                  min={1000}
                  step={1000}
                  placeholder="Enter your investment amount"
                />
              </div>

              {calculationMode === 'time' ? (
                <div>
                  <label className="block text-body font-semibold text-gray-700 mb-3">Annual Interest Rate (%)</label>
                  <input
                    type="number"
                    value={interestRate}
                    onChange={e => setInterestRate(Number(e.target.value))}
                    className="input-enhanced"
                    min={0.1}
                    max={50}
                    step={0.1}
                    placeholder="Enter expected return rate"
                  />
                  <p className="text-body-small text-gray-500 mt-2">
                    Common rates: Savings Account (3-4%), Fixed Deposit (6-7%), Mutual Funds (8-12%), Stocks (10-15%)
                  </p>
                </div>
              ) : (
                <div>
                  <label className="block text-body font-semibold text-gray-700 mb-3">Target Doubling Time (Years)</label>
                  <input
                    type="number"
                    value={targetYears}
                    onChange={e => setTargetYears(Number(e.target.value))}
                    className="input-enhanced"
                    min={1}
                    max={50}
                    step={0.5}
                    placeholder="Enter your target years"
                  />
                </div>
              )}
            </form>
          </div>

          {/* Results */}
          <div className="card p-8 text-center animate-slide-in-right">
            <h2 className="text-heading-2 font-bold text-gray-900 mb-8">
              {calculationMode === 'time' ? 'Doubling Time Result' : 'Required Rate Result'}
            </h2>
            
            {/* Main Result */}
            <div className="mb-8">
              {calculationMode === 'time' ? (
                <>
                  <div className="text-6xl font-black bg-gradient-to-r from-gray-700 to-slate-700 bg-clip-text text-transparent mb-4">
                    {doublingTime.toFixed(1)} years
                  </div>
                  <p className="text-body-large text-gray-600">Time to Double Your Money</p>
                </>
              ) : (
                <>
                  <div className="text-6xl font-black bg-gradient-to-r from-gray-700 to-slate-700 bg-clip-text text-transparent mb-4">
                    {requiredRate.toFixed(1)}%
                  </div>
                  <p className="text-body-large text-gray-600">Required Annual Return</p>
                </>
              )}
            </div>

            {/* Breakdown */}
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl">
                <span className="text-body font-semibold text-gray-700">Initial Amount:</span>
                <span className="text-body-large font-bold text-gray-700">₹{formatIndianNumber(principal)}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                <span className="text-body font-semibold text-gray-700">Doubled Amount:</span>
                <span className="text-body-large font-bold text-green-600">₹{formatIndianNumber(doubledAmount)}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl">
                <span className="text-body font-semibold text-gray-700">Growth:</span>
                <span className="text-body-large font-bold text-blue-600">100%</span>
              </div>
            </div>

            {/* Accuracy Note */}
            <div className="bg-yellow-50 p-4 rounded-xl">
              <p className="text-body-small text-gray-600 mb-2">Rule of 72 Accuracy:</p>
              <p className="text-body font-semibold text-gray-800">
                {ruleOf72Accuracy.toFixed(1)}% accurate
              </p>
              <p className="text-body-small text-gray-500 mt-1">
                Most accurate for rates between 6-10%
              </p>
            </div>
          </div>
        </div>

        {/* Formula Explanation */}
        <div className="card p-10 mb-8 animate-fade-in">
          <h3 className="text-heading-2 font-bold text-gray-900 mb-8 text-center">Understanding the Rule of 72</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-slate-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl">🧮</span>
              </div>
              <h4 className="text-heading-3 font-semibold text-gray-900 mb-3">Simple Formula</h4>
              <p className="text-body text-gray-600 leading-relaxed">Years to Double = 72 ÷ Interest Rate</p>
              <div className="bg-gray-50 p-3 rounded-lg mt-3">
                <code className="text-body-small font-mono text-gray-800">72 ÷ {interestRate}% = {doublingTime.toFixed(1)} years</code>
              </div>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-slate-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="text-heading-3 font-semibold text-gray-900 mb-3">Quick Estimation</h4>
              <p className="text-body text-gray-600 leading-relaxed">Get instant doubling time estimates without complex calculations</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-slate-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="text-heading-3 font-semibold text-gray-900 mb-3">Investment Planning</h4>
              <p className="text-body text-gray-600 leading-relaxed">Perfect for comparing different investment options and setting goals</p>
            </div>
          </div>
        </div>

        {/* Real-World Examples */}
        <div className="card p-10 mb-8 animate-slide-in-left">
          <h3 className="text-heading-2 font-bold text-gray-900 mb-8 text-center">Real-World Examples</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { rate: 6, investment: 'Fixed Deposit', years: (72/6).toFixed(1) },
              { rate: 8, investment: 'PPF/ELSS', years: (72/8).toFixed(1) },
              { rate: 12, investment: 'Mutual Fund SIP', years: (72/12).toFixed(1) },
              { rate: 15, investment: 'Stock Market', years: (72/15).toFixed(1) }
            ].map((example, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-slate-50 p-6 rounded-xl text-center">
                <div className="text-2xl font-bold text-gray-800 mb-2">{example.rate}%</div>
                <div className="text-body font-semibold text-gray-700 mb-1">{example.investment}</div>
                <div className="text-body-small text-gray-600">{example.years} years to double</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips for Indian Teens */}
        <div className="bg-gradient-to-r from-gray-700 via-slate-700 to-blue-700 rounded-2xl p-8 text-white animate-slide-in-right">
          <h3 className="text-heading-2 font-bold mb-6 text-center">💡 Smart Tips for Indian Teens</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-yellow-400 text-xl">🎯</span>
                <div>
                  <h4 className="font-semibold mb-1">Start Early</h4>
                  <p className="text-gray-100 text-body-small">At 8% return, ₹10,000 becomes ₹20,000 in 9 years, ₹40,000 in 18 years!</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-400 text-xl">📱</span>
                <div>
                  <h4 className="font-semibold mb-1">Compare Options</h4>
                  <p className="text-gray-100 text-body-small">Use the Rule of 72 to quickly compare FD (12 years) vs Mutual Funds (9 years)</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-yellow-400 text-xl">🏦</span>
                <div>
                  <h4 className="font-semibold mb-1">Goal Setting</h4>
                  <p className="text-gray-100 text-body-small">Want to double money in 6 years? You need 12% returns (Rule: 72÷6=12)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-400 text-xl">💰</span>
                <div>
                  <h4 className="font-semibold mb-1">Inflation Impact</h4>
                  <p className="text-gray-100 text-body-small">If inflation is 6%, your purchasing power halves in 12 years!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 