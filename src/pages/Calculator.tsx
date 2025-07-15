import { useState, useEffect } from "react";
import ServiceCard from "../components/ServiceCard";
import Budgets from "./Budgets";
import type { Budget, ServicesState } from "../types";

const services = [
  { id: "seo", name: "Seo", price: 300 },
  { id: "ads", name: "Ads", price: 400 },
  { id: "web", name: "Web", price: 500 },
];

export default function Calculator() {
  const [selected, setSelected] = useState<ServicesState>({ seo: false, ads: false, web: false });
  const [pages, setPages] = useState(1);
  const [languages, setLanguages] = useState(1);
  const [total, setTotal] = useState(0);
  const [showHelp, setShowHelp] = useState<"pages" | "languages" | false>(false);

  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [budgets, setBudgets] = useState<Budget[]>(() => {
    const saved = localStorage.getItem("budgets");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const base = services.reduce(
      (sum, s) => sum + (selected[s.id as keyof ServicesState] ? s.price : 0),
      0
    );
    const webExtra = selected.web ? (pages + languages) * 30 : 0;
    setTotal(base + webExtra);
  }, [selected, pages, languages]);

  useEffect(() => {
    localStorage.setItem("budgets", JSON.stringify(budgets));
  }, [budgets]);

  const handleCreate = () => {
    const chosenServices = services
      .filter(s => selected[s.id as keyof ServicesState])
      .map(s => s.name + (s.id === "web" ? ` (${pages} pàgines, ${languages} llenguatges)` : ""));

    const newBudget: Budget = {
      id: Date.now(),
      name: form.name,
      phone: form.phone,
      email: form.email,
      services: chosenServices,
      total,
      webConfig: selected.web ? { pages, languages } : undefined,
    };

    setBudgets(prev => [...prev, newBudget]);
    setForm({ name: "", phone: "", email: "" });
    setSelected({ seo: false, ads: false, web: false });
    setPages(1);
    setLanguages(1);
  };

  const handleDelete = (id: number) => {
    const updated = budgets.filter(b => b.id !== id);
    setBudgets(updated);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="bg-[url('/src/assets/header-bg.png')] bg-cover bg-center text-center py-12 rounded-lg shadow mb-8">
        <h1 className="text-3xl font-bold text-black">Aconsegueix la millor qualitat</h1>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {services.map(service => (
          <ServiceCard
            key={service.id}
            id={service.id as keyof ServicesState}
            name={service.name}
            price={service.price}
            selected={selected[service.id as keyof ServicesState]}
            onToggle={id => setSelected(prev => ({ ...prev, [id]: !prev[id] }))}
            {...(service.id === "web" && {
              pages,
              languages,
              onChangePages: setPages,
              onChangeLanguages: setLanguages,
              onHelpPages: () => setShowHelp("pages"),
              onHelpLanguages: () => setShowHelp("languages"),
            })}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto mt-8 text-right text-2xl font-bold">
        Preu pressupostat: {total} €
      </div>

      <div className="max-w-4xl mx-auto mt-12 mb-8 bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold">Demanar pressupost</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nom del pressupost"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Telèfon"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="border p-2 rounded"
          />
        </div>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={handleCreate}
        >
          Sol·licitar pressupost →
        </button>
      </div>

      <Budgets budgets={budgets} onDelete={handleDelete} />

      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
            <h3 className="text-xl font-bold mb-2">
              {showHelp === "pages" ? "Número de pàgines" : "Número de llenguatges"}
            </h3>
            <p className="text-sm text-gray-600">
              {showHelp === "pages"
                ? "Afegeix les pàgines que necessitarà el teu lloc web. Cada pàgina afegeix 30€ al pressupost."
                : "Afegeix els llenguatges que que tindrà el teu projecte. El cost de cada llenguatge és de 30€."}
            </p>
            <button
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => setShowHelp(false)}
            >
              Tancar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
