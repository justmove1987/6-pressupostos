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
}: Props) {
  return (
    <div
      className={`border rounded-lg p-6 shadow-sm transition-all duration-300 ${
        selected ? "border-green-400" : "border-transparent"
      } bg-white`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-gray-500">Programació d'una web responsive completa</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">{price} €</p>
          <label className="inline-flex items-center mt-2">
            <input
              type="checkbox"
              checked={selected}
              onChange={() => onToggle(id)}
              className="accent-green-500 w-5 h-5"
            />
            <span className="ml-2 text-sm">Afegir</span>
          </label>
        </div>
      </div>

      {id === "web" && selected && (
        <div className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Nombre de pàgines</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onChangePages && onChangePages(Math.max(1, pages - 1))}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-lg hover:bg-gray-100"
              >
                –
              </button>
              <div className="min-w-[48px] h-8 px-3 flex items-center justify-center border border-gray-300 rounded-full">
                {pages}
              </div>
              <button
                onClick={() => onChangePages && onChangePages(pages + 1)}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-lg hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Nombre de llenguatges</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onChangeLanguages && onChangeLanguages(Math.max(1, languages - 1))}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-lg hover:bg-gray-100"
              >
                –
              </button>
              <div className="min-w-[48px] h-8 px-3 flex items-center justify-center border border-gray-300 rounded-full">
                {languages}
              </div>
              <button
                onClick={() => onChangeLanguages && onChangeLanguages(languages + 1)}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-lg hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
