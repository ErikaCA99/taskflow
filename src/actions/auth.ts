'use server';

import { createClient } from '../lib/supabase/server';

export async function loginAction(email: string, password: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data.user;
}

export async function registerAction(
    name: string, 
    email: string, 
    password: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options:{
        data: {name},
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data.user;
}


export async function logoutAction() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }

  return true;
}

export async function getCurrentUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.log('Error obteniendo el usuario:', error.message);
    return null;
  }

  return data.user;
}