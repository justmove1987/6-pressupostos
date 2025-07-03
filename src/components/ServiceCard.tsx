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
};

export default function ServiceCard({ id, name, price, selected, onToggle }: Props) {
  return (
    <div className="flex items-center justify-between bg-white shadow-md p-5 rounded-lg">
      <div>
        <h2 className="font-semibold text-lg">{name}</h2>
        <p className="text-sm text-gray-500">Programació d'una web responsive completa</p>
      </div>

      <div className="flex items-center space-x-4">
        <p className="text-xl font-bold">{price} €</p>
        <label className="flex items-center space-x-1 text-sm">
          <span>Afegir</span>
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onToggle(id)}
            className="w-4 h-4"
          />
        </label>
      </div>
    </div>
  );
}
