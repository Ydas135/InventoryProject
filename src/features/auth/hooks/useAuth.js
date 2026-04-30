import { LoginServices, LogoutService } from "../services/AuthService";
import { useAuthStore } from "../store/AuthStore";

export const useAuth = () => {
  const { token, setToken, logout } = useAuthStore();

  const login = async ({ email, password }) => {
    const accessToken = await LoginServices({ email, password });
    setToken(accessToken);
  };

  const handleLogout = async () => {
    await LogoutService();
    logout();
  };

  return {
    token,
    login,
    logout: handleLogout,
    isAuthenticated: !!token,
  };
};