import Link from "next/link";
import { Prisma } from "@prisma/client";
import DeleteButton from "./DeleteButton";

type ProjectWithTasks = Prisma.ProjectGetPayload<{
  include: {
    _count: { select: { tasks: true } };
    tasks: { select: { status: true } };
  };
}>;

interface ProjectCardProps {
  project: ProjectWithTasks;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const pending = project.tasks.filter((t) => t.status === "PENDING").length;
  const inProgress = project.tasks.filter(
    (t) => t.status === "IN_PROGRESS",
  ).length;
  const completed = project.tasks.filter(
    (t) => t.status === "COMPLETED",
  ).length;
  const total = project._count.tasks;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition group">
      {/* Color + nombre */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-4 h-4 rounded-full shrink-0 mt-0.5"
            style={{ backgroundColor: project.color }}
          />
          <Link
            href={`/projects/${project.id}`}
            className="text-slate-100 font-semibold hover:text-blue-400 transition line-clamp-1"
          >
            {project.name}
          </Link>
        </div>
        <DeleteButton id={project.id} />
      </div>

      {/* Descripción */}
      {project.description && (
        <p className="text-slate-500 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
      )}

      {/* Conteo de tareas por estado */}
      <div className="flex gap-3 text-xs mt-auto pt-3 border-t border-slate-800">
        <span className="text-yellow-500">
          ● {pending} pendiente{pending !== 1 ? "s" : ""}
        </span>
        <span className="text-blue-400">● {inProgress} en progreso</span>
        <span className="text-green-500">
          ● {completed} completada{completed !== 1 ? "s" : ""}
        </span>
      </div>

      {total === 0 && (
        <p className="text-slate-600 text-xs mt-3">Sin tareas aún</p>
      )}
    </div>
  );
}
