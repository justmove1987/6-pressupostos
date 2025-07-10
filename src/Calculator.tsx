import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

export default function Calculator() {
  const [selected, setSelected] = useState<ServicesState>({
    seo: false,
    ads: false,
    web: false,
  });

  const [pages, setPages] = useState(1);
  const [languages, setLanguages] = useState(1);
  const [total, setTotal] = useState(0);

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

    const webExtra = selected.web ? (pages + languages) * 30 : 0;

    setTotal(baseTotal + webExtra);
  }, [selected, pages, languages]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      {/* TÍTOL AMB FONS DECORATIU */}
      <div
        className="bg-[url('/src/assets/header-bg.png')] bg-cover bg-center text-center py-12 rounded-lg shadow mb-8"
      >
        <h1 className="text-3xl font-bold text-black">
          Aconsegueix la millor qualitat
        </h1>
      </div>

      {/* TARGETES DE SERVEIS */}
      <div className="max-w-xl mx-auto space-y-4">
        {services.map(service => (
          <ServiceCard
            key={service.id}
            id={service.id}
            name={service.name}
            price={service.price}
            selected={selected[service.id]}
            onToggle={toggleService}
            {...(service.id === "web" && {
              pages,
              languages,
              onChangePages: setPages,
              onChangeLanguages: setLanguages,
            })}
          />
        ))}
      </div>

      {/* TOTAL */}
      <div className="max-w-xl mx-auto mt-8 text-right text-2xl font-bold">
        Preu pressupostat: {total} €
      </div>

      {/* ENLLAÇ PER TORNAR */}
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
