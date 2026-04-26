import next from "eslint-config-next";

const config = [
  {
    ignores: [".next/**", "node_modules/**", "out/**", "build/**", "next-env.d.ts"],
  },
  ...next,
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "error",
      "react-hooks/set-state-in-effect": "off",
    },
  },
];

export default config;
