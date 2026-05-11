import { supabase } from "../../../backend/supabaseClient";

export const LoginServices = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    throw new Error(error.message);
  }

  return {
    token: data.session.access_token,
    user: data.user
  }
};

export const LogoutService = async () => {
  const { error } = await supabase.auth.signOut();

  if (error){
    throw new Error(error.message);
  }
}; 