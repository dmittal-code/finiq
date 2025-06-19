"use client";
import { useState } from "react";

export const metadata = {
  title: 'FinIQ Lite | Savings Goal',
  description: 'Set and track your savings goals with FinIQ Lite.'
};

export default function SavingsGoalPage() {
  const [target, setTarget] = useState(50000);
  const [monthly, setMonthly] = useState(2000);
  const [mode, setMode] = useState<"time" | "amount">("time");
  const [months, setMonths] = useState(24);

  // Calculate outputs
  let requiredMonthly = 0;
  let expectedMonths = 0;
  if (mode === "amount") {
    requiredMonthly = target / months;
  } else {
    expectedMonths = Math.ceil(target / monthly);
  }

  // For chart: build progress array
  const progress = [];
  let saved = 0;
  for (let i = 1; i <= (mode === "amount" ? months : expectedMonths); i++) {
    saved += mode === "amount" ? requiredMonthly : monthly;
    progress.push(Math.min(saved, target));
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">🎯 Savings Goal Calculator</h1>
      <div className="mb-6 flex flex-col gap-4">
        <label className="flex flex-col">
          Target Amount (₹)
          <input type="number" className="border rounded px-2 py-1" value={target} min={1} onChange={e => setTarget(Number(e.target.value))} />
        </label>
        <label className="flex flex-col">
          Monthly Saving (₹)
          <input type="number" className="border rounded px-2 py-1" value={monthly} min={1} onChange={e => setMonthly(Number(e.target.value))} disabled={mode === "amount"} />
        </label>
        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2">
            <input type="radio" checked={mode === "time"} onChange={() => setMode("time")}/>
            Calculate time to goal
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" checked={mode === "amount"} onChange={() => setMode("amount")}/>
            Calculate required monthly saving
          </label>
        </div>
        {mode === "amount" ? (
          <label className="flex flex-col">
            Timeframe (months)
            <input type="number" className="border rounded px-2 py-1" value={months} min={1} max={120} onChange={e => setMonths(Number(e.target.value))} />
          </label>
        ) : null}
      </div>
      <div className="bg-blue-100 rounded p-4 mb-6 text-center">
        {mode === "amount" ? (
          <div className="text-lg font-semibold">Required Monthly Saving: <span className="text-blue-700">₹{requiredMonthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
        ) : (
          <div className="text-lg font-semibold">Expected Time to Goal: <span className="text-blue-700">{expectedMonths} months</span></div>
        )}
      </div>
      {/* Simple progress chart */}
      <div className="mb-6">
        <h2 className="font-bold mb-2">Progress Timeline</h2>
        <svg viewBox="0 0 320 80" width="100%" height="60" className="bg-gray-100 rounded">
          <polyline
            fill="none"
            stroke="#2563eb"
            strokeWidth="3"
            points={progress.map((v, i) => `${(i/(progress.length-1||1))*300+10},${70-(v/target)*60}`).join(" ")}
          />
          {/* X axis */}
          <line x1="10" y1="70" x2="310" y2="70" stroke="#888" strokeWidth="1" />
          {/* Y axis */}
          <line x1="10" y1="10" x2="10" y2="70" stroke="#888" strokeWidth="1" />
          {/* Month labels */}
          {progress.length > 1 && progress.map((_, i) => (
            <text key={i} x={(i/(progress.length-1))*300+10} y="78" fontSize="9" textAnchor="middle">{i+1}</text>
          ))}
        </svg>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-2 py-1 border">Month</th>
              <th className="px-2 py-1 border">Saved (₹)</th>
            </tr>
          </thead>
          <tbody>
            {progress.map((v, i) => (
              <tr key={i}>
                <td className="px-2 py-1 border text-center">{i+1}</td>
                <td className="px-2 py-1 border text-right">₹{v.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 