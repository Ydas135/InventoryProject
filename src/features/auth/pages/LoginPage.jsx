import { Navigate } from "react-router";
import { Sun, Moon } from "lucide-react";
import { LoginAside } from "../components/LoginAside";
import { LoginForm } from "../components/LoginForm";
import { useAuth } from "../../../app/context/AuthContext";
import { useTheme } from "../../../app/context/ThemeContext";

function ThemeToggleMini() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      onClick={toggle}
      aria-label="Cambiar tema"
      className="press surface grid h-10 w-10 place-items-center rounded-full text-ink-600 transition-colors hover-tint"
    >
      <div className="relative h-[18px] w-[18px]">
        <Sun
          className={[
            "absolute inset-0 h-[18px] w-[18px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            isDark ? "scale-50 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100",
          ].join(" ")}
          strokeWidth={2.2}
        />
        <Moon
          className={[
            "absolute inset-0 h-[18px] w-[18px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            isDark ? "scale-100 rotate-0 opacity-100" : "scale-50 rotate-90 opacity-0",
          ].join(" ")}
          strokeWidth={2.2}
        />
      </div>
    </button>
  );
}

export function LoginPage() {
  const { isAuthed } = useAuth();

  // Si ya hay sesión, no mostramos el login.
  if (isAuthed) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-6xl grid-cols-1 gap-6 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-2">
        {/* Panel de marca */}
        <div className="animate-scale-in">
          <LoginAside />
        </div>

        {/* Panel del formulario */}
        <div className="relative flex items-center justify-center px-2 py-8 sm:px-8">
          <div className="absolute right-2 top-2 sm:right-4 sm:top-4">
            <ThemeToggleMini />
          </div>
          <div className="w-full max-w-sm">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
