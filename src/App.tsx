import { useEffect, useState } from "react";
import ServiceCard from "./components/ServiceCard";

type ServicesState = {
  seo: boolean;
  ads: boolean;
  web: boolean;
};

type Service = {
  id: keyof ServicesState;
  name: string;
  price: number;
};

const services: Service[] = [
  { id: "seo", name: "Seo", price: 300 },
  { id: "ads", name: "Ads", price: 400 },
  { id: "web", name: "Web", price: 500 },
];

function App() {
  const [selected, setSelected] = useState<ServicesState>({
    seo: false,
    ads: false,
    web: false,
  });

  const [total, setTotal] = useState(0);

  const toggleService = (id: keyof ServicesState) => {
    setSelected(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    const newTotal = services.reduce(
      (sum, service) => sum + (selected[service.id] ? service.price : 0),
      0
    );
    setTotal(newTotal);
  }, [selected]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="bg-[url('/src/assets/header-bg.png')] bg-cover bg-center text-black py-12 text-center rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold">Aconsegueix la millor qualitat</h2>
      </div>

      <div className="max-w-xl mx-auto space-y-4">
        {services.map(service => (
          <ServiceCard
            key={service.id}
            id={service.id}
            name={service.name}
            price={service.price}
            selected={selected[service.id]}
            onToggle={toggleService}
          />
        ))}
      </div>

      <div className="max-w-xl mx-auto mt-8 text-right text-xl font-semibold">
        Preu pressupostat: {total} €
      </div>
    </div>
  );
}

export default App;
