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

  const [form, setForm] = useState({ client: "", phone: "", email: "" });
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
      name: "",
      client: form.client,
      phone: form.phone,
      email: form.email,
      services: chosenServices,
      total,
      webConfig: selected.web ? { pages, languages } : undefined,
    };

    setBudgets(prev => [...prev, newBudget]);
    setForm({ client: "", phone: "", email: "" });
    setSelected({ seo: false, ads: false, web: false });
    setPages(1);
    setLanguages(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="bg-[url('/src/assets/header-bg.png')] bg-cover bg-center text-center py-12 rounded-lg shadow mb-8">
        <h1 className="text-3xl font-bold text-black">Aconsegueix la millor qualitat</h1>
      </div>

      <div className="max-w-xl mx-auto space-y-4">
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
            })}
          />
        ))}
      </div>

      <div className="max-w-xl mx-auto mt-8 text-right text-2xl font-bold">
        Preu pressupostat: {total} €
      </div>

      <div className="max-w-xl mx-auto mt-12 mb-8 bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold">Demanar pressupost</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nom del client"
            value={form.client}
            onChange={e => setForm({ ...form, client: e.target.value })}
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

      <Budgets budgets={budgets} />
    </div>
  );
}

