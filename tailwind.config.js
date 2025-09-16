/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#ff7a00", 600: "#ff8f26" },
        accent: "#2ea44f"
      },
      keyframes: {
        flash: { "0%": { backgroundColor: "#fff3cd" }, "100%": { backgroundColor: "transparent" } },
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { transform: "translateY(24px)", opacity: 0 }, to: { transform: "translateY(0)", opacity: 1 } },
        scaleIn: { from: { transform: "scale(0.98)", opacity: 0 }, to: { transform: "scale(1)", opacity: 1 } },
        pop: { "0%": { transform: "scale(0.85)" }, "80%": { transform: "scale(1.05)" }, "100%": { transform: "scale(1)" } },
        drawCheck: { from: { strokeDashoffset: 48 }, to: { strokeDashoffset: 0 } },

        // New for success overlay
        ringPulse: { "0%": { transform: "scale(0.9)", opacity: .5 }, "100%": { transform: "scale(1.25)", opacity: 0 } },
        float: { "0%": { transform: "translateY(2px)" }, "100%": { transform: "translateY(-2px)" } },
        confetti1: {
          "0%": { transform: "translate(-8px,8px) rotate(0deg)", opacity: 0 },
          "15%": { opacity: 1 },
          "100%": { transform: "translate(22px,-28px) rotate(35deg)", opacity: 0 }
        },
        confetti2: {
          "0%": { transform: "translate(6px,10px) rotate(0deg)", opacity: 0 },
          "15%": { opacity: 1 },
          "100%": { transform: "translate(-24px,-24px) rotate(-25deg)", opacity: 0 }
        },
        confetti3: {
          "0%": { transform: "translate(0,10px) rotate(0deg)", opacity: 0 },
          "15%": { opacity: 1 },
          "100%": { transform: "translate(0,-30px) rotate(15deg)", opacity: 0 }
        }
      },
      animation: {
        flash: "flash .8s ease-out",
        "fade-in": "fadeIn .18s ease-out",
        "slide-up": "slideUp .22s cubic-bezier(.22,1,.36,1)",
        "scale-in": "scaleIn .2s ease-out",
        pop: "pop .32s ease-out",
        check: "drawCheck .6s ease forwards",

        // New mappings
        ring: "ringPulse 1.2s ease-out infinite",
        float: "float 1.6s ease-in-out infinite alternate",
        "confetti-1": "confetti1 1.2s ease-out .05s",
        "confetti-2": "confetti2 1.3s ease-out .1s",
        "confetti-3": "confetti3 1.1s ease-out .08s"
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
};