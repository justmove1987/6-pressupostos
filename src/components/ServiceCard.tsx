import { Minus, Plus } from "lucide-react";

type Props = {
  id: "seo" | "ads" | "web";
  name: string;
  price: number;
  selected: boolean;
  onToggle: (id: "seo" | "ads" | "web") => void;
  pages?: number;
  languages?: number;
  onChangePages?: (val: number) => void;
  onChangeLanguages?: (val: number) => void;
  onHelpPages?: () => void;
  onHelpLanguages?: () => void;
  isAnnual?: boolean;
};

export default function ServiceCard({
  id,
  name,
  price,
  selected,
  onToggle,
  pages = 1,
  languages = 1,
  onChangePages,
  onChangeLanguages,
  onHelpPages,
  onHelpLanguages,
  isAnnual = false,
}: Props) {
  const finalPrice = isAnnual ? price * 0.8 : price;

  return (
    <div
      className={`p-6 bg-white rounded-xl shadow-md flex justify-between items-center gap-4 border-2 ${
        selected ? "border-green-400" : "border-transparent"
      }`}
    >
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-600">
          Programació d'una web responsive completa
        </p>
      </div>

      <div className="flex flex-col items-center justify-center w-28">
        {isAnnual && (
          <span className="text-sm text-red-500 font-semibold mb-1">
            Ahorra un 20%
          </span>
        )}
        <div className="text-2xl font-bold text-center">
          {finalPrice.toFixed(0)} €
        </div>
      </div>

      {id === "web" && selected && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span
              className="text-sm cursor-pointer underline"
              onClick={onHelpPages}
            >
              Nombre de pàgines
            </span>
            <div className="flex items-center border rounded px-2 py-1">
              <button onClick={() => onChangePages?.(Math.max(1, pages - 1))}>
                <Minus size={14} />
              </button>
              <span className="px-2">{pages}</span>
              <button onClick={() => onChangePages?.(pages + 1)}>
                <Plus size={14} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="text-sm cursor-pointer underline"
              onClick={onHelpLanguages}
            >
              Nombre de llenguatges
            </span>
            <div className="flex items-center border rounded px-2 py-1">
              <button
                onClick={() =>
                  onChangeLanguages?.(Math.max(1, languages - 1))
                }
              >
                <Minus size={14} />
              </button>
              <span className="px-2">{languages}</span>
              <button onClick={() => onChangeLanguages?.(languages + 1)}>
                <Plus size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      <label className="flex items-center gap-2 ml-4">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onToggle(id)}
        />
        <span className="text-sm">Afegir</span>
      </label>
    </div>
  );
}
