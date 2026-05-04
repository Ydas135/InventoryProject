import { supabase } from "../../../backend/supabaseClient";

export const LoginServices = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    console.error("SUPABASE LOGIN ERROR:", error);
    throw error;
  }

  return {
    token: data.session.access_token,
    user: data.user
  }
};

export const LogoutService = async () => {
  await supabase.auth.signOut();
};