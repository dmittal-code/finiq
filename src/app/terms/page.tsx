'use client';

import { useState, useEffect } from 'react';

interface FinancialTerm {
  id: number;
  term: string;
  definition: string;
  category: string;
  example?: string;
  relatedTerms?: string[];
}

const financialTerms: FinancialTerm[] = [
  {
    id: 1,
    term: "Compound Interest",
    definition: "Interest earned on both the principal amount and any previously earned interest. It's often called 'interest on interest' and helps money grow faster over time.",
    category: "Investing",
    example: "If you invest $1,000 at 5% compound interest, after 10 years you'll have $1,628.89 instead of $1,500 with simple interest.",
    relatedTerms: ["Simple Interest", "APY", "Time Value of Money"]
  },
  {
    id: 2,
    term: "Emergency Fund",
    definition: "A savings account with 3-6 months of living expenses set aside for unexpected financial emergencies like job loss or medical bills.",
    category: "Savings",
    example: "If your monthly expenses are $3,000, you should aim to save $9,000-$18,000 in your emergency fund.",
    relatedTerms: ["Liquidity", "Budget", "Financial Security"]
  },
  {
    id: 3,
    term: "Diversification",
    definition: "Spreading investments across different assets, sectors, or geographic regions to reduce risk. The saying goes: 'Don't put all your eggs in one basket.'",
    category: "Investing",
    example: "Instead of investing all your money in tech stocks, you might invest in stocks, bonds, real estate, and international markets.",
    relatedTerms: ["Asset Allocation", "Risk Management", "Portfolio"]
  },
  {
    id: 4,
    term: "Credit Score",
    definition: "A three-digit number (300-850) that represents your creditworthiness. Higher scores help you get better loan terms and lower interest rates.",
    category: "Credit",
    example: "A credit score of 750+ typically qualifies you for the best mortgage rates and credit card offers.",
    relatedTerms: ["Credit Report", "FICO Score", "Credit History"]
  },
  {
    id: 5,
    term: "Budget",
    definition: "A financial plan that tracks income and expenses to help you spend within your means and save for goals.",
    category: "Planning",
    example: "A 50/30/20 budget allocates 50% to needs, 30% to wants, and 20% to savings and debt repayment.",
    relatedTerms: ["Income", "Expenses", "Cash Flow"]
  },
  {
    id: 6,
    term: "Inflation",
    definition: "The rate at which prices for goods and services increase over time, reducing the purchasing power of money.",
    category: "Economics",
    example: "If inflation is 3% per year, a $100 item will cost $103 next year, meaning your money buys less.",
    relatedTerms: ["Purchasing Power", "CPI", "Deflation"]
  },
  {
    id: 7,
    term: "Mutual Fund",
    definition: "An investment vehicle that pools money from many investors to buy a diversified portfolio of stocks, bonds, or other securities.",
    category: "Investing",
    example: "A mutual fund might invest in 100+ different stocks, giving you instant diversification with a single investment.",
    relatedTerms: ["Index Fund", "ETF", "Portfolio"]
  },
  {
    id: 8,
    term: "Net Worth",
    definition: "The difference between your total assets (what you own) and total liabilities (what you owe). It's a measure of your financial health.",
    category: "Planning",
    example: "If you have $50,000 in assets and $20,000 in debt, your net worth is $30,000.",
    relatedTerms: ["Assets", "Liabilities", "Balance Sheet"]
  },
  {
    id: 9,
    term: "ROI (Return on Investment)",
    definition: "A measure of the profitability of an investment, calculated as (Gain - Cost) / Cost × 100. Shows how much money you made relative to what you invested.",
    category: "Investing",
    example: "If you invest $1,000 and it grows to $1,200, your ROI is (200/1000) × 100 = 20%.",
    relatedTerms: ["Profit", "Investment", "Performance"]
  },
  {
    id: 10,
    term: "Liquidity",
    definition: "How easily an asset can be converted to cash without losing value. Cash is the most liquid asset, while real estate is less liquid.",
    category: "Investing",
    example: "You can sell stocks quickly for cash, but selling a house takes time and may require a price reduction.",
    relatedTerms: ["Cash", "Marketability", "Emergency Fund"]
  },
  {
    id: 11,
    term: "Debt-to-Income Ratio",
    definition: "A percentage that compares your monthly debt payments to your monthly income. Lenders use this to assess your ability to take on new debt.",
    category: "Credit",
    example: "If your monthly income is $5,000 and debt payments are $1,500, your DTI ratio is 30%.",
    relatedTerms: ["Credit Score", "Loan Approval", "Debt Management"]
  },
  {
    id: 12,
    term: "Tax Deduction",
    definition: "An expense that can be subtracted from your taxable income, reducing the amount of tax you owe. Examples include student loan interest and charitable donations.",
    category: "Taxes",
    example: "If you earn $50,000 and have $2,000 in deductions, you only pay taxes on $48,000.",
    relatedTerms: ["Taxable Income", "Tax Credit", "Deductions"]
  },
  {
    id: 13,
    term: "Asset Allocation",
    definition: "The distribution of investments across different asset classes (stocks, bonds, cash, real estate) based on your goals, time horizon, and risk tolerance.",
    category: "Investing",
    example: "A conservative portfolio might be 60% bonds, 30% stocks, and 10% cash.",
    relatedTerms: ["Diversification", "Risk Tolerance", "Portfolio"]
  },
  {
    id: 14,
    term: "APR (Annual Percentage Rate)",
    definition: "The yearly interest rate charged on loans or credit cards, including fees. It helps you compare the true cost of borrowing money.",
    category: "Credit",
    example: "A credit card with 18% APR means you pay 18% interest per year on outstanding balances.",
    relatedTerms: ["Interest Rate", "APY", "Loan Terms"]
  },
  {
    id: 15,
    term: "Capital Gains",
    definition: "Profits earned from selling an investment or asset for more than you paid for it. These may be subject to capital gains tax.",
    category: "Investing",
    example: "If you buy a stock for $100 and sell it for $150, you have a $50 capital gain.",
    relatedTerms: ["Capital Loss", "Taxes", "Investment"]
  },
  {
    id: 16,
    term: "401(k)",
    definition: "A retirement savings plan offered by employers where you can contribute pre-tax money, often with employer matching contributions.",
    category: "Retirement",
    example: "If you contribute $500/month and your employer matches 50%, you're saving $750/month total.",
    relatedTerms: ["IRA", "Employer Match", "Retirement Planning"]
  },
  {
    id: 17,
    term: "Index Fund",
    definition: "A type of mutual fund that tracks a specific market index (like the S&P 500), providing broad market exposure at low costs.",
    category: "Investing",
    example: "An S&P 500 index fund owns shares of the 500 largest US companies, automatically diversifying your investment.",
    relatedTerms: ["ETF", "Passive Investing", "Market Index"]
  },
  {
    id: 18,
    term: "Amortization",
    definition: "The process of paying off a loan through regular payments that include both principal and interest. Early payments are mostly interest, later payments are mostly principal.",
    category: "Credit",
    example: "On a 30-year mortgage, early payments are mostly interest, while later payments are mostly principal.",
    relatedTerms: ["Principal", "Interest", "Loan Payment"]
  },
  {
    id: 19,
    term: "Risk Tolerance",
    definition: "Your ability and willingness to lose some or all of your original investment in exchange for greater potential returns. It affects your investment strategy.",
    category: "Investing",
    example: "A young person might have high risk tolerance and invest in stocks, while someone near retirement might prefer bonds.",
    relatedTerms: ["Risk Management", "Investment Strategy", "Asset Allocation"]
  },
  {
    id: 20,
    term: "Time Value of Money",
    definition: "The concept that money available today is worth more than the same amount in the future due to its potential earning capacity through interest or investment returns.",
    category: "Economics",
    example: "$1,000 today is worth more than $1,000 in 5 years because you could invest it and earn interest.",
    relatedTerms: ["Compound Interest", "Present Value", "Future Value"]
  },
  {
    id: 21,
    term: "Stock",
    definition: "A share of ownership in a company. When you buy stock, you become a partial owner and may receive dividends and voting rights.",
    category: "Investing",
    example: "If you own 100 shares of Apple stock, you own a tiny piece of Apple Inc. and may receive dividend payments.",
    relatedTerms: ["Dividend", "Shareholder", "Equity"]
  },
  {
    id: 22,
    term: "Bond",
    definition: "A loan you make to a company or government. In return, they promise to pay you back with interest over a specified period.",
    category: "Investing",
    example: "A 10-year government bond might pay 3% interest annually and return your principal after 10 years.",
    relatedTerms: ["Interest", "Maturity", "Fixed Income"]
  },
  {
    id: 23,
    term: "IRA (Individual Retirement Account)",
    definition: "A tax-advantaged retirement savings account that individuals can open independently of their employer.",
    category: "Retirement",
    example: "A traditional IRA allows you to deduct contributions from your taxes now and pay taxes when you withdraw in retirement.",
    relatedTerms: ["401(k)", "Roth IRA", "Retirement Planning"]
  },
  {
    id: 24,
    term: "ETF (Exchange-Traded Fund)",
    definition: "A type of investment fund that trades on stock exchanges like individual stocks, providing diversification at low costs.",
    category: "Investing",
    example: "An S&P 500 ETF can be bought and sold throughout the trading day, just like a stock.",
    relatedTerms: ["Index Fund", "Mutual Fund", "Diversification"]
  },
  {
    id: 25,
    term: "Credit Report",
    definition: "A detailed record of your credit history, including loans, credit cards, payment history, and credit inquiries.",
    category: "Credit",
    example: "Lenders check your credit report to see if you've paid bills on time and how much debt you have.",
    relatedTerms: ["Credit Score", "Credit History", "Credit Bureau"]
  }
];

