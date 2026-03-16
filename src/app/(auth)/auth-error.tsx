import Link from "next/link";

export default function AuthError() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h2 className="text-2xl font-semibold text-slate-100 mb-2">
        Link inválido o expirado
      </h2>
      <p className="text-slate-400 mb-6">
        Solicita un nuevo enlace de confirmación.
      </p>
      <Link
        href="/login"
        className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-3 rounded-lg transition text-sm"
      >
        Volver al login
      </Link>
    </div>
  );
}
