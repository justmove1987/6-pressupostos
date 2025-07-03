import { useEffect, useState } from "react";
import ServiceCard from "./components/ServiceCard";
import WebConfigurator from "./components/WebConfigurator";

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

  // 🔢 Estat per a la configuració web
  const [pages, setPages] = useState(1);
  const [languages, setLanguages] = useState(1);

  const toggleService = (id: keyof ServicesState) => {
    setSelected(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    const baseTotal = services.reduce(
      (sum, service) => sum + (selected[service.id] ? service.price : 0),
      0
    );

    // Si web està seleccionat, afegim cost extra
    const webExtra = selected.web ? (pages + languages) * 30 : 0;

    setTotal(baseTotal + webExtra);
  }, [selected, pages, languages]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
     <div className="bg-[url('/src/assets/header-bg.png')] bg-cover bg-center text-black py-14 text-center rounded-lg shadow-md mb-8">
      <h1 className="text-3xl font-bold">Aconsegueix la millor qualitat</h1>
    </div>

      <div className="max-w-xl mx-auto space-y-4">
        {services.map(service => (
          <div key={service.id}>
            <ServiceCard
              id={service.id}
              name={service.name}
              price={service.price}
              selected={selected[service.id]}
              onToggle={toggleService}
            />
            {service.id === "web" && selected.web && (
              <WebConfigurator
                pages={pages}
                languages={languages}
                onChangePages={setPages}
                onChangeLanguages={setLanguages}
              />
            )}
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
