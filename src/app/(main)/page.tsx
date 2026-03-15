import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/supabase/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

async function getDashboardData(userId: string) {
  const [projects, tasks] = await Promise.all([
    prisma.project.findMany({
      where: { userId },
      include: {
        _count: { select: { tasks: true } },
        tasks: { select: { status: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const totalProjects = projects.length;
  const totalTasks = tasks.length;

  const tasksByStatus = {
    PENDING: tasks.filter((t) => t.status === "PENDING").length,
    IN_PROGRESS: tasks.filter((t) => t.status === "IN_PROGRESS").length,
    COMPLETED: tasks.filter((t) => t.status === "COMPLETED").length,
  };

  // Últimas 5 tareas
  const recentTasks = tasks.slice(0, 5);

  // Top 3 proyectos con más tareas pendientes
  const topProjects = projects
    .map((p) => ({
      ...p,
      pendingCount: p.tasks.filter((t) => t.status === "PENDING").length,
    }))
    .sort((a, b) => b.pendingCount - a.pendingCount)
    .slice(0, 3);

  return { totalProjects, totalTasks, tasksByStatus, recentTasks, topProjects };
}

const COLOR_MAP: Record<string, string> = {
  red: "#ef4444",
  blue: "#3b82f6",
  green: "#22c55e",
  yellow: "#eab308",
  purple: "#8b5cf6",
  pink: "#ec4899",
};

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Pendiente",
  IN_PROGRESS: "En progreso",
  COMPLETED: "Completado",
};

const STATUS_BADGE: Record<string, string> = {
  PENDING: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  IN_PROGRESS: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  COMPLETED: "bg-green-500/10 text-green-400 border border-green-500/20",
};

const PRIORITY_LABELS: Record<string, string> = {
  LOW: "Baja",
  MEDIUM: "Media",
  HIGH: "Alta",
};

const PRIORITY_COLORS: Record<string, string> = {
  LOW: "text-slate-500",
  MEDIUM: "text-yellow-400",
  HIGH: "text-red-400",
};

async function DashboardHome() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { totalProjects, totalTasks, tasksByStatus, recentTasks, topProjects } =
    await getDashboardData(user.id);

  const displayName = user.user_metadata?.full_name ?? user.email ?? "";

  return (
    <div className="fade-in max-w-5xl mx-auto p-15">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
          Hola, {displayName.split(" ")[0]}
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Aquí está el resumen de tu actividad
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { label: "Proyectos", value: totalProjects, color: "text-blue-400" },
          { label: "Total tareas", value: totalTasks, color: "text-slate-100" },
          {
            label: "Pendientes",
            value: tasksByStatus.PENDING,
            color: "text-yellow-400",
          },
          {
            label: "Completadas",
            value: tasksByStatus.COMPLETED,
            color: "text-green-400",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-slate-900 border border-slate-800 rounded-xl p-4"
          >
            <p className="text-slate-500 text-xs mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-6">
        <h2 className="text-slate-100 font-semibold text-sm mb-4">
          Distribución de tareas
        </h2>
        <div className="flex gap-3 flex-wrap">
          {[
            {
              label: "Pendientes",
              count: tasksByStatus.PENDING,
              cls: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
            },
            {
              label: "En progreso",
              count: tasksByStatus.IN_PROGRESS,
              cls: "bg-blue-500/10 text-blue-400 border-blue-500/20",
            },
            {
              label: "Completadas",
              count: tasksByStatus.COMPLETED,
              cls: "bg-green-500/10 text-green-400 border-green-500/20",
            },
          ].map((s) => (
            <div
              key={s.label}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${s.cls}`}
            >
              <span className="text-lg font-bold">{s.count}</span>
              <span className="text-xs">{s.label}</span>
            </div>
          ))}
          {totalTasks > 0 && (
            <div className="flex-1 min-w-32 flex items-center">
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden flex">
                <div
                  className="bg-yellow-400 h-full transition-all"
                  style={{
                    width: `${(tasksByStatus.PENDING / totalTasks) * 100}%`,
                  }}
                />
                <div
                  className="bg-blue-400 h-full transition-all"
                  style={{
                    width: `${(tasksByStatus.IN_PROGRESS / totalTasks) * 100}%`,
                  }}
                />
                <div
                  className="bg-green-400 h-full transition-all"
                  style={{
                    width: `${(tasksByStatus.COMPLETED / totalTasks) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h2 className="text-slate-100 font-semibold text-sm mb-4">
            Últimas tareas creadas
          </h2>
          {recentTasks.length === 0 ? (
            <p className="text-slate-600 text-sm">No hay tareas aún</p>
          ) : (
            <div className="flex flex-col gap-2">
              {recentTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between gap-3 py-2 border-b border-slate-800 last:border-0"
                >
                  <p
                    className={`text-sm truncate flex-1 ${task.status === "COMPLETED" ? "line-through text-slate-500" : "text-slate-200"}`}
                  >
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-xs font-medium ${PRIORITY_COLORS[task.priority]}`}
                    >
                      {PRIORITY_LABELS[task.priority]}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_BADGE[task.status]}`}
                    >
                      {STATUS_LABELS[task.status]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top 3 proyectos con más tareas pendientes */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h2 className="text-slate-100 font-semibold text-sm mb-4">
            Proyectos con más pendientes
          </h2>
          {topProjects.length === 0 ? (
            <p className="text-slate-600 text-sm">No hay proyectos aún</p>
          ) : (
            <div className="flex flex-col gap-3">
              {topProjects.map((project, i) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="flex items-center gap-3 py-2 border-b border-slate-800 last:border-0 hover:opacity-80 transition group"
                >
                  <span className="text-slate-600 text-xs font-bold w-4 shrink-0">
                    {i + 1}
                  </span>
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{
                      background: COLOR_MAP[project.color] ?? project.color,
                    }}
                  />
                  <p className="text-slate-200 text-sm flex-1 truncate group-hover:text-blue-400 transition">
                    {project.name}
                  </p>
                  <span className="text-xs text-yellow-400 shrink-0">
                    {project.pendingCount} pendiente
                    {project.pendingCount !== 1 ? "s" : ""}
                  </span>
                </Link>
              ))}
            </div>
          )}
          <Link
            href="/projects"
            className="block text-center text-xs text-slate-500 hover:text-blue-400 transition mt-4"
          >
            Ver todos los proyectos →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
