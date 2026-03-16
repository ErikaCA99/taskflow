import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-8xl font-bold text-slate-700 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-slate-100 mb-2">
        Página no encontrada
      </h2>
      <p className="text-slate-400 mb-8">
        La página que buscas no existe o fue movida.
      </p>
      <Link
        href="/"
        className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-3 rounded-lg transition text-sm"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
