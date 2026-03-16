"use client";

import { useState } from "react";
import ProjectForm from "./ProjectForm";

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
        className="btn btn-ghost"
        style={{ fontSize: "0.8rem", padding: "0.4rem 0.75rem" }}
      >
        Editar
      </button>
      {open && (
        <ProjectForm project={formProject} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
