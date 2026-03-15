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
    <div className="project-card bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition group">
      <div className="project-card__header flex items-start justify-between mb-3">
        <div className="project-card__title-container flex items-center gap-3">
          <div
            className="project-card__color-indicator w-4 h-4 rounded-full shrink-0 mt-0.5"
            style={{ backgroundColor: project.color }}
          />

          <Link
            href={`/projects/${project.id}`}
            className="project-card__title text-slate-100 font-semibold hover:text-blue-400 transition line-clamp-1"
          >
            {project.name}
          </Link>
        </div>

        <DeleteButton id={project.id} />
      </div>

      {project.description && (
        <p className="project-card__description text-slate-500 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
      )}

      <div className="project-card__stats flex gap-3 text-xs mt-auto pt-3 border-t border-slate-800">
        <span className="project-card__stat project-card__stat--pending text-yellow-500">
          ● {pending} pendiente{pending !== 1 ? "s" : ""}
        </span>

        <span className="project-card__stat project-card__stat--progress text-blue-400">
          ● {inProgress} en progreso
        </span>

        <span className="project-card__stat project-card__stat--completed text-green-500">
          ● {completed} completada{completed !== 1 ? "s" : ""}
        </span>
      </div>

      {total === 0 && (
        <p className="project-card__empty text-slate-600 text-xs mt-3">
          Sin tareas aún
        </p>
      )}
    </div>
  );
}