const categories = [
  "All",
  "Investing",
  "Credit",
  "Savings",
  "Planning",
  "Economics",
  "Taxes",
  "Retirement"
];

export default function TermsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTerm, setSelectedTerm] = useState<FinancialTerm | null>(null);
  const [showModal, setShowModal] = useState(false);

  const filteredTerms = financialTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleTermClick = (term: FinancialTerm) => {
    setSelectedTerm(term);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTerm(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Financial Terms Glossary
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Master essential financial concepts with our comprehensive glossary
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for financial terms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pl-12 text-lg border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-emerald-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-emerald-50 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-gray-600 mb-8">
            Showing {filteredTerms.length} of {financialTerms.length} terms
          </div>
        </div>

        {/* Terms Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredTerms.map((term) => (
            <div
              key={term.id}
              onClick={() => handleTermClick(term)}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-emerald-200 group"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
                  {term.term}
                </h3>
                <span className="px-3 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full">
                  {term.category}
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                {term.definition}
              </p>
              <div className="mt-4 flex items-center text-emerald-600 text-sm font-medium">
                <span>Read more</span>
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTerms.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No terms found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Features Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Glossary Features</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🔍</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Smart Search</h4>
              <p className="text-gray-600 text-sm">Find terms by name or definition with instant search results</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📂</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Category Filter</h4>
              <p className="text-gray-600 text-sm">Browse terms by category to focus on specific topics</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💡</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Detailed Explanations</h4>
              <p className="text-gray-600 text-sm">Get comprehensive definitions with examples and related terms</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedTerm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedTerm.term}</h2>
                  <span className="px-4 py-2 text-sm font-medium bg-emerald-100 text-emerald-700 rounded-full">
                    {selectedTerm.category}
                  </span>
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

              {/* Definition */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Definition</h3>
                <p className="text-gray-700 leading-relaxed">{selectedTerm.definition}</p>
              </div>

              {/* Example */}
              {selectedTerm.example && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Example</h3>
                  <div className="bg-emerald-50 border-l-4 border-emerald-400 p-4 rounded-r-lg">
                    <p className="text-gray-700 italic">{selectedTerm.example}</p>
                  </div>
                </div>
              )}

              {/* Related Terms */}
              {selectedTerm.relatedTerms && selectedTerm.relatedTerms.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Related Terms</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTerm.relatedTerms.map((relatedTerm, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {relatedTerm}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
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
  );
} 