import { getProjectsAction } from "@/actions/projects";
import ProjectCard from "@/components/projects/ProjectCard";
import CreateProjectButton from "@/components/projects/CreateButton";

export default async function ProjectsPage() {
  const projects = await getProjectsAction();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Mis Proyectos</h1>
          <p className="text-slate-500 text-sm mt-1">
            {projects.length} proyecto{projects.length !== 1 ? "s" : ""}
          </p>
        </div>
        <CreateProjectButton />
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-500 text-lg mb-2">No tienes proyectos aún</p>
          <p className="text-slate-600 text-sm">
            Crea tu primer proyecto para empezar
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
