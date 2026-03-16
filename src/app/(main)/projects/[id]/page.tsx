import { getProjectByIdAction } from "@/actions/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import TaskList from "@/components/tasks/TaskList";
import EditProjectButton from "@/components/projects/EdithButton";
import DeleteProjectButton from "@/components/projects/DeleteButton";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const project = await getProjectByIdAction(id);

  if (!project) notFound();

  const pending = project.tasks.filter((t) => t.status === "PENDING").length;
  const inProgress = project.tasks.filter(
    (t) => t.status === "IN_PROGRESS",
  ).length;
  const completed = project.tasks.filter(
    (t) => t.status === "COMPLETED",
  ).length;

  const tasks = project.tasks.map((t) => ({
    taskId: t.id,
    title: t.title,
    description: t.description,
    status: t.status as "PENDING" | "IN_PROGRESS" | "COMPLETED",
    priority: t.priority as "LOW" | "MEDIUM" | "HIGH",
    userId: t.userId,
    projectId: t.projectId,
    createdBy: t.createdBy,
    updatedBy: t.updatedBy,
    createdAt: t.createdAt.toISOString(),
    updatedAt: t.updatedAt.toISOString(),
  }));

  return (
    <div className="fade-in max-w-6xl mx-auto px-8 py-6 space-y-6">
      <div className="flex items-center gap-2 mb-6 text-[0.82rem] text-slate-500">
        <Link
          href="/projects"
          className="text-slate-500 no-underline hover:text-slate-300 transition"
        >
          Proyectos
        </Link>
        <span>/</span>
        <span className="text-slate-300">{project.name}</span>
      </div>

      <div className="card p-5 mb-7 flex justify-between items-start gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div
            className="w-3.5 h-3.5 rounded-full shrink-0"
            style={{ background: project.color }}
          />
          <div>
            <h1 className="text-[1.3rem] font-bold text-slate-100 tracking-tight">
              {project.name}
            </h1>
            {project.description && (
              <p className="text-slate-500 text-[0.85rem] mt-0.5">
                {project.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full font-medium border text-yellow-400 border-yellow-500/30 bg-yellow-500/10">
              ● Pendiente {pending}
            </span>

            <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full font-medium border text-blue-400 border-blue-500/30 bg-blue-500/10">
              ● En progreso {inProgress}
            </span>

            <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full font-medium border text-green-400 border-green-500/30 bg-green-500/10">
              ● Completada {completed}
            </span>
          </div>
          <EditProjectButton
            project={{
              projectId: project.id,
              name: project.name,
              description: project.description,
              color: project.color,
            }}
          />
          <DeleteProjectButton id={project.id} redirectAfter={true} />
        </div>
      </div>

      <TaskList tasks={tasks} projectId={project.id} />
    </div>
  );
}
