import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ServiceCard from "../components/ServiceCard";
import Budgets from "./Budgets";
import type { Budget, ServicesState } from "../types";


const services = [
  { id: "seo", name: "Seo", price: 300 },
  { id: "ads", name: "Ads", price: 400 },
  { id: "web", name: "Web", price: 500 },
];

export default function Calculator() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selected, setSelected] = useState<ServicesState>({ seo: false, ads: false, web: false });
  const [pages, setPages] = useState(0);
const [languages, setLanguages] = useState(0);
  const [total, setTotal] = useState(0);
  const [showHelp, setShowHelp] = useState<"pages" | "languages" | false>(false);
  const [isAnnual, setIsAnnual] = useState(false);

  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [budgets, setBudgets] = useState<Budget[]>(() => {
    const saved = localStorage.getItem("budgets");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const seo = searchParams.get("seo") === "true";
    const ads = searchParams.get("ads") === "true";
    const web = searchParams.get("web") === "true";
    const pages = parseInt(searchParams.get("pages") || "0");
    const languages = parseInt(searchParams.get("languages") || "0");
    const annual = searchParams.get("annual") === "true";

    setSelected({ seo, ads, web });
    setPages(isNaN(pages) ? 1 : pages);
    setLanguages(isNaN(languages) ? 1 : languages);
    setIsAnnual(annual);
  }, [searchParams]);

  useEffect(() => {
    const base = services.reduce(
      (sum, s) => sum + (selected[s.id as keyof ServicesState] ? s.price : 0),
      0
    );
    const webExtra = selected.web ? (pages + languages) * 30 : 0;
    const final = base + webExtra;
    const discounted = isAnnual ? final * 0.8 : final;
    setTotal(discounted);
  }, [selected, pages, languages, isAnnual, setSearchParams]);

  useEffect(() => {
    localStorage.setItem("budgets", JSON.stringify(budgets));
  }, [budgets]);

    useEffect(() => {
    const params: Record<string, string> = {
      seo: selected.seo.toString(),
      ads: selected.ads.toString(),
      web: selected.web.toString(),
      pages: pages.toString(),
      languages: languages.toString(),
      annual: isAnnual.toString(),
    };
    setSearchParams(params);
  }, [selected, pages, languages, isAnnual, setSearchParams]);

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

      <div className="flex justify-center items-center gap-4 mb-6">
        <span className="text-sm font-medium">Pagament mensual</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isAnnual}
            onChange={() => setIsAnnual(prev => !prev)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-500 rounded-full peer dark:bg-gray-700 peer-checked:bg-green-500"></div>
          <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform duration-300 peer-checked:translate-x-full"></div>
        </label>
        <span className="text-sm font-medium">Pagament anual</span>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {services.map(service => (
          <ServiceCard
            key={service.id}
            id={service.id as keyof ServicesState}
            name={service.name}
            price={service.price}
            selected={selected[service.id as keyof ServicesState]}
            onToggle={id => {
              setSelected(prev => {
                const next = { ...prev, [id]: !prev[id] };
                if (id === "web" && !prev.web === true) {
                  // Si s'està activant web (ara passa a true), no canvia res
                  return next;
                }
                return next;
              });
            }}
            isAnnual={isAnnual}
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
        Preu pressupostat: {total.toFixed(2)} €
      </div>

      <div className="max-w-4xl mx-auto mt-12 mb-8 bg-white p-6 rounded-lg shadow flex flex-wrap items-end gap-4">
        <h2 className="text-xl font-semibold w-full">Demanar pressupost</h2>
        <input
          type="text"
          placeholder="Nom del pressupost"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded flex-1"
        />
        <input
          type="text"
          placeholder="Telèfon"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
          className="border p-2 rounded flex-1"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="border p-2 rounded flex-1"
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={handleCreate}
        >
          Sol·licitar pressupost →
        </button>
      </div>

      <div className="border-t border-dotted border-gray-300 my-8"></div>

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
