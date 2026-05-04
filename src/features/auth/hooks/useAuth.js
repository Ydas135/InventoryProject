import { useNavigate } from "react-router";
import { LoginServices, LogoutService } from "../services/AuthService";
import { useAuthStore } from "../store/AuthStore";

export const useAuth = () => {
  const { token, setAuth, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const login = async ({ email, password }) => {
    const data = await LoginServices({ email, password })

    setAuth({
      token: data.token,
      user: data.user
    })

    navigate("/", { replace: true });
  };

  const handleLogout = async () => {
    await LogoutService();
    logout();
    navigate("/login", { replace: true})
  };

  return {
    token,
    user,
    login,
    logout: handleLogout,
    isAuthenticated: !!token,
  };
};