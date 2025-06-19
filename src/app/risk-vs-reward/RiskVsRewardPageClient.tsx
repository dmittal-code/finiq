'use client';

import { useState } from 'react';

interface Investment {
  name: string;
  risk: number;
  return: number;
  description: string;
  color: string;
}

const investments: Investment[] = [
  {
    name: 'Savings Account',
    risk: 1,
    return: 2,
    description: 'Low risk, low return. Good for emergency funds.',
    color: 'bg-green-500'
  },
  {
    name: 'Bonds',
    risk: 2,
    return: 4,
    description: 'Government or corporate debt. Moderate risk and return.',
    color: 'bg-blue-500'
  },
  {
    name: 'Mutual Funds',
    risk: 4,
    return: 7,
    description: 'Diversified portfolio managed by professionals.',
    color: 'bg-purple-500'
  },
  {
    name: 'Stocks',
    risk: 7,
    return: 10,
    description: 'Individual company shares. Higher risk and potential return.',
    color: 'bg-orange-500'
  },
  {
    name: 'Cryptocurrency',
    risk: 9,
    return: 15,
    description: 'Digital currencies. Very high risk and potential return.',
    color: 'bg-red-500'
  }
];

export default function RiskVsRewardPageClient() {
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);
  const [userRiskTolerance, setUserRiskTolerance] = useState<number>(5);

  const handleInvestmentClick = (investment: Investment) => {
    setSelectedInvestment(investment);
  };

  const closeModal = () => {
    setSelectedInvestment(null);
  };

  const getRiskLevel = (risk: number) => {
    if (risk <= 2) return { level: 'Low', color: 'text-green-600', bg: 'bg-green-100' };
    if (risk <= 5) return { level: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { level: 'High', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const getRecommendations = () => {
    return investments.filter(inv => Math.abs(inv.risk - userRiskTolerance) <= 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Risk vs. Reward
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Understand the fundamental relationship between risk and potential returns in investing
          </p>
        </div>

        {/* Risk Tolerance Slider */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your Risk Tolerance</h2>
          <div className="max-w-2xl mx-auto">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How much risk are you comfortable with? (1 = Very Conservative, 10 = Very Aggressive)
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={userRiskTolerance}
                onChange={(e) => setUserRiskTolerance(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>Conservative</span>
                <span className="font-medium">Level {userRiskTolerance}</span>
                <span>Aggressive</span>
              </div>
            </div>
          </div>
        </div>

        {/* Risk-Reward Chart */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Risk vs. Return Spectrum</h2>
          <div className="relative h-96 bg-gradient-to-br from-green-100 via-yellow-100 to-red-100 rounded-lg p-8">
            {/* Grid Lines */}
            <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 opacity-20">
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} className="border border-gray-300"></div>
              ))}
            </div>

            {/* Investments */}
            {investments.map((investment) => (
              <div
                key={investment.name}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
                style={{
                  left: `${(investment.risk / 10) * 100}%`,
                  top: `${100 - (investment.return / 15) * 100}%`
                }}
                onClick={() => handleInvestmentClick(investment)}
              >
                <div className={`w-4 h-4 ${investment.color} rounded-full shadow-lg border-2 border-white`}></div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white px-2 py-1 rounded text-xs font-medium shadow-lg whitespace-nowrap">
                  {investment.name}
                </div>
              </div>
            ))}

            {/* Axis Labels */}
            <div className="absolute bottom-2 left-2 text-sm text-gray-600">Low Risk</div>
            <div className="absolute bottom-2 right-2 text-sm text-gray-600">High Risk</div>
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-sm text-gray-600">High Return</div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm text-gray-600">Low Return</div>
          </div>
        </div>

        {/* Investment Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {investments.map((investment) => {
            const riskInfo = getRiskLevel(investment.risk);
            return (
              <div
                key={investment.name}
                onClick={() => handleInvestmentClick(investment)}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{investment.name}</h3>
                  <div className={`w-3 h-3 ${investment.color} rounded-full`}></div>
                </div>
                <p className="text-gray-600 mb-4">{investment.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Risk:</span>
                    <span className={`text-sm font-medium ${riskInfo.color}`}>
                      {riskInfo.level} ({investment.risk}/10)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Expected Return:</span>
                    <span className="text-sm font-medium text-green-600">
                      {investment.return}% annually
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Recommended for You</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getRecommendations().map((investment) => {
              const riskInfo = getRiskLevel(investment.risk);
              return (
                <div key={investment.name} className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">{investment.name}</h3>
                  <div className="flex justify-between text-sm">
                    <span>Risk: <span className={riskInfo.color}>{riskInfo.level}</span></span>
                    <span>Return: <span className="text-green-600">{investment.return}%</span></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Investment Modal */}
        {selectedInvestment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedInvestment.name}</h2>
                    <p className="text-gray-600">{selectedInvestment.description}</p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="ml-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Risk Level</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskLevel(selectedInvestment.risk).bg} ${getRiskLevel(selectedInvestment.risk).color}`}>
                      {getRiskLevel(selectedInvestment.risk).level} ({selectedInvestment.risk}/10)
                    </span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Expected Return</h4>
                    <span className="text-lg font-bold text-green-600">{selectedInvestment.return}% annually</span>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={closeModal}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
} 