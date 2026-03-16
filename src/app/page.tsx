import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default async function RootPage() {
  let user = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    user = null;
  }

  if (user) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-5xl font-bold text-slate-100 tracking-tight mb-4">
          Gestiona tus proyectos
          <br />
          <span className="text-blue-400">sin complicaciones</span>
        </h1>

        <p className="text-slate-400 text-lg max-w-xl mb-10">
          TaskFlow te ayuda a organizar tus proyectos y tareas de forma simple,
          con seguimiento de estado y prioridades.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/register"
            className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-8 py-3 rounded-lg transition text-sm"
          >
            Empezar gratis
          </Link>
          <Link
            href="/login"
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium px-8 py-3 rounded-lg transition text-sm border border-slate-700"
          >
            Ya tengo cuenta
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-20 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: "/carpeta.png",
              title: "Proyectos",
              desc: "Crea y organiza proyectos con colores personalizados",
            },
            {
              icon: "/tasks.png",
              title: "Tareas",
              desc: "Gestiona tareas con estados y prioridades claras",
            },
            {
              icon: "/panel.png",
              title: "Dashboard",
              desc: "Visualiza tu progreso con estadísticas en tiempo real",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5"
            >
              <Image
                src={f.icon}
                alt={f.title}
                width={40}
                height={40}
                className="mb-3"
              />
              <h3 className="text-slate-100 font-semibold text-sm mb-1">
                {f.title}
              </h3>
              <p className="text-slate-500 text-xs">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
