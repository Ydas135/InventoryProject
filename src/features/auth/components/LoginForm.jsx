import { useState } from "react";
import { useNavigate } from "react-router";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { useAuth } from "../../../app/context/AuthContext";

export function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Ingresa tu correo y contraseña.");
      return;
    }
    setLoading(true);
    try {
      await login({ email: email.trim(), remember });
      navigate("/", { replace: true });
    } catch {
      setError("No pudimos iniciar sesión. Inténtalo de nuevo.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-stagger flex flex-col gap-5">
      {/* Heading */}
      <div>
        <h1 className="font-display text-[2.1rem] leading-tight tracking-tight">
          Bienvenido de nuevo
        </h1>
        <p className="mt-1 text-[14px] text-ink-400">
          Inicia sesión para entrar a tu panel.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="animate-scale-in flex items-center gap-2 rounded-xl border border-danger-500/30 bg-danger-500/10 px-3.5 py-2.5 text-[13px] text-danger-500">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Email */}
      <div className="field relative pt-2">
        <Mail className="pointer-events-none absolute left-0 top-[18px] h-[18px] w-[18px] text-ink-400" strokeWidth={2} />
        <input
          type="email"
          autoComplete="email"
          placeholder=" "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="peer h-11 w-full border-0 border-b border-strong bg-transparent pl-8 text-[15px] text-ink-900 outline-none placeholder-transparent"
        />
        <label className="field-label pointer-events-none absolute left-8 top-[18px] text-[15px] text-ink-400">
          Correo electrónico
        </label>
        <span className="field-underline absolute bottom-0 left-0 h-[2px] w-full bg-accent-500" />
      </div>

      {/* Password */}
      <div className="field relative pt-2">
        <Lock className="pointer-events-none absolute left-0 top-[18px] h-[18px] w-[18px] text-ink-400" strokeWidth={2} />
        <input
          type={showPass ? "text" : "password"}
          autoComplete="current-password"
          placeholder=" "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="peer h-11 w-full border-0 border-b border-strong bg-transparent pl-8 pr-9 text-[15px] text-ink-900 outline-none placeholder-transparent"
        />
        <label className="field-label pointer-events-none absolute left-8 top-[18px] text-[15px] text-ink-400">
          Contraseña
        </label>
        <span className="field-underline absolute bottom-0 left-0 h-[2px] w-full bg-accent-500" />
        <button
          type="button"
          onClick={() => setShowPass((s) => !s)}
          aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
          className="press absolute right-0 top-[15px] rounded-lg p-1 text-ink-400 transition-colors hover:text-ink-900"
        >
          {showPass ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
        </button>
      </div>

      {/* Remember / forgot */}
      <div className="flex items-center justify-between text-[13px]">
        <label className="flex cursor-pointer select-none items-center gap-2 text-ink-600">
          <button
            type="button"
            role="checkbox"
            aria-checked={remember}
            onClick={() => setRemember((r) => !r)}
            className={[
              "press grid h-[18px] w-[18px] place-items-center rounded-md border transition-all duration-300",
              remember ? "border-accent-500 bg-accent-500 text-white" : "border-strong text-transparent",
            ].join(" ")}
          >
            <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6.2l2.2 2.2 4.8-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          Recordarme
        </label>
        <a href="#" className="font-medium text-accent-500 transition-colors hover:text-accent-600">
          ¿Olvidaste tu clave?
        </a>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="sheen-on-hover press relative mt-1 flex h-12 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-700 text-[15px] font-semibold text-white shadow-lg shadow-zinc-900/20 transition-all duration-300 hover:shadow-xl disabled:opacity-70 dark:from-white dark:to-zinc-300 dark:text-zinc-900"
      >
        {loading ? (
          <>
            <Loader2 className="h-[18px] w-[18px] animate-spin" />
            Ingresando…
          </>
        ) : (
          <>
            Iniciar sesión
            <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-0.5" />
          </>
        )}
      </button>

      {/* Footer */}
      <p className="text-center text-[13px] text-ink-400">
        ¿No tienes cuenta?{" "}
        <a href="#" className="font-medium text-ink-900 underline-offset-4 hover:underline">
          Solicita acceso
        </a>
      </p>
    </form>
  );
}
