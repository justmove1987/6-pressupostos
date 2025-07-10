import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 text-center px-4">
      <h1 className="text-3xl font-bold mb-6">Benvingut/da al Pressupostador Web</h1>
      <p className="text-gray-700 max-w-xl mb-8">
        Aquesta aplicació et permet calcular fàcilment el cost dels serveis que oferim.
      </p>
      <Link to="/calculadora" className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition">
        Comença a calcular
      </Link>
    </div>
  );
}
