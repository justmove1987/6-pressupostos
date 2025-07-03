import { useState } from "react";

type Service = {
  id: string;
  name: string;
  price: number;
};

const services: Service[] = [
  { id: "seo", name: "Seo", price: 300 },
  { id: "ads", name: "Ads", price: 400 },
  { id: "web", name: "Web", price: 500 },
];

function App() {
  const [selected, setSelected] = useState<string[]>([]);

  const handleToggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const total = selected.reduce(
    (sum, id) => sum + (services.find(s => s.id === id)?.price || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Aconsegueix la millor qualitat</h1>

      <div className="max-w-xl mx-auto space-y-4">
        {services.map(service => (
          <div key={service.id} className="flex items-center justify-between bg-white shadow-md p-5 rounded-lg">
            <div>
              <h2 className="font-semibold text-lg">{service.name}</h2>
              <p className="text-sm text-gray-500">Programació d'una web responsive completa</p>
            </div>

            <div className="flex items-center space-x-4">
              <p className="text-xl font-bold">{service.price} €</p>
              <label className="flex items-center space-x-1 text-sm">
                <span>Afegir</span>
                <input
                  type="checkbox"
                  checked={selected.includes(service.id)}
                  onChange={() => handleToggle(service.id)}
                  className="w-4 h-4"
                />
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-xl mx-auto mt-8 text-right text-xl font-semibold">
        Preu pressupostat: {total} €
      </div>
    </div>
  );
}

export default App;
