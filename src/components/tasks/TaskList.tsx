"use client";

import { useState } from "react";
import { Task, TaskStatus, TaskPriority } from "@/types";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";

const STATUS_OPTIONS: { value: TaskStatus | "ALL"; label: string }[] = [
  { value: "ALL", label: "Todos" },
  { value: "PENDING", label: "Pendiente" },
  { value: "IN_PROGRESS", label: "En progreso" },
  { value: "COMPLETED", label: "Completado" },
];

const PRIORITY_OPTIONS: { value: TaskPriority | "ALL"; label: string }[] = [
  { value: "ALL", label: "Todas" },
  { value: "HIGH", label: "Alta" },
  { value: "MEDIUM", label: "Media" },
  { value: "LOW", label: "Baja" },
];

interface TaskListProps {
  tasks: Task[];
  projectId: string;
}

export default function TaskList({ tasks, projectId }: TaskListProps) {
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "ALL">("ALL");
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | "ALL">(
    "ALL",
  );
  const [showForm, setShowForm] = useState(false);

  const filtered = tasks.filter((t) => {
    const matchStatus = statusFilter === "ALL" || t.status === statusFilter;
    const matchPriority =
      priorityFilter === "ALL" || t.priority === priorityFilter;

    return matchStatus && matchPriority;
  });

  const statusOrder = {
    PENDING: 0,
    IN_PROGRESS: 1,
    COMPLETED: 2,
  };

  const sorted = [...filtered].sort(
    (a, b) => statusOrder[a.status] - statusOrder[b.status],
  );

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex flex-wrap gap-2">
          <div className="flex gap-1">
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setStatusFilter(opt.value)}
                className={`
                  px-3 py-1 rounded-full text-xs font-medium border transition
                  ${
                    statusFilter === opt.value
                      ? "border-accent text-accent bg-accent/15"
                      : "border-border text-muted-foreground hover:border-accent"
                  }
                `}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            {PRIORITY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setPriorityFilter(opt.value)}
                className={`
                  px-3 py-1 rounded-full text-xs font-medium border transition
                  ${
                    priorityFilter === opt.value
                      ? "border-yellow-500 text-yellow-500 bg-yellow-500/15"
                      : "border-border text-muted-foreground hover:border-yellow-500"
                  }
                `}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-2 py-2 rounded-lg hover:bg-blue-500 cursor-pointer "
        >
          + Nueva tarea
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="card py-12 text-center">
          <p className="text-sm text-muted-foreground">
            {tasks.length === 0
              ? "No hay tareas en este proyecto"
              : "Sin tareas que coincidan con los filtros"}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {sorted.map((task) => (
            <TaskCard key={task.taskId} task={task} projectId={projectId} />
          ))}
        </div>
      )}

      {showForm && (
        <TaskForm projectId={projectId} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}
