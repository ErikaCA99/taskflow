'use server';
 
import { prisma } from "@/lib/supabase/prisma";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { CreateProjectInput, UpdateProjectInput } from "@/types";
 
async function getAuthUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("No autenticado");
  return user;
}
 
export async function getProjectsAction() {
  const user = await getAuthUser();
 
  return await prisma.project.findMany({
    where: { userId: user.id },
    include: {
      _count: { select: { tasks: true } },
      tasks: {
        select: { status: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}
 
export async function getProjectByIdAction(id: string) {
  const user = await getAuthUser();
 
  const project = await prisma.project.findFirst({
    where: { id, userId: user.id },
    include: { tasks: { orderBy: { createdAt: "desc" } } },
  });
 
  return project;
}
 
export async function createProjectAction(input: CreateProjectInput) {
  const user = await getAuthUser();
 
  const project = await prisma.project.create({
    data: {
      name: input.name,
      description: input.description ?? null,
      color: input.color,
      userId: user.id,
      createdBy: user.email ?? user.id,
      updatedBy: user.email ?? user.id,
    },
  });
 
  revalidatePath("/projects");
  return project;
}
 
export async function updateProjectAction(input: UpdateProjectInput) {
  const user = await getAuthUser();
 
  const existing = await prisma.project.findFirst({
    where: { id: input.id, userId: user.id },
  });
  if (!existing) throw new Error("Proyecto no encontrado");
 
  const project = await prisma.project.update({
    where: { id: input.id },
    data: {
      name: input.name,
      description: input.description ?? null,
      color: input.color,
      updatedBy: user.email ?? user.id,
    },
  });
 
  revalidatePath("/projects");
  revalidatePath(`/projects/${input.id}`);
  return project;
}
 
export async function deleteProjectAction(id: string) {
  const user = await getAuthUser();
 
  const existing = await prisma.project.findFirst({
    where: { id, userId: user.id },
  });
  if (!existing) throw new Error("Proyecto no encontrado");
 
  await prisma.project.delete({ where: { id } });
 
  revalidatePath("/projects");
}