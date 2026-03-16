"use client";

import { useState } from "react";
import { Task, TaskStatus } from "@/types";
import { updateTaskStatusAction, deleteTaskAction } from "@/actions/tasks";
import { useRouter } from "next/navigation";
import TaskForm from "./TaskForm";

const STATUS_LABELS: Record<TaskStatus, string> = {
  PENDING: "Pendiente",
  IN_PROGRESS: "En progreso",
  COMPLETED: "Completado",
};

const STATUS_NEXT: Record<TaskStatus, TaskStatus> = {
  PENDING: "IN_PROGRESS",
  IN_PROGRESS: "COMPLETED",
  COMPLETED: "PENDING",
};

const PRIORITY_LABELS = { LOW: "Baja", MEDIUM: "Media", HIGH: "Alta" };

const PRIORITY_COLORS = {
  LOW: "text-slate-500",
  MEDIUM: "text-yellow-400",
  HIGH: "text-red-400",
};

const STATUS_BORDER = {
  PENDING: "border-slate-600",
  IN_PROGRESS: "border-blue-500",
  COMPLETED: "border-green-500",
};

const STATUS_BG = {
  PENDING: "bg-transparent",
  IN_PROGRESS: "bg-transparent",
  COMPLETED: "bg-green-500",
};

const STATUS_BADGE = {
  PENDING: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  IN_PROGRESS: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  COMPLETED: "bg-green-500/10 text-green-400 border border-green-500/20",
};

function TaskCard({ task, projectId }: { task: Task; projectId: string }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleStatusChange = async () => {
    setLoading(true);
    try {
      await updateTaskStatusAction(
        task.taskId,
        STATUS_NEXT[task.status],
        projectId,
      );
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteTaskAction(task.taskId, projectId);
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className={`task-card group flex items-center gap-4 px-4 py-3 bg-slate-700/70 border border-slate-300 rounded-lg hover:border-slate-700 hover: -translate-y-px
         transition-all ${loading ? "opacity-50" : "opacity-100"}`}
      >
        <button
          onClick={handleStatusChange}
          disabled={loading}
          title={`Cambiar a ${STATUS_LABELS[STATUS_NEXT[task.status]]}`}
          className={`task-card__status-button w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all cursor-pointer
          ${STATUS_BORDER[task.status]} ${STATUS_BG[task.status]}`}
        >
          {task.status === "COMPLETED" && (
            <svg
              className="task-card__check-icon"
              width="10"
              height="10"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M2 6l3 3 5-5"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>

        <div className="task-card__content flex-1 min-w-0">
          <p
            className={`task-card__title text-sm font-medium truncate transition-all
            ${
              task.status === "COMPLETED"
                ? "line-through text-slate-500"
                : "text-slate-100"
            }`}
          >
            {task.title}
          </p>

          {task.description && (
            <p className="task-card__description text-xs text-slate-500 mt-0.5 truncate">
              {task.description}
            </p>
          )}
        </div>

        <div className="task-card__badges flex items-center gap-2 shrink-0">
          <span
            className={`task-card__priority text-xs font-semibold ${PRIORITY_COLORS[task.priority]}`}
          >
            {PRIORITY_LABELS[task.priority]}
          </span>

          <span
            className={`task-card__status text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_BADGE[task.status]}`}
          >
            {STATUS_LABELS[task.status]}
          </span>
        </div>

        <div className="task-card__actions flex gap-1 shrink-0">
          <button
            onClick={() => setEditing(true)}
            className="task-card__edit text-xs px-2 py-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
          >
            Editar
          </button>

          {confirmDelete ? (
            <div className="task-card__delete-confirm flex gap-1">
              <button
                onClick={handleDelete}
                disabled={loading}
                className="task-card__delete-yes text-xs px-2 py-1 rounded-md text-red-400 hover:text-red-300 bg-red-500/10 border border-red-500/20 transition disabled:opacity-50"
              >
                Eliminar
              </button>

              <button
                onClick={() => setConfirmDelete(false)}
                className="task-card__delete-no text-xs px-2 py-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmDelete(true)}
              className="task-card__delete text-xs px-2 py-1 rounded-md text-red-400 hover:text-red-300 hover:bg-red-500/10 transition"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {editing && (
        <TaskForm
          projectId={projectId}
          task={task}
          onClose={() => setEditing(false)}
        />
      )}
    </>
  );
}

export default TaskCard;
