import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  theme: {
    semanticTokens: {
      colors: {
        primary: {
          value: {
            _light: "hsl(217, 50%, 90%)",
            _dark: "hsl(217, 50%, 10%)",
          },
        },
        pre_primary: {
          value: {
            _light: "hsl(217, 50%, 95%)",
            _dark: "hsl(217, 50%, 15%)",
          },
        },
        secondary: {
          value: {
            _light: "hsl(217, 50%, 10%)",
            _dark: "hsl(217, 50%, 90%)",
          },
        },
        accent: {
          value: {
            _light: "hsl(277, 80%, 20%)",
            _dark: "hsl(277, 80%, 80%)",
          },
        },
        tertiary: {
          value: {
            _light: "hsl(157, 80%, 20%)",
            _dark: "hsl(157, 80%, 80%)",
          },
        },
      },
    },
    tokens: {
      fonts: {
        heading: {
          value: `'Poppins', sans-serif`,
        },
        body: {
          value: `'Poppins', sans-serifs`,
        },
      },
    },
  },
});
