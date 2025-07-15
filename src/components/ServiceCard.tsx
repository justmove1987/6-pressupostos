import { Info } from "lucide-react";

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
};

export default function ServiceCard({
  id,
  name,
  price,
  selected,
  onToggle,
  pages,
  languages,
  onChangePages,
  onChangeLanguages,
  onHelpPages,
  onHelpLanguages,
}: Props) {
  return (
    <div className={`border bg-white rounded-lg p-6 shadow-sm ${selected ? "border-green-400" : "border-transparent"}`}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-sm text-gray-600">Programació d'una web responsive completa</p>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold">{price} €</div>
          <label className="text-sm text-gray-700 flex items-center gap-1">
            <input
              type="checkbox"
              checked={selected}
              onChange={() => onToggle(id)}
              className="mr-2"
            />
            Afegir
          </label>
        </div>
      </div>

      {id === "web" && selected && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {/* Número de pàgines */}
          <div>
            <label className="text-sm font-medium flex items-center gap-1">
              Nombre de pàgines
              {onHelpPages && (
                <button onClick={onHelpPages} type="button">
                  <Info size={16} className="text-blue-600 hover:text-blue-800" />
                </button>
              )}
            </label>
            <div className="flex items-center gap-2 mt-1">
              <button onClick={() => onChangePages?.(Math.max(1, (pages || 1) - 1))} className="w-6 h-6 rounded-full bg-gray-200 text-center">−</button>
              <div className="border px-4 py-1 rounded">{pages}</div>
              <button onClick={() => onChangePages?.((pages || 1) + 1)} className="w-6 h-6 rounded-full bg-gray-200 text-center">+</button>
            </div>
          </div>

          {/* Número de llenguatges */}
          <div>
            <label className="text-sm font-medium flex items-center gap-1">
              Nombre de llenguatges
              {onHelpLanguages && (
                <button onClick={onHelpLanguages} type="button">
                  <Info size={16} className="text-blue-600 hover:text-blue-800" />
                </button>
              )}
            </label>
            <div className="flex items-center gap-2 mt-1">
              <button onClick={() => onChangeLanguages?.(Math.max(1, (languages || 1) - 1))} className="w-6 h-6 rounded-full bg-gray-200 text-center">−</button>
              <div className="border px-4 py-1 rounded">{languages}</div>
              <button onClick={() => onChangeLanguages?.((languages || 1) + 1)} className="w-6 h-6 rounded-full bg-gray-200 text-center">+</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
