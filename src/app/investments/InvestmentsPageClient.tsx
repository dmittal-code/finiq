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
    minimumInvestment: '₹1 - ₹100',
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
    minimumInvestment: '₹1,000',
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
    minimumInvestment: '₹500 - ₹3,000',
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
    minimumInvestment: '₹1 - ₹100',
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
    minimumInvestment: '₹10,000+',
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
    minimumInvestment: '₹100 - ₹1,000',
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

export default function InvestmentsPageClient() {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-heading-1 font-bold text-gray-900 mb-6">
            Investment Types Explorer
          </h1>
          <p className="text-body-large text-gray-600 leading-relaxed mb-8">
            Learn about different investment options and build your ideal portfolio
          </p>
          
          {/* Navigation Tabs */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setShowPortfolioBuilder(false)}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                !showPortfolioBuilder
                  ? 'btn-primary'
                  : 'btn-secondary'
              }`}
            >
              📊 Investment Types
            </button>
            <button
              onClick={() => setShowPortfolioBuilder(true)}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                showPortfolioBuilder
                  ? 'btn-primary'
                  : 'btn-secondary'
              }`}
            >
              💼 Portfolio Builder
            </button>
          </div>
        </div>

        {!showPortfolioBuilder ? (
          /* Investment Types Explorer */
          <div>
            {/* Investment Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {investmentTypes.map((investment, index) => (
                <div
                  key={investment.id}
                  onClick={() => handleInvestmentClick(investment)}
                  className="card p-8 hover:shadow-xl transition-all duration-300 cursor-pointer group animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-4xl">{investment.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-heading-2 font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {investment.name}
                      </h3>
                      <p className="text-body-small text-gray-500">{investment.minimumInvestment} min</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-body text-gray-600 leading-relaxed mb-6 line-clamp-3">
                    {investment.description}
                  </p>

                  {/* Risk-Reward Indicators */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-body-small text-gray-500">Risk:</span>
                      <span className={`px-3 py-1 text-body-small font-semibold rounded-full ${riskLevels[investment.riskLevel].color}`}>
                        {investment.riskLevel}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-body-small text-gray-500">Return:</span>
                      <span className={`px-3 py-1 text-body-small font-semibold rounded-full ${riskLevels[investment.potentialReturn].color}`}>
                        {investment.potentialReturn}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-body-small text-gray-500">Liquidity:</span>
                      <span className={`px-3 py-1 text-body-small font-semibold rounded-full ${riskLevels[investment.liquidity].color}`}>
                        {investment.liquidity}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-blue-600 text-body font-semibold">Learn more</span>
                    <svg className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Risk-Reward Chart */}
            <div className="card p-10 mb-16 animate-fade-in">
              <h3 className="text-heading-2 font-bold text-gray-900 mb-8 text-center">Risk vs. Return Spectrum</h3>
              <div className="relative h-80 bg-gradient-to-r from-green-100 via-yellow-100 to-red-100 rounded-2xl p-6">
                {investmentTypes.map((investment) => {
                  const x = investment.riskLevel === 'Low' ? 15 : investment.riskLevel === 'Medium' ? 50 : 85;
                  const y = investment.potentialReturn === 'Low' ? 75 : investment.potentialReturn === 'Medium' ? 50 : 25;
                  
                  return (
                    <div
                      key={investment.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
                      style={{ left: `${x}%`, top: `${y}%` }}
                      onClick={() => handleInvestmentClick(investment)}
                    >
                      <div className="bg-white rounded-full p-3 shadow-lg border-2 border-blue-200 hover:border-blue-400">
                        <span className="text-2xl">{investment.icon}</span>
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 bg-white px-3 py-2 rounded-lg text-body-small font-semibold shadow-lg whitespace-nowrap">
                        {investment.name}
                      </div>
                    </div>
                  );
                })}
                
                {/* Axis Labels */}
                <div className="absolute bottom-4 left-4 text-body-small text-gray-600 font-semibold">Low Risk</div>
                <div className="absolute bottom-4 right-4 text-body-small text-gray-600 font-semibold">High Risk</div>
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-body-small text-gray-600 font-semibold">High Return</div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-body-small text-gray-600 font-semibold">Low Return</div>
              </div>
            </div>
          </div>
        ) : (
          /* Portfolio Builder */
          <div>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Portfolio Builder */}
              <div className="card p-8 animate-scale-in">
                <h3 className="text-heading-2 font-bold text-gray-900 mb-8">Build Your Portfolio</h3>
                
                {/* Total Amount Input */}
                <div className="mb-8">
                  <label className="block text-body font-semibold text-gray-700 mb-3">
                    Total Investment Amount
                  </label>
                  <input
                    type="number"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(Number(e.target.value))}
                    className="input-enhanced"
                    placeholder="Enter amount"
                  />
                </div>

                {/* Investment Selection */}
                <div className="mb-8">
                  <h4 className="text-heading-3 font-semibold text-gray-900 mb-6">Add Investments</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {investmentTypes.map((investment) => (
                      <button
                        key={investment.id}
                        onClick={() => addToPortfolio(investment)}
                        className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                      >
                        <span className="text-xl">{investment.icon}</span>
                        <span className="text-body font-semibold">{investment.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Portfolio Items */}
                {portfolioItems.length > 0 && (
                  <div>
                    <h4 className="text-heading-3 font-semibold text-gray-900 mb-6">Your Portfolio</h4>
                    <div className="space-y-4">
                      {portfolioItems.map((item) => (
                        <div key={item.type} className="flex items-center gap-4 p-6 border-2 border-gray-200 rounded-xl">
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-3">
                              <span className="text-body font-semibold">{item.type}</span>
                              <button
                                onClick={() => removeFromPortfolio(item.type)}
                                className="text-red-500 hover:text-red-700 p-1"
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
                              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-body-small text-gray-600 mt-2">
                              <span className="font-semibold">{item.percentage}%</span>
                              <span className="font-semibold">₹{item.amount.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Portfolio Visualization */}
              <div className="card p-8 animate-slide-in-right">
                <h3 className="text-heading-2 font-bold text-gray-900 mb-8">Portfolio Overview</h3>
                
                {portfolioItems.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-4xl">📊</span>
                    </div>
                    <h4 className="text-heading-3 font-semibold text-gray-900 mb-3">No investments yet</h4>
                    <p className="text-body text-gray-600">Add investments from the left panel to build your portfolio</p>
                  </div>
                ) : (
                  <div>
                    {/* Portfolio Stats */}
                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                        <span className="text-body font-semibold">Total Allocation:</span>
                        <span className={`text-body-large font-bold ${getTotalPercentage() > 100 ? 'text-red-600' : 'text-green-600'}`}>
                          {getTotalPercentage()}%
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                        <span className="text-body font-semibold">Portfolio Risk:</span>
                        <span className={`px-3 py-1 rounded-full text-body-small font-semibold ${riskLevels[getPortfolioRisk()].color}`}>
                          {getPortfolioRisk()}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl">
                        <span className="text-body font-semibold">Total Value:</span>
                        <span className="text-body-large font-bold text-orange-600">₹{totalAmount.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Recommendations */}
                    {getTotalPercentage() !== 100 && (
                      <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl">
                        <h5 className="text-body font-bold text-yellow-800 mb-2">💡 Tip</h5>
                        <p className="text-yellow-700 text-body-small">
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
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-6">
                    <div className="text-5xl">{selectedInvestment.icon}</div>
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

                {/* Key Metrics */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                    <h4 className="text-body font-bold text-gray-900 mb-3">Risk Level</h4>
                    <span className={`px-4 py-2 rounded-full text-body font-semibold ${riskLevels[selectedInvestment.riskLevel].color}`}>
                      {selectedInvestment.riskLevel}
                    </span>
                  </div>
                  <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                    <h4 className="text-body font-bold text-gray-900 mb-3">Potential Return</h4>
                    <span className={`px-4 py-2 rounded-full text-body font-semibold ${riskLevels[selectedInvestment.potentialReturn].color}`}>
                      {selectedInvestment.potentialReturn}
                    </span>
                  </div>
                  <div className="p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl">
                    <h4 className="text-body font-bold text-gray-900 mb-3">Liquidity</h4>
                    <span className={`px-4 py-2 rounded-full text-body font-semibold ${riskLevels[selectedInvestment.liquidity].color}`}>
                      {selectedInvestment.liquidity}
                    </span>
                  </div>
                </div>

                {/* Pros and Cons */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-heading-3 font-bold text-gray-900 mb-4">✅ Advantages</h4>
                    <ul className="space-y-3">
                      {selectedInvestment.pros.map((pro, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-green-500 mt-1">•</span>
                          <span className="text-body text-gray-700">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-heading-3 font-bold text-gray-900 mb-4">⚠️ Disadvantages</h4>
                    <ul className="space-y-3">
                      {selectedInvestment.cons.map((con, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-red-500 mt-1">•</span>
                          <span className="text-body text-gray-700">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Example and Minimum Investment */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="p-6 bg-gray-50 rounded-xl">
                    <h4 className="text-heading-3 font-bold text-gray-900 mb-3">💡 Example</h4>
                    <p className="text-body text-gray-700">{selectedInvestment.example}</p>
                  </div>
                  <div className="p-6 bg-gray-50 rounded-xl">
                    <h4 className="text-heading-3 font-bold text-gray-900 mb-3">💰 Minimum Investment</h4>
                    <p className="text-body text-gray-700">{selectedInvestment.minimumInvestment}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => addToPortfolio(selectedInvestment)}
                    className="btn-primary px-8 py-3"
                  >
                    📊 Add to Portfolio
                  </button>
                  <button
                    onClick={closeModal}
                    className="btn-secondary px-8 py-3"
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