"use client";
import { useState } from "react";

const scenarios = [
  { id: 1, label: "Fixed Deposit", risk: "Low" },
  { id: 2, label: "Mutual Fund", risk: "Medium" },
  { id: 3, label: "Stock Trading", risk: "High" },
  { id: 4, label: "Crypto", risk: "High" },
  { id: 5, label: "Savings Account", risk: "Low" },
  { id: 6, label: "Gold", risk: "Medium" },
  { id: 7, label: "Lottery Ticket", risk: "High" },
  { id: 8, label: "Government Bond", risk: "Low" },
];

const riskBuckets = ["Low", "Medium", "High"];

type DropState = Record<string, number[]>; // risk => scenario ids

function getInitialDropState() {
  return { Low: [], Medium: [], High: [] };
}

export default function RiskVsRewardPage() {
  const [dropState, setDropState] = useState<DropState>(getInitialDropState());
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const unassigned = scenarios.filter(s => !Object.values(dropState).flat().includes(s.id));

  function onDragStart(id: number) {
    setDraggedId(id);
  }
  function onDrop(risk: string) {
    if (draggedId !== null) {
      setDropState(prev => ({
        ...prev,
        [risk]: [...prev[risk], draggedId],
      }));
      setDraggedId(null);
    }
  }
  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
  }
  function resetGame() {
    setDropState(getInitialDropState());
    setShowResult(false);
  }
  function checkResult() {
    setShowResult(true);
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">🎲 Risk vs Reward</h1>
      <p className="mb-6 text-center text-gray-700">Drag each scenario to the correct risk bucket. Then check your answers!</p>
      <div className="flex flex-col sm:flex-row gap-6 mb-8">
        <div className="flex-1">
          <h2 className="font-semibold mb-2">Scenarios</h2>
          <ul className="space-y-2 min-h-[120px]">
            {unassigned.map(s => (
              <li
                key={s.id}
                draggable
                onDragStart={() => onDragStart(s.id)}
                className="bg-white border rounded px-3 py-2 shadow cursor-grab hover:bg-blue-50"
              >
                {s.label}
              </li>
            ))}
            {unassigned.length === 0 && <li className="text-gray-400">All assigned!</li>}
          </ul>
        </div>
        <div className="flex-[2] grid grid-cols-1 sm:grid-cols-3 gap-4">
          {riskBuckets.map(risk => (
            <div
              key={risk}
              onDrop={() => onDrop(risk)}
              onDragOver={onDragOver}
              className="bg-gray-100 rounded-lg p-3 min-h-[140px] flex flex-col items-center border-2 border-dashed border-gray-300"
            >
              <div className="font-bold mb-2">
                {risk} Risk
              </div>
              <ul className="space-y-2 w-full">
                {dropState[risk].map(id => {
                  const s = scenarios.find(x => x.id === id)!;
                  let correct = showResult ? (s.risk === risk) : null;
                  return (
                    <li
                      key={id}
                      className={`px-2 py-1 rounded text-center ${showResult ? (correct ? "bg-green-200" : "bg-red-200") : "bg-white border"}`}
                    >
                      {s.label}
                      {showResult && (
                        <span className="ml-2 text-xs">{correct ? "✅" : "❌"}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-4 justify-center">
        <button
          className="bg-blue-600 text-white rounded px-4 py-2 font-semibold"
          onClick={checkResult}
          disabled={unassigned.length > 0}
        >
          Check Answers
        </button>
        <button
          className="bg-gray-400 text-white rounded px-4 py-2 font-semibold"
          onClick={resetGame}
        >
          Reset
        </button>
      </div>
      {showResult && (
        <div className="mt-6 text-center">
          <h2 className="text-lg font-bold mb-2">Results</h2>
          <ul className="space-y-1">
            {scenarios.map(s => {
              const assigned = Object.entries(dropState).find(([risk, ids]) => ids.includes(s.id));
              const correct = assigned && assigned[0] === s.risk;
              return (
                <li key={s.id} className={correct ? "text-green-700" : "text-red-700"}>
                  {s.label}: {correct ? "Correct!" : `Should be ${s.risk} Risk`}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
} 