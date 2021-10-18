import { css, styled } from "src/styles";

export const band = css({
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

export const Band = styled("section", band);
