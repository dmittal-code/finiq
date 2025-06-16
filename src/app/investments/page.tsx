'use client';

import { useState } from 'react';

interface InvestmentType {
  id: string;
  name: string;
  description: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  potentialReturn: 'Low' | 'Medium' | 'High';
  liquidity: 'Low' | 'Medium' | 'High';
  minimumInvestment: string;
  pros: string[];
  cons: string[];
  example: string;
  icon: string;
  color: string;
}

interface PortfolioItem {
  type: string;
  percentage: number;
  amount: number;
}

const investmentTypes: InvestmentType[] = [
  {
    id: 'stocks',
    name: 'Stocks',
    description: 'Shares of ownership in a company. When you buy stock, you become a partial owner and may receive dividends.',
    riskLevel: 'High',
    potentialReturn: 'High',
    liquidity: 'High',
    minimumInvestment: '$1 - $100',
    pros: ['High potential returns', 'Ownership in companies', 'Dividend income', 'Easy to buy/sell'],
    cons: ['High volatility', 'Can lose value quickly', 'Requires research', 'Market timing risk'],
    example: 'Buying shares of Apple, Tesla, or Google',
    icon: '📈',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'bonds',
    name: 'Bonds',
    description: 'Loans you make to companies or governments. They promise to pay you back with interest over time.',
    riskLevel: 'Low',
    potentialReturn: 'Low',
    liquidity: 'Medium',
    minimumInvestment: '$1,000',
    pros: ['Steady income', 'Lower risk', 'Predictable returns', 'Government backing (some)'],
    cons: ['Lower returns', 'Interest rate risk', 'Inflation risk', 'Limited growth potential'],
    example: 'US Treasury bonds, corporate bonds, municipal bonds',
    icon: '📜',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'mutual-funds',
    name: 'Mutual Funds',
    description: 'Investment vehicles that pool money from many investors to buy a diversified portfolio of securities.',
    riskLevel: 'Medium',
    potentialReturn: 'Medium',
    liquidity: 'High',
    minimumInvestment: '$500 - $3,000',
    pros: ['Diversification', 'Professional management', 'Access to many investments', 'Lower minimums'],
    cons: ['Management fees', 'Less control', 'Tax inefficiency', 'Trading restrictions'],
    example: 'Vanguard 500 Index Fund, Fidelity Growth Fund',
    icon: '📊',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'etfs',
    name: 'ETFs',
    description: 'Exchange-traded funds that trade on stock exchanges like individual stocks, providing diversification at low costs.',
    riskLevel: 'Medium',
    potentialReturn: 'Medium',
    liquidity: 'High',
    minimumInvestment: '$1 - $100',
    pros: ['Low costs', 'Diversification', 'Tax efficient', 'Trade like stocks'],
    cons: ['Trading fees', 'Market volatility', 'Tracking error', 'Limited customization'],
    example: 'SPY (S&P 500), QQQ (NASDAQ), VTI (Total Market)',
    icon: '📦',
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    description: 'Investing in property, either directly by buying real estate or indirectly through REITs.',
    riskLevel: 'Medium',
    potentialReturn: 'Medium',
    liquidity: 'Low',
    minimumInvestment: '$10,000+',
    pros: ['Tangible asset', 'Rental income', 'Tax benefits', 'Appreciation potential'],
    cons: ['High initial cost', 'Illiquid', 'Maintenance costs', 'Market dependent'],
    example: 'Rental properties, REITs, real estate crowdfunding',
    icon: '🏠',
    color: 'from-red-500 to-red-600'
  },
  {
    id: 'commodities',
    name: 'Commodities',
    description: 'Physical goods like gold, oil, agricultural products, or precious metals.',
    riskLevel: 'High',
    potentialReturn: 'High',
    liquidity: 'Medium',
    minimumInvestment: '$100 - $1,000',
    pros: ['Inflation hedge', 'Portfolio diversification', 'Tangible assets', 'Global demand'],
    cons: ['High volatility', 'Storage costs', 'No income generation', 'Complex pricing'],
    example: 'Gold, silver, oil, agricultural futures',
    icon: '🥇',
    color: 'from-yellow-500 to-yellow-600'
  }
];

const riskLevels = {
  Low: { color: 'bg-green-100 text-green-800', description: 'Low risk, stable returns' },
  Medium: { color: 'bg-yellow-100 text-yellow-800', description: 'Moderate risk and returns' },
  High: { color: 'bg-red-100 text-red-800', description: 'High risk, high potential returns' }
};

