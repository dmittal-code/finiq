"use client";
import { useState } from "react";

function calculateCompoundInterest(P: number, PMT: number, r: number, n: number, t: number) {
  // P = initial principal, PMT = monthly deposit, r = annual rate (decimal), n = compounds/year, t = years
  let values = [];
  let total = P;
  let yearlyTotals = [P];
  for (let year = 1; year <= t; year++) {
    for (let month = 1; month <= 12; month++) {
      total = total * (1 + r / n) + PMT;
    }
    yearlyTotals.push(total);
  }
  return { futureValue: total, yearlyTotals };
}

export default function CompoundInterestPage() {
  const [principal, setPrincipal] = useState(1000);
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(5);

  const n = 12; // compounds per year
  const r = rate / 100;
  const { futureValue, yearlyTotals } = calculateCompoundInterest(principal, monthly, r, n, years);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Compound Interest Simulator</h1>
      <form className="grid grid-cols-1 gap-4 mb-6">
        <label className="flex flex-col">
          Initial Amount (₹)
          <input type="number" className="border rounded px-2 py-1" value={principal} min={0} onChange={e => setPrincipal(Number(e.target.value))} />
        </label>
        <label className="flex flex-col">
          Monthly Saving (₹)
          <input type="number" className="border rounded px-2 py-1" value={monthly} min={0} onChange={e => setMonthly(Number(e.target.value))} />
        </label>
        <label className="flex flex-col">
          Interest Rate (% p.a.)
          <input type="number" className="border rounded px-2 py-1" value={rate} min={0} max={50} step={0.1} onChange={e => setRate(Number(e.target.value))} />
        </label>
        <label className="flex flex-col">
          Duration (years)
          <input type="number" className="border rounded px-2 py-1" value={years} min={1} max={30} onChange={e => setYears(Number(e.target.value))} />
        </label>
      </form>
      <div className="bg-green-100 rounded p-4 mb-6 text-center">
        <div className="text-lg font-semibold">Future Value: <span className="text-green-700">₹{futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
      </div>
      {/* Simple line graph using SVG */}
      <div className="mb-6">
        <h2 className="font-bold mb-2">Growth Over Time</h2>
        <svg viewBox="0 0 320 120" width="100%" height="80" className="bg-gray-100 rounded">
          {yearlyTotals.length > 1 && (
            <polyline
              fill="none"
              stroke="#22c55e"
              strokeWidth="3"
              points={yearlyTotals.map((v, i) => `${(i/(yearlyTotals.length-1))*300+10},${110-(v-yearlyTotals[0])/(yearlyTotals[yearlyTotals.length-1]-yearlyTotals[0]+1e-6)*100}`).join(" ")}
            />
          )}
          {/* X axis */}
          <line x1="10" y1="110" x2="310" y2="110" stroke="#888" strokeWidth="1" />
          {/* Y axis */}
          <line x1="10" y1="10" x2="10" y2="110" stroke="#888" strokeWidth="1" />
          {/* Year labels */}
          {yearlyTotals.map((_, i) => (
            <text key={i} x={(i/(yearlyTotals.length-1))*300+10} y="120" fontSize="10" textAnchor="middle">{i}</text>
          ))}
        </svg>
      </div>
      {/* Table view */}
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-2 py-1 border">Year</th>
              <th className="px-2 py-1 border">Value (₹)</th>
            </tr>
          </thead>
          <tbody>
            {yearlyTotals.map((v, i) => (
              <tr key={i}>
                <td className="px-2 py-1 border text-center">{i}</td>
                <td className="px-2 py-1 border text-right">₹{v.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 