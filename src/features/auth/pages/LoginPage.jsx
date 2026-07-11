import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Sun, Moon, ShieldAlert } from "lucide-react";
import { LoginAside } from "../components/LoginAside";
import { LoginForm } from "../components/LoginForm";
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

function AccesoDenegadoAlert({ ruta }) {
  return (
    <div
      role="alert"
      className="animate-fade-up mb-5 flex items-start gap-3 overflow-hidden rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3.5"
    >
      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-amber-500/15 text-amber-600">
        <ShieldAlert className="h-[18px] w-[18px]" strokeWidth={2.1} />
      </span>
      <div className="min-w-0">
        <p className="text-[13.5px] font-semibold text-amber-700 dark:text-amber-400">
          Acceso denegado
        </p>
        <p className="mt-0.5 text-[12.5px] leading-snug text-ink-600">
          Necesitas iniciar sesión para acceder a{" "}
          <code className="rounded bg-amber-500/15 px-1 py-px font-mono text-[11.5px] text-amber-700 dark:text-amber-400">
            {ruta}
          </code>
          . Inicia sesión o regístrate para continuar.
        </p>
      </div>
    </div>
  );
}

export function LoginPage() {
  const location = useLocation();
  // Capturamos la ruta UNA sola vez al montar — la alerta persiste durante
  // esta visita pero al recargar `history.state` ya no la trae.
  const [rutaIntentada] = useState(() => location.state?.from?.pathname || null);

  useEffect(() => {
    // Limpia el state guardado por el navegador para que un F5 no muestre la alerta.
    if (location.state?.from) {
      window.history.replaceState({}, "");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
            {rutaIntentada && <AccesoDenegadoAlert ruta={rutaIntentada} />}
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
