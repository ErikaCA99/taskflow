'use server';
 
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/supabase/prisma';
import { redirect } from 'next/navigation';
 
export async function registerAction(
  full_name: string,
  email: string,
  password: string
) {
  const supabase = await createClient();
 
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name },
    },
  });
 
  if (error) throw new Error(error.message);
  if (!data.user) throw new Error('No se pudo crear el usuario');
 
  // El trigger de Supabase ya inserta el usuario en public.users
  // automáticamente — no es necesario crearlo manualmente con Prisma
 
  return data.user;
}
 
export async function loginAction(email: string, password: string) {
  const supabase = await createClient();
 
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
 
  if (error) throw new Error(error.message);
 
  return data.user;
}
 
export async function logoutAction(): Promise<void> {
  const supabase = await createClient();
 
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
 
  redirect('/auth/login');
}
 
export async function getCurrentUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
 
  if (error || !data.user) return null;
 
  const user = await prisma.user.findUnique({
    where: { id: data.user.id },
  });
 
  return user;
}