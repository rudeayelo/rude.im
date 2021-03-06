import { styled } from "src/styles";

export const Band = styled("section", {
  padding: "$10",

  variants: {
    variant: {
      bright: {
        background: "$brightBg",
      },
      light: {
        background: "$lightBg",
      },
      dark: {
        background: "$darkBg",
      },
      noir: {
        background: "$noirBg",
      },
    },
  },
  defaultVariants: {
    variant: "light",
  },
});
