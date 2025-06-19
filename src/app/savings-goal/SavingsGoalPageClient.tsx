'use client';

import { useState } from "react";

export default function SavingsGoalPageClient() {
  const [goalAmount, setGoalAmount] = useState(10000);
  const [currentSavings, setCurrentSavings] = useState(2000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [interestRate, setInterestRate] = useState(4);
  const [timeframe, setTimeframe] = useState(12);

  const calculateProgress = () => {
    return Math.min((currentSavings / goalAmount) * 100, 100);
  };

  const calculateTimeToGoal = () => {
    const monthlyGrowth = 1 + (interestRate / 100) / 12;
    let months = 0;
    let balance = currentSavings;

    while (balance < goalAmount && months < 600) { // Max 50 years
      balance = balance * monthlyGrowth + monthlyContribution;
      months++;
    }

    return months;
  };

  const calculateProjectedSavings = () => {
    let balance = currentSavings;
    const monthlyGrowth = 1 + (interestRate / 100) / 12;

    for (let i = 0; i < timeframe; i++) {
      balance = balance * monthlyGrowth + monthlyContribution;
    }

    return balance;
  };

  const progress = calculateProgress();
  const timeToGoal = calculateTimeToGoal();
  const projectedSavings = calculateProjectedSavings();
  const isOnTrack = projectedSavings >= goalAmount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-heading-1 font-bold text-gray-900 mb-6">
            Savings Goal Calculator
          </h1>
          <p className="text-body-large text-gray-600 leading-relaxed">
            Plan and track your savings goals with the power of compound interest
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="card p-8 animate-scale-in">
            <h2 className="text-heading-2 font-bold text-gray-900 mb-8">Your Goal Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-body font-semibold text-gray-700 mb-3">
                  🎯 Goal Amount (₹)
                </label>
                <input
                  type="number"
                  value={goalAmount}
                  onChange={(e) => setGoalAmount(Number(e.target.value))}
                  className="input-enhanced"
                  placeholder="Enter your goal amount"
                />
              </div>

              <div>
                <label className="block text-body font-semibold text-gray-700 mb-3">
                  💰 Current Savings (₹)
                </label>
                <input
                  type="number"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(Number(e.target.value))}
                  className="input-enhanced"
                  placeholder="Enter your current savings"
                />
              </div>

              <div>
                <label className="block text-body font-semibold text-gray-700 mb-3">
                  📅 Monthly Contribution (₹)
                </label>
                <input
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="input-enhanced"
                  placeholder="Enter monthly contribution"
                />
              </div>

              <div>
                <label className="block text-body font-semibold text-gray-700 mb-3">
                  📈 Annual Interest Rate (%)
                </label>
                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="input-enhanced"
                  placeholder="Enter interest rate"
                  step="0.1"
                />
              </div>

              <div>
                <label className="block text-body font-semibold text-gray-700 mb-3">
                  ⏰ Timeframe (months)
                </label>
                <input
                  type="number"
                  value={timeframe}
                  onChange={(e) => setTimeframe(Number(e.target.value))}
                  className="input-enhanced"
                  placeholder="Enter timeframe in months"
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6 animate-slide-in-right">
            {/* Progress Card */}
            <div className="card p-8">
              <h3 className="text-heading-2 font-bold text-gray-900 mb-6">Progress to Goal</h3>
              
              <div className="mb-6">
                <div className="flex justify-between text-body-small text-gray-600 mb-3">
                  <span className="font-semibold">Current Progress</span>
                  <span className="font-bold text-blue-600">{progress.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-500 shadow-sm"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl text-center">
                  <div className="text-3xl font-black text-green-600 mb-2">₹{currentSavings.toLocaleString()}</div>
                  <div className="text-body-small text-gray-600 font-semibold">Current Savings</div>
                </div>
                <div className="p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl text-center">
                  <div className="text-3xl font-black text-orange-600 mb-2">₹{(goalAmount - currentSavings).toLocaleString()}</div>
                  <div className="text-body-small text-gray-600 font-semibold">Remaining</div>
                </div>
              </div>
            </div>

            {/* Projection Card */}
            <div className="card p-8">
              <h3 className="text-heading-2 font-bold text-gray-900 mb-6">Projection Results</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                  <span className="text-body font-semibold">Projected Savings:</span>
                  <span className="text-body-large font-bold text-blue-600">₹{projectedSavings.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                  <span className="text-body font-semibold">Time to Goal:</span>
                  <span className="text-body-large font-bold text-green-600">
                    {timeToGoal < 12 ? `${timeToGoal} months` : `${Math.floor(timeToGoal / 12)} years ${timeToGoal % 12} months`}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl">
                  <span className="text-body font-semibold">Status:</span>
                  <span className={`px-4 py-2 rounded-full text-body-small font-bold ${
                    isOnTrack ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {isOnTrack ? '✅ On Track!' : '⚠️ Needs Adjustment'}
                  </span>
                </div>
              </div>

              {!isOnTrack && (
                <div className="mt-6 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl">
                  <h4 className="text-body font-bold text-yellow-800 mb-2">💡 Suggestion</h4>
                  <p className="text-yellow-700 text-body-small">
                    Increase your monthly contribution or extend your timeframe to reach your goal.
                  </p>
                </div>
              )}
            </div>

            {/* Tips Card */}
            <div className="card p-8">
              <h3 className="text-heading-2 font-bold text-gray-900 mb-6">💡 Savings Tips</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 mt-1">•</span>
                  <span className="text-body text-gray-700">Set up automatic transfers to make saving effortless</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 mt-1">•</span>
                  <span className="text-body text-gray-700">Start with small amounts and increase gradually</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">•</span>
                  <span className="text-body text-gray-700">Consider high-yield savings accounts for better interest rates</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 mt-1">•</span>
                  <span className="text-body text-gray-700">Review and adjust your goals regularly</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pink-500 mt-1">•</span>
                  <span className="text-body text-gray-700">Celebrate small milestones to stay motivated</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Educational Content */}
        <div className="card p-10 mt-12 animate-fade-in">
          <h3 className="text-heading-2 font-bold text-gray-900 mb-8 text-center">Smart Savings Strategies</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="text-heading-3 font-semibold text-gray-900 mb-3">SMART Goals</h4>
              <p className="text-body text-gray-600 leading-relaxed">Set Specific, Measurable, Achievable, Relevant, and Time-bound savings goals</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl">💰</span>
              </div>
              <h4 className="text-heading-3 font-semibold text-gray-900 mb-3">50-30-20 Rule</h4>
              <p className="text-body text-gray-600 leading-relaxed">Allocate 50% for needs, 30% for wants, and 20% for savings and debt repayment</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl">📱</span>
              </div>
              <h4 className="text-heading-3 font-semibold text-gray-900 mb-3">Use Technology</h4>
              <p className="text-body text-gray-600 leading-relaxed">Leverage apps and automation to track progress and maintain consistency</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 