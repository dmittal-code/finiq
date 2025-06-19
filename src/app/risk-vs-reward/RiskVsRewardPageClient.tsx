'use client';

import { useState } from 'react';

interface Investment {
  name: string;
  risk: number;
  return: number;
  description: string;
  color: string;
  icon: string;
}

const investments: Investment[] = [
  {
    name: 'Savings Account',
    risk: 1,
    return: 2,
    description: 'Low risk, low return. Good for emergency funds and short-term goals.',
    color: 'bg-green-500',
    icon: '🏦'
  },
  {
    name: 'Bonds',
    risk: 2,
    return: 4,
    description: 'Government or corporate debt. Moderate risk with steady returns.',
    color: 'bg-blue-500',
    icon: '📜'
  },
  {
    name: 'Mutual Funds',
    risk: 4,
    return: 7,
    description: 'Diversified portfolio managed by professionals.',
    color: 'bg-purple-500',
    icon: '📊'
  },
  {
    name: 'Stocks',
    risk: 7,
    return: 10,
    description: 'Individual company shares. Higher risk and potential return.',
    color: 'bg-orange-500',
    icon: '📈'
  },
  {
    name: 'Cryptocurrency',
    risk: 9,
    return: 15,
    description: 'Digital currencies. Very high risk and potential return.',
    color: 'bg-red-500',
    icon: '₿'
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

  const getRiskToleranceDescription = (level: number) => {
    if (level <= 2) return { text: "Conservative - You prefer stable, predictable returns", color: "text-green-600" };
    if (level <= 4) return { text: "Moderately Conservative - You want some growth with limited risk", color: "text-blue-600" };
    if (level <= 6) return { text: "Moderate - You're comfortable with balanced risk and return", color: "text-purple-600" };
    if (level <= 8) return { text: "Moderately Aggressive - You're willing to take risks for higher returns", color: "text-orange-600" };
    return { text: "Aggressive - You're comfortable with high risk for maximum potential returns", color: "text-red-600" };
  };

  const toleranceDesc = getRiskToleranceDescription(userRiskTolerance);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-heading-1 font-bold text-gray-900 mb-6">
            Risk vs. Reward
          </h1>
          <p className="text-body-large text-gray-600 leading-relaxed">
            Understand the fundamental relationship between risk and potential returns in investing
          </p>
        </div>

        {/* Risk Tolerance Slider */}
        <div className="card p-8 mb-12 animate-scale-in">
          <h2 className="text-heading-2 font-bold text-gray-900 mb-8 text-center">Your Risk Tolerance</h2>
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <label className="block text-body font-semibold text-gray-700 mb-4">
                How much risk are you comfortable with? (1 = Very Conservative, 10 = Very Aggressive)
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={userRiskTolerance}
                  onChange={(e) => setUserRiskTolerance(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-body-small text-gray-600 mt-3">
                  <span className="font-semibold">Conservative</span>
                  <span className="font-bold text-blue-600">Level {userRiskTolerance}</span>
                  <span className="font-semibold">Aggressive</span>
                </div>
              </div>
            </div>
            
            {/* Risk Description */}
            <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
              <h3 className="text-heading-3 font-bold text-gray-900 mb-3">Your Risk Profile</h3>
              <p className={`text-body-large font-semibold ${toleranceDesc.color}`}>
                {toleranceDesc.text}
              </p>
            </div>
          </div>
        </div>

        {/* Risk-Reward Chart */}
        <div className="card p-10 mb-12 animate-fade-in">
          <h2 className="text-heading-2 font-bold text-gray-900 mb-8 text-center">Risk vs. Return Spectrum</h2>
          <div className="relative h-96 bg-gradient-to-br from-green-100 via-yellow-100 to-red-100 rounded-2xl p-8">
            {/* Grid Lines */}
            <div className="absolute inset-8 grid grid-cols-10 grid-rows-10 opacity-20">
              {Array.from({ length: 100 }, (_, i) => (
                <div key={i} className="border border-gray-400"></div>
              ))}
            </div>

            {/* Investments */}
            {investments.map((investment) => (
              <div
                key={investment.name}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-125 transition-all duration-300 group"
                style={{
                  left: `${8 + (investment.risk / 10) * 84}%`,
                  top: `${92 - (investment.return / 15) * 84}%`
                }}
                onClick={() => handleInvestmentClick(investment)}
              >
                <div className="relative">
                  <div className={`w-6 h-6 ${investment.color} rounded-full shadow-lg border-3 border-white group-hover:shadow-2xl transition-all duration-300`}></div>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-2xl group-hover:scale-110 transition-transform duration-300">
                    {investment.icon}
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 bg-white px-3 py-2 rounded-lg text-body-small font-semibold shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-gray-200">
                    {investment.name}
                  </div>
                </div>
              </div>
            ))}

            {/* Axis Labels */}
            <div className="absolute bottom-4 left-8 text-body font-semibold text-gray-700">Low Risk</div>
            <div className="absolute bottom-4 right-8 text-body font-semibold text-gray-700">High Risk</div>
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-body font-semibold text-gray-700">High Return</div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-body font-semibold text-gray-700">Low Return</div>
          </div>
        </div>

        {/* Investment Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {investments.map((investment, index) => {
            const riskInfo = getRiskLevel(investment.risk);
            return (
              <div
                key={investment.name}
                onClick={() => handleInvestmentClick(investment)}
                className="card p-8 hover:shadow-xl transition-all duration-300 cursor-pointer group animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{investment.icon}</span>
                    <h3 className="text-heading-2 font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {investment.name}
                    </h3>
                  </div>
                  <div className={`w-4 h-4 ${investment.color} rounded-full shadow-lg`}></div>
                </div>
                
                <p className="text-body text-gray-600 mb-6 leading-relaxed">{investment.description}</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl">
                    <span className="text-body-small font-semibold text-gray-700">Risk Level:</span>
                    <span className={`px-3 py-1 rounded-full text-body-small font-bold ${riskInfo.bg} ${riskInfo.color}`}>
                      {riskInfo.level} ({investment.risk}/10)
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-green-50 rounded-xl">
                    <span className="text-body-small font-semibold text-gray-700">Expected Return:</span>
                    <span className="text-body font-bold text-green-600">
                      {investment.return}% annually
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recommendations */}
        <div className="card p-10 animate-slide-in-left">
          <h2 className="text-heading-2 font-bold text-gray-900 mb-8 text-center">
            💡 Recommended for Your Risk Level
          </h2>
          {getRecommendations().length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getRecommendations().map((investment) => {
                const riskInfo = getRiskLevel(investment.risk);
                return (
                  <div key={investment.name} className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200 hover:border-blue-300 transition-colors cursor-pointer" onClick={() => handleInvestmentClick(investment)}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{investment.icon}</span>
                      <h3 className="text-heading-3 font-bold text-gray-900">{investment.name}</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-body-small font-semibold text-gray-600">Risk:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${riskInfo.bg} ${riskInfo.color}`}>
                          {riskInfo.level}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-body-small font-semibold text-gray-600">Return:</span>
                        <span className="text-body-small font-bold text-green-600">{investment.return}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-body-large text-gray-600">No investments match your current risk tolerance. Try adjusting your risk level above.</p>
            </div>
          )}
        </div>

        {/* Educational Content */}
        <div className="card p-10 mt-12 animate-fade-in">
          <h3 className="text-heading-2 font-bold text-gray-900 mb-8 text-center">Understanding Risk & Reward</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl">⚖️</span>
              </div>
              <h4 className="text-heading-3 font-semibold text-gray-900 mb-3">Risk-Return Tradeoff</h4>
              <p className="text-body text-gray-600 leading-relaxed">Higher potential returns typically come with higher risk. There's no free lunch in investing.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="text-heading-3 font-semibold text-gray-900 mb-3">Know Your Goals</h4>
              <p className="text-body text-gray-600 leading-relaxed">Your investment timeline and financial goals should determine your risk tolerance.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl">📈</span>
              </div>
              <h4 className="text-heading-3 font-semibold text-gray-900 mb-3">Diversification</h4>
              <p className="text-body text-gray-600 leading-relaxed">Spreading investments across different assets can help manage risk while maintaining growth potential.</p>
            </div>
          </div>
        </div>

        {/* Investment Modal */}
        {selectedInvestment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-6">
                    <span className="text-5xl">{selectedInvestment.icon}</span>
                    <div>
                      <h2 className="text-heading-1 font-bold text-gray-900 mb-3">{selectedInvestment.name}</h2>
                      <p className="text-body-large text-gray-600">{selectedInvestment.description}</p>
                    </div>
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

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                    <h4 className="text-body font-bold text-gray-900 mb-3">Risk Level</h4>
                    <span className={`px-4 py-2 rounded-full text-body font-bold ${getRiskLevel(selectedInvestment.risk).bg} ${getRiskLevel(selectedInvestment.risk).color}`}>
                      {getRiskLevel(selectedInvestment.risk).level} ({selectedInvestment.risk}/10)
                    </span>
                  </div>
                  <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                    <h4 className="text-body font-bold text-gray-900 mb-3">Expected Return</h4>
                    <span className="text-3xl font-black text-green-600">{selectedInvestment.return}%</span>
                    <span className="text-body-small text-gray-600 ml-2">annually</span>
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={closeModal}
                    className="btn-primary px-8 py-3"
                  >
                    Got it!
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
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        .slider::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
} 