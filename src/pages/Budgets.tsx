import { Link } from "react-router-dom";
import type { Budget } from "../types";

export default function Budgets({
  budgets = [],
  onDelete,
}: {
  budgets?: Budget[];
  onDelete?: (id: number) => void;
}) {
  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold mb-4 text-center">Pressupostos generats</h2>

      {budgets.length === 0 ? (
        <p className="text-center text-gray-500">Encara no s'ha creat cap pressupost.</p>
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          {budgets.map((b) => (
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
