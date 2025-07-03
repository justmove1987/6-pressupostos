type Props = {
  pages: number;
  languages: number;
  onChangePages: (value: number) => void;
  onChangeLanguages: (value: number) => void;
};

export default function WebConfigurator({
  pages,
  languages,
  onChangePages,
  onChangeLanguages,
}: Props) {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg mt-2">
      <h3 className="font-medium mb-2">Configuració del servei Web</h3>

      <div className="flex flex-col gap-4">
        <label className="flex flex-col">
          Nombres de pàgines:
          <input
            type="number"
            min={1}
            value={pages}
            onChange={e => onChangePages(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 mt-1"
          />
        </label>

        <label className="flex flex-col">
          Nombres d'idiomes:
          <input
            type="number"
            min={1}
            value={languages}
            onChange={e => onChangeLanguages(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 mt-1"
          />
        </label>
      </div>
    </div>
  );
}
