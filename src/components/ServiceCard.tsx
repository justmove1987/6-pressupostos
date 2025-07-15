

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
  pages = 0,
  languages = 0,
  onChangePages,
  onChangeLanguages,
  onHelpPages,
  onHelpLanguages,
  isAnnual = false,
}: Props) {
  const webExtra = id === "web" && selected ? (pages + languages) * 30 : 0;
  const finalPrice = isAnnual ? (price + webExtra) * 0.8 : price + webExtra;

  return (
    <div
      className={`p-6 bg-white rounded-xl shadow-md border-2 ${
        selected ? "border-green-400" : "border-transparent"
      }`}
    >
      <div className="flex justify-between items-center gap-4">
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
          <div className="text-3xl font-bold text-center">
            {finalPrice.toFixed(0)} €
          </div>
        </div>

        <label className="flex items-center gap-2 ml-4">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onToggle(id)}
          />
          <span className="text-sm">Afegir</span>
        </label>
      </div>

      {id === "web" && selected && (
        <div className="w-full mt-4 flex flex-col items-center">
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <div className="flex flex-col">
              <span className="underline cursor-pointer text-sm" onClick={onHelpPages}>
                Nombre de pàgines
              </span>
              <div className="flex items-center mt-1">
                <button
                  onClick={() => onChangePages?.(Math.max(pages - 1, 0))}
                  className="border px-2 py-1 rounded-l disabled:opacity-50"
                  disabled={pages <= 0}
                >
                  −
                </button>
                <div className="border-t border-b px-2 py-1">{pages}</div>
                <button
                  onClick={() => onChangePages?.(pages + 1)}
                  className="border py-1 px-2 rounded-r"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="underline cursor-pointer text-sm" onClick={onHelpLanguages}>
                Nombre de llenguatges
              </span>
              <div className="flex items-center mt-1">
                <button
                  onClick={() => onChangeLanguages?.(Math.max(languages - 1, 0))}
                  className="border px-2 py-1 rounded-l disabled:opacity-50"
                  disabled={languages <= 0}
                >
                  −
                </button>
                <div className="border-t border-b px-2 py-1">{languages}</div>
                <button
                  onClick={() => onChangeLanguages?.(languages + 1)}
                  className="border px-2 py-1 rounded-r"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
