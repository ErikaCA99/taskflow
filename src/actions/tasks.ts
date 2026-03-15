"use server";

import { prisma } from "@/lib/supabase/prisma";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { TaskStatus, TaskPriority } from "@/types";

async function getAuthUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("No autenticado");
  return user;
}

export async function createTaskAction(input: {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  projectId: string;
}) {
  const user = await getAuthUser();

  const project = await prisma.project.findFirst({
    where: { id: input.projectId, userId: user.id },
  });
  if (!project) throw new Error("Proyecto no encontrado");

  const task = await prisma.task.create({
    data: {
      title:       input.title,
      description: input.description ?? null,
      status:      input.status,
      priority:    input.priority,
      projectId:   input.projectId,
      userId:      user.id,
      createdBy:   user.email ?? user.id,
      updatedBy:   user.email ?? user.id,
    },
  });

  revalidatePath(`/projects/${input.projectId}`);
  return task;
}

export async function updateTaskAction(input: {
  id: string;   
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  projectId: string;
}) {
  const user = await getAuthUser();

  const existing = await prisma.task.findFirst({
    where: { id: input.id, userId: user.id },
  });
  if (!existing) throw new Error("Tarea no encontrada");

  const task = await prisma.task.update({
    where: { id: input.id },
    data: {
      title:       input.title,
      description: input.description ?? null,
      status:      input.status,
      priority:    input.priority,
      updatedBy:   user.email ?? user.id,
    },
  });

  revalidatePath(`/projects/${input.projectId}`);
  return task;
}

export async function updateTaskStatusAction(
  id: string,         
  status: TaskStatus,
  projectId: string
) {
  const user = await getAuthUser();

  const existing = await prisma.task.findFirst({
    where: { id, userId: user.id },
  });
  if (!existing) throw new Error("Tarea no encontrada");

  await prisma.task.update({
    where: { id },
    data: { status, updatedBy: user.email ?? user.id },
  });

  revalidatePath(`/projects/${projectId}`);
}

export async function deleteTaskAction(id: string, projectId: string) {
  const user = await getAuthUser();

  const existing = await prisma.task.findFirst({
    where: { id, userId: user.id },
  });
  if (!existing) throw new Error("Tarea no encontrada");

  await prisma.task.delete({ where: { id } });
  revalidatePath(`/projects/${projectId}`);
}