"use client";

import { useState } from "react";
import ProjectForm from "./ProjectForm";
import { Pencil } from "lucide-react";
interface Props {
  project: {
    projectId: string;
    name: string;
    description: string | null;
    color: string;
  };
}

export default function EditProjectButton({ project }: Props) {
  const [open, setOpen] = useState(false);

  const formProject = {
    id: project.projectId,
    name: project.name,
    description: project.description,
    color: project.color,
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-500 cursor-pointer"
      >
        <Pencil className="w-4 h-4" />
        Editar
      </button>
      {open && (
        <ProjectForm project={formProject} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
