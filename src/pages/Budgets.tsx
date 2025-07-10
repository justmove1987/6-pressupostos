import type { Budget } from "../types";

export default function Budgets({ budgets }: { budgets: Budget[] }) {
  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold mb-4 text-center">Pressupostos generats</h2>

      {budgets.length === 0 ? (
        <p className="text-center text-gray-500">Encara no s'ha creat cap pressupost.</p>
      ) : (
        <div className="space-y-6">
          {budgets.map(b => (
            <div
              key={b.id}
              className="bg-white p-6 rounded-lg shadow flex flex-col gap-4 sm:flex-row sm:justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold">{b.name}</h3>
                <p className="text-sm text-gray-600">Client: {b.client}</p>
                <p className="text-sm text-gray-600">Tel: {b.phone}</p>
                <p className="text-sm text-gray-600">Email: {b.email}</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Serveis:</p>
                <ul className="list-disc list-inside">
                  {b.services.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
              <div className="text-right text-xl font-bold">{b.total} €</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
