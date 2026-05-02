import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export function ThemeSwitch() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="rounded-2xl p-3 flex items-center gap-3 surface">
      <div
        className={[
          "w-9 h-9 rounded-xl grid place-items-center transition-all duration-500",
          isDark
            ? "bg-gradient-to-br from-indigo-500 to-blue-600 text-white"
            : "bg-gradient-to-br from-amber-300 to-orange-400 text-white",
        ].join(" ")}
      >
        <div className="relative w-[18px] h-[18px]">
          <Sun
            className={[
              "absolute inset-0 w-[18px] h-[18px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              isDark ? "opacity-0 -rotate-90 scale-50" : "opacity-100 rotate-0 scale-100",
            ].join(" ")}
            strokeWidth={2.2}
          />
          <Moon
            className={[
              "absolute inset-0 w-[18px] h-[18px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50",
            ].join(" ")}
            strokeWidth={2.2}
          />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium leading-tight">
          {isDark ? "Modo oscuro" : "Modo claro"}
        </p>
        <p className="text-[11px] text-ink-400 leading-tight">
          {isDark ? "Activado" : "Desactivado"}
        </p>
      </div>

      <button
        role="switch"
        aria-checked={isDark}
        aria-label="Cambiar entre modo claro y oscuro"
        onClick={toggle}
        className={[
          "press relative inline-flex h-[26px] w-[44px] shrink-0 items-center rounded-full",
          "transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/40",
          isDark ? "bg-accent-500" : "tint-strong",
        ].join(" ")}
      >
        <span
          className={[
            "inline-block h-[22px] w-[22px] rounded-full bg-white shadow-sm",
            "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            "translate-x-[2px]",
            isDark ? "translate-x-[20px]" : "translate-x-[2px]",
          ].join(" ")}
        />
      </button>
    </div>
  );
}
