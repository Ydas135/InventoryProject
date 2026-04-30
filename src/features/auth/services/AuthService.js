import { supabase } from "../../../backend/supabaseClient";

export const LoginServices = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;

  return data.session.access_token;
};

export const LogoutService = async () => {
  await supabase.auth.signOut();
};