export default function InvestmentsPage() {
  const [selectedInvestment, setSelectedInvestment] = useState<InvestmentType | null>(null);
  const [showPortfolioBuilder, setShowPortfolioBuilder] = useState(false);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(10000);

  const handleInvestmentClick = (investment: InvestmentType) => {
    setSelectedInvestment(investment);
  };

  const closeModal = () => {
    setSelectedInvestment(null);
  };

  const addToPortfolio = (investment: InvestmentType) => {
    const existingItem = portfolioItems.find(item => item.type === investment.name);
    if (existingItem) {
      setPortfolioItems(prev => prev.map(item => 
        item.type === investment.name 
          ? { ...item, percentage: Math.min(item.percentage + 10, 100) }
          : item
      ));
    } else {
      setPortfolioItems(prev => [...prev, { type: investment.name, percentage: 10, amount: totalAmount * 0.1 }]);
    }
  };

  const updatePortfolioPercentage = (type: string, percentage: number) => {
    setPortfolioItems(prev => prev.map(item => 
      item.type === type 
        ? { ...item, percentage, amount: (totalAmount * percentage) / 100 }
        : item
    ));
  };

  const removeFromPortfolio = (type: string) => {
    setPortfolioItems(prev => prev.filter(item => item.type !== type));
  };

  const getTotalPercentage = () => {
    return portfolioItems.reduce((sum, item) => sum + item.percentage, 0);
  };

  const getPortfolioRisk = () => {
    if (portfolioItems.length === 0) return 'Low';
    
    const riskScores = portfolioItems.map(item => {
      const investment = investmentTypes.find(inv => inv.name === item.type);
      return investment ? (investment.riskLevel === 'High' ? 3 : investment.riskLevel === 'Medium' ? 2 : 1) * (item.percentage / 100) : 0;
    });
    
    const avgRisk = riskScores.reduce((sum, score) => sum + score, 0);
    return avgRisk > 2.5 ? 'High' : avgRisk > 1.5 ? 'Medium' : 'Low';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Investment Types Explorer
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Learn about different investment options and build your ideal portfolio
          </p>
          
          {/* Navigation Tabs */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setShowPortfolioBuilder(false)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                !showPortfolioBuilder
                  ? 'bg-indigo-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-indigo-50 border border-gray-200'
              }`}
            >
              📊 Investment Types
            </button>
            <button
              onClick={() => setShowPortfolioBuilder(true)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                showPortfolioBuilder
                  ? 'bg-indigo-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-indigo-50 border border-gray-200'
              }`}
            >
              🎯 Portfolio Builder
            </button>
          </div>
        </div>

        {!showPortfolioBuilder ? (
          /* Investment Types Explorer */
          <div>
            {/* Investment Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {investmentTypes.map((investment) => (
                <div
                  key={investment.id}
                  onClick={() => handleInvestmentClick(investment)}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-indigo-200 group"
                >
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl">{investment.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                        {investment.name}
                      </h3>
                      <p className="text-sm text-gray-500">{investment.minimumInvestment} min</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {investment.description}
                  </p>

                  {/* Risk-Reward Indicators */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Risk:</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${riskLevels[investment.riskLevel].color}`}>
                        {investment.riskLevel}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Return:</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${riskLevels[investment.potentialReturn].color}`}>
                        {investment.potentialReturn}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Liquidity:</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${riskLevels[investment.liquidity].color}`}>
                        {investment.liquidity}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex items-center justify-between">
                    <span className="text-indigo-600 text-sm font-medium">Learn more</span>
                    <svg className="w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Risk-Reward Chart */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Risk vs. Return Spectrum</h3>
              <div className="relative h-64 bg-gradient-to-r from-green-100 via-yellow-100 to-red-100 rounded-lg p-4">
                {investmentTypes.map((investment, index) => {
                  const x = investment.riskLevel === 'Low' ? 10 : investment.riskLevel === 'Medium' ? 50 : 90;
                  const y = investment.potentialReturn === 'Low' ? 80 : investment.potentialReturn === 'Medium' ? 50 : 20;
                  
                  return (
                    <div
                      key={investment.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
                      style={{ left: `${x}%`, top: `${y}%` }}
                      onClick={() => handleInvestmentClick(investment)}
                    >
                      <div className="bg-white rounded-full p-2 shadow-lg border-2 border-indigo-200 hover:border-indigo-400">
                        <span className="text-lg">{investment.icon}</span>
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white px-2 py-1 rounded text-xs font-medium shadow-lg whitespace-nowrap">
                        {investment.name}
                      </div>
                    </div>
                  );
                })}
                
                {/* Axis Labels */}
                <div className="absolute bottom-2 left-2 text-xs text-gray-600">Low Risk</div>
                <div className="absolute bottom-2 right-2 text-xs text-gray-600">High Risk</div>
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-600">High Return</div>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-600">Low Return</div>
              </div>
            </div>
          </div>
        ) : (
          /* Portfolio Builder */
          <div>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Portfolio Builder */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Build Your Portfolio</h3>
                
                {/* Total Amount Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Investment Amount
                  </label>
                  <input
                    type="number"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                    placeholder="Enter amount"
                  />
                </div>

                {/* Investment Selection */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Add Investments</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {investmentTypes.map((investment) => (
                      <button
                        key={investment.id}
                        onClick={() => addToPortfolio(investment)}
                        className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
                      >
                        <span className="text-lg">{investment.icon}</span>
                        <span className="text-sm font-medium">{investment.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Portfolio Items */}
                {portfolioItems.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Your Portfolio</h4>
                    <div className="space-y-4">
                      {portfolioItems.map((item) => (
                        <div key={item.type} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">{item.type}</span>
                              <button
                                onClick={() => removeFromPortfolio(item.type)}
                                className="text-red-500 hover:text-red-700"
                              >
                                ✕
                              </button>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={item.percentage}
                              onChange={(e) => updatePortfolioPercentage(item.type, Number(e.target.value))}
                              className="w-full"
                            />
                            <div className="flex justify-between text-sm text-gray-600 mt-1">
                              <span>{item.percentage}%</span>
                              <span>${item.amount.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Portfolio Visualization */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Portfolio Overview</h3>
                
                {portfolioItems.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-3xl">📊</span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">No investments yet</h4>
                    <p className="text-gray-600">Add investments from the left panel to build your portfolio</p>
                  </div>
                ) : (
                  <div>
                    {/* Pie Chart */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">Asset Allocation</h4>
                      <div className="relative w-48 h-48 mx-auto">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          {portfolioItems.map((item, index) => {
                            const investment = investmentTypes.find(inv => inv.name === item.type);
                            const color = investment ? investment.color.split(' ')[1] : 'gray';
                            const startAngle = portfolioItems.slice(0, index).reduce((sum, prevItem) => sum + prevItem.percentage, 0);
                            const endAngle = startAngle + item.percentage;
                            const startRad = (startAngle * 360) / 100 * (Math.PI / 180);
                            const endRad = (endAngle * 360) / 100 * (Math.PI / 180);
                            
                            const x1 = 50 + 40 * Math.cos(startRad);
                            const y1 = 50 + 40 * Math.sin(startRad);
                            const x2 = 50 + 40 * Math.cos(endRad);
                            const y2 = 50 + 40 * Math.sin(endRad);
                            
                            const largeArcFlag = item.percentage > 50 ? 1 : 0;
                            
                            return (
                              <path
                                key={item.type}
                                d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                                fill={`url(#${color})`}
                                stroke="white"
                                strokeWidth="2"
                              />
                            );
                          })}
                        </svg>
                      </div>
                    </div>

                    {/* Portfolio Stats */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <span className="font-medium">Total Allocation:</span>
                        <span className={`font-bold ${getTotalPercentage() > 100 ? 'text-red-600' : 'text-green-600'}`}>
                          {getTotalPercentage()}%
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <span className="font-medium">Portfolio Risk:</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${riskLevels[getPortfolioRisk()].color}`}>
                          {getPortfolioRisk()}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <span className="font-medium">Total Value:</span>
                        <span className="font-bold text-lg">${totalAmount.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Recommendations */}
                    {getTotalPercentage() !== 100 && (
                      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h5 className="font-semibold text-yellow-800 mb-2">💡 Tip</h5>
                        <p className="text-yellow-700 text-sm">
                          {getTotalPercentage() < 100 
                            ? `You have ${100 - getTotalPercentage()}% unallocated. Consider adding more investments.`
                            : 'You have over 100% allocated. Reduce some percentages to balance your portfolio.'
                          }
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Investment Modal */}
        {selectedInvestment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{selectedInvestment.icon}</div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedInvestment.name}</h2>
                      <p className="text-gray-600">{selectedInvestment.description}</p>
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

                {/* Key Metrics */}
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Risk Level</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${riskLevels[selectedInvestment.riskLevel].color}`}>
                      {selectedInvestment.riskLevel}
                    </span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Potential Return</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${riskLevels[selectedInvestment.potentialReturn].color}`}>
                      {selectedInvestment.potentialReturn}
                    </span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Liquidity</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${riskLevels[selectedInvestment.liquidity].color}`}>
                      {selectedInvestment.liquidity}
                    </span>
                  </div>
                </div>

                {/* Pros and Cons */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3 text-green-600">✅ Pros</h4>
                    <ul className="space-y-2">
                      {selectedInvestment.pros.map((pro, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">•</span>
                          <span className="text-gray-700">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3 text-red-600">❌ Cons</h4>
                    <ul className="space-y-2">
                      {selectedInvestment.cons.map((con, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-red-500 mt-1">•</span>
                          <span className="text-gray-700">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Example */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Example</h4>
                  <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-r-lg">
                    <p className="text-gray-700 italic">{selectedInvestment.example}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => {
                      addToPortfolio(selectedInvestment);
                      setShowPortfolioBuilder(true);
                      closeModal();
                    }}
                    className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                  >
                    Add to Portfolio
                  </button>
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
    </div>
  );
} 