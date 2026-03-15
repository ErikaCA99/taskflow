import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logoutAction } from "@/actions/auth";

async function NavBar() {
  let user = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    user = null;
  }

  return (
    <nav className="flex justify-between items-center bg-gray-950 text-white px-8 py-3 border-b border-slate-800">
      <Link
        href="/"
        className="text-xl font-bold text-white hover:text-blue-300 transition"
      >
        TaskFlow
      </Link>

      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-slate-400 text-sm hidden sm:block">
            {user.user_metadata?.full_name ?? user.email}
          </span>
          <Link
            href="/projects"
            className="text-slate-300 hover:text-white text-sm transition"
          >
            Proyectos
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-sm px-3 py-1.5 rounded-lg transition"
            >
              Cerrar sesión
            </button>
          </form>
        </div>
      ) : (
        <ul className="flex gap-x-2">
          <li>
            <Link
              href="/login"
              className="text-slate-300 hover:text-white text-sm px-3 py-1.5 rounded-lg transition"
            >
              Iniciar sesión
            </Link>
          </li>
          <li>
            <Link
              href="/register"
              className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-3 py-1.5 rounded-lg transition"
            >
              Registrarse
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default NavBar;
