import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Budget } from "../types";

export default function Budgets({ budgets = [], onDelete }: { budgets?: Budget[], onDelete?: (id: number) => void }) {
  const [localBudgets, setLocalBudgets] = useState<Budget[]>(budgets);
  const [sortMode, setSortMode] = useState<"original" | "name" | "date" | "total">("original");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLocalBudgets(budgets);
  }, [budgets]);

  const toggleSort = (mode: "name" | "date" | "total") => {
    if (sortMode === mode) {
      setSortDirection(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortMode(mode);
      setSortDirection("asc");
    }
  };

  const filteredBudgets = localBudgets.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedBudgets = [...filteredBudgets].sort((a, b) => {
    let result = 0;
    if (sortMode === "name") result = a.name.localeCompare(b.name);
    if (sortMode === "date") result = a.id - b.id;
    if (sortMode === "total") result = a.total - b.total;
    return sortDirection === "asc" ? result : -result;
  });

  const getArrow = (mode: string) => {
    return sortMode === mode ? (sortDirection === "asc" ? "▲" : "▼") : "";
  };

  return (
    <div className="mt-12">
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl font-bold">Pressupostos</h2>
          <div className="flex flex-wrap gap-2 items-center w-full sm:w-auto">
            <input
              type="text"
              placeholder="🔍 Cerca per nom..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm w-full sm:w-64"
            />
            <div className="flex gap-2">
              <button onClick={() => toggleSort("name")} className="px-4 py-1 text-sm border rounded bg-white hover:bg-gray-100">
                🔠 Nom {getArrow("name")}
              </button>
              <button onClick={() => toggleSort("date")} className="px-4 py-1 text-sm border rounded bg-white hover:bg-gray-100">
                📅 Data {getArrow("date")}
              </button>
              <button onClick={() => toggleSort("total")} className="px-4 py-1 text-sm border rounded bg-white hover:bg-gray-100">
                💶 Import {getArrow("total")}
              </button>
              <button onClick={() => { setSortMode("original"); setSortDirection("asc"); }} className="px-4 py-1 text-sm border rounded bg-white hover:bg-gray-100">
                ♻️ Reinicia
              </button>
            </div>
          </div>
        </div>
      </div>

      {sortedBudgets.length === 0 ? (
        <p className="text-center text-gray-500">Encara no s'ha creat cap pressupost.</p>
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          {sortedBudgets.map(b => (
            <div
              key={b.id}
              className="bg-white p-6 rounded-lg shadow grid grid-cols-[1fr_1fr_auto] items-start gap-4"
            >
              {/* Columna 1: Info del client */}
              <div>
                <h3 className="text-lg font-semibold">{b.name}</h3>
                <p className="text-sm text-gray-600">Tel: {b.phone}</p>
                <p className="text-sm text-gray-600">Email: {b.email}</p>
              </div>

              {/* Columna 2: Serveis */}
              <div className="min-h-[64px]">
                <p className="font-medium">Serveis:</p>
                <ul className="list-disc list-inside">
                  {b.services.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              {/* Columna 3: Preu i botó */}
              <div className="text-right flex flex-col justify-between items-end">
                <div className="text-xl font-bold">{b.total} €</div>
                <button
                  onClick={() => onDelete?.(b.id)}
                  className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-10">
        <Link
          to="/"
          className="text-green-600 underline hover:text-green-800 transition"
        >
          Tornar a la benvinguda
        </Link>
      </div>
    </div>
  );
}
