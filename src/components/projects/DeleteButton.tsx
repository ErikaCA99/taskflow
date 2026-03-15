"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteProjectAction } from "@/actions/projects";

interface Props {
  id: string;
  redirectAfter?: boolean;
}

export default function DeleteButton({ id, redirectAfter }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteProjectAction(id);
      if (redirectAfter) router.push("/projects");
      else router.refresh();
    } catch {
      setLoading(false);
    }
  };

  if (confirm) {
    return (
      <div className="flex gap-1">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-red-400 hover:text-red-300 text-xs px-2 py-1 rounded bg-red-950 border border-red-800 transition disabled:opacity-50"
        >
          {loading ? "..." : "Sí"}
        </button>
        <button
          onClick={() => setConfirm(false)}
          className="text-slate-400 hover:text-slate-300 text-xs px-2 py-1 rounded bg-slate-800 transition"
        >
          Cancelar
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        setConfirm(true);
      }}
      className="text-slate-600 hover:text-red-400 transition opacity-0 group-hover:opacity-100 text-sm"
      title="Eliminar proyecto"
    >
      ✕
    </button>
  );
}
