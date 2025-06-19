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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Savings Goal Calculator
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Plan and track your savings goals with compound interest
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Goal Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Goal Amount (₹)
                </label>
                <input
                  type="number"
                  value={goalAmount}
                  onChange={(e) => setGoalAmount(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                  placeholder="Enter your goal amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Savings (₹)
                </label>
                <input
                  type="number"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                  placeholder="Enter your current savings"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Contribution (₹)
                </label>
                <input
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                  placeholder="Enter monthly contribution"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Interest Rate (%)
                </label>
                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                  placeholder="Enter interest rate"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timeframe (months)
                </label>
                <input
                  type="number"
                  value={timeframe}
                  onChange={(e) => setTimeframe(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                  placeholder="Enter timeframe in months"
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {/* Progress Card */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Progress to Goal</h3>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Current Progress</span>
                  <span>{progress.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">₹{currentSavings.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Current Savings</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">₹{(goalAmount - currentSavings).toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Remaining</div>
                </div>
              </div>
            </div>

            {/* Projection Card */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Projection Results</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">Projected Savings:</span>
                  <span className="text-lg font-bold text-green-600">₹{projectedSavings.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">Time to Goal:</span>
                  <span className="text-lg font-bold text-blue-600">
                    {timeToGoal < 12 ? `${timeToGoal} months` : `${Math.floor(timeToGoal / 12)} years ${timeToGoal % 12} months`}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    isOnTrack ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {isOnTrack ? 'On Track!' : 'Needs Adjustment'}
                  </span>
                </div>
              </div>

              {!isOnTrack && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">💡 Suggestion</h4>
                  <p className="text-yellow-700 text-sm">
                    Increase your monthly contribution or extend your timeframe to reach your goal.
                  </p>
                </div>
              )}
            </div>

            {/* Tips Card */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">💡 Savings Tips</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Set up automatic transfers to make saving effortless</li>
                <li>• Start with small amounts and increase gradually</li>
                <li>• Consider high-yield savings accounts for better interest rates</li>
                <li>• Review and adjust your goals regularly</li>
                <li>• Celebrate small milestones to stay motivated</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 