type ServicesState = {
  seo: boolean;
  ads: boolean;
  web: boolean;
};

type Props = {
  id: keyof ServicesState;
  name: string;
  price: number;
  selected: boolean;
  onToggle: (id: keyof ServicesState) => void;
  pages?: number;
  languages?: number;
  onChangePages?: (value: number) => void;
  onChangeLanguages?: (value: number) => void;
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
}: Props) {
  return (
    <div
      className={`bg-white shadow-md p-5 rounded-lg border-2 transition-all space-y-4 ${
        selected ? "border-green-400" : "border-transparent"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-semibold text-lg">{name}</h2>
          <p className="text-sm text-gray-500">
            Programació d'una web responsive completa
          </p>
        </div>

        <div className="flex flex-col items-end space-y-2">
          <p className="text-xl font-bold">{price} €</p>
          <label className="flex items-center space-x-1 text-sm">
            <span>Afegir</span>
            <input
              type="checkbox"
              checked={selected}
              onChange={() => onToggle(id)}
              className="w-4 h-4 accent-green-500"
            />
          </label>
        </div>
      </div>

      {/* Només per Web quan està seleccionat */}
      {id === "web" && selected && onChangePages && onChangeLanguages && (
        <div className="flex flex-col gap-4 pt-2 pl-4 pr-2">
          {/* PÀGINES */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Nombre de pàgines</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onChangePages(Math.max(1, (pages || 1) - 1))}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-lg hover:bg-gray-100"
              >
                –
              </button>
              <div className="min-w-[48px] h-8 px-3 flex items-center justify-center border border-gray-300 rounded-full">
                {pages}
              </div>
              <button
                onClick={() => onChangePages((pages || 1) + 1)}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-lg hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* LLENGUATGES */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Nombre de llenguatges</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() =>
                  onChangeLanguages(Math.max(1, (languages || 1) - 1))
                }
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-lg hover:bg-gray-100"
              >
                –
              </button>
              <div className="min-w-[48px] h-8 px-3 flex items-center justify-center border border-gray-300 rounded-full">
                {languages}
              </div>
              <button
                onClick={() => onChangeLanguages((languages || 1) + 1)}
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
