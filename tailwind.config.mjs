/** @type {import('tailwindcss').Config} */
export default {
  // darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "d/bg": "#741D12",
        "d/primary": "#feeeb8",
        "d/secondary": "#2a0d3e",
        "d/tertiary": "#df5e37",
        "l/bg": "#eeeeee",
        "l/primary": "#111111",
        "l/secondary": "#555555",
        "l/tertiary": "#741D12"//"#999999",
      },
    },
  },
  plugins: [],
};

// "d/bg": "#111111",
//         "d/primary": "#eeeeee",
//         "d/secondary": "#999999",
//         "d/tertiary": "#555555",
//         "l/bg": "#eeeeee",
//         "l/primary": "#111111",
//         "l/secondary": "#555555",
//         "l/tertiary": "#999999",

//wip
// "d/bg": "#121420",
// 				"d/primary": "#1b2432",
// 				"d/secondary": "#e3d26f",
// 				"d/tertiary": "#741D12",
