import { getProjectByIdAction } from "@/actions/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import TaskList from "@/components/tasks/TaskList";
import EditProjectButton from "@/components/projects/EdithButton";
import DeleteProjectButton from "@/components/projects/DeleteButton";

interface Props {
  params: Promise<{ id: string }>;
  redirectAfter?: boolean;
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
    <div className="fade-in">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "1.5rem",
          fontSize: "0.82rem",
          color: "var(--text-3)",
        }}
      >
        <Link
          href="/projects"
          style={{ color: "var(--text-3)", textDecoration: "none" }}
        >
          Proyectos
        </Link>
        <span>/</span>
        <span style={{ color: "var(--text-2)" }}>{project.name}</span>
      </div>

      <div
        className="card"
        style={{
          padding: "1.25rem 1.5rem",
          marginBottom: "1.75rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: project.color,
              flexShrink: 0,
            }}
          />
          <div>
            <h1
              style={{
                fontSize: "1.3rem",
                fontWeight: 700,
                color: "var(--text)",
                letterSpacing: "-0.02em",
              }}
            >
              {project.name}
            </h1>
            {project.description && (
              <p
                style={{
                  color: "var(--text-3)",
                  fontSize: "0.85rem",
                  marginTop: "0.2rem",
                }}
              >
                {project.description}
              </p>
            )}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <span className="badge badge-pending">● {pending}</span>
            <span className="badge badge-progress">● {inProgress}</span>
            <span className="badge badge-done">● {completed}</span>
          </div>
          <EditProjectButton
            project={{
              projectId: project.id,
              name: project.name,
              description: project.description,
              color: project.color,
            }}
          />
          <DeleteProjectButton id={project.id} redirectAfter />
        </div>
      </div>

      <TaskList tasks={tasks} projectId={project.id} />
    </div>
  );
}
