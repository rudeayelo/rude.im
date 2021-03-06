import { styled } from "src/styles";
import { Box } from "./Box";

export const Flex = styled(Box, {
  display: "flex",

  variants: {
    inline: {
      true: {
        display: "inline-flex",
      },
    },
  },
});
