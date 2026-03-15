"use client";

import { useState } from "react";
import ProjectForm from "./ProjectForm";

export default function CreateButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
      >
        + Nuevo proyecto
      </button>
      {open && <ProjectForm onClose={() => setOpen(false)} />}
    </>
  );
}
