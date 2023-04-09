import React from "react";
import { styled, theme } from "src/styles";
import { determineChild } from "src/lib/layout";
import { Flex } from "src/components/Flex";
import { Box } from "src/components/Box";

type Align = "start" | "center" | "end";
type Gap = Extract<keyof (typeof theme)["space"], string | number>;

const alignMap = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
};

const hasGap = (gap: number | string) => Number(gap) > 0;

const Wrapper = styled(Box, {
  paddingTop: "1px" /* to avoid margin collapsing */,
  "&::before": {
    content: '""',
    display: "block",
  },
});

export const Inline = ({
  as,
  gap,
  vAlign,
  children,
  className,
  ...props
}: {
  as?: keyof JSX.IntrinsicElements;
  gap?: Gap;
  vAlign?: Align;
  children: React.ReactNode;
  className?: string;
}) => (
  <Wrapper
    css={{
      "&::before": {
        $$gap: `-$space$${gap}`,
        marginTop: hasGap(gap) ? `calc($$gap - 1px)` : "-1px",
      },
    }}
    {...props}
  >
    <Flex
      as={as}
      css={{
        flexWrap: "wrap",
        marginLeft: hasGap(gap) ? `-$space$${gap}` : undefined,
        ...(vAlign && { alignItems: alignMap[vAlign] }),
      }}
    >
      {React.Children.map(
        children,
        (child: React.ReactNode, i) =>
          child && (
            <Box
              as={determineChild(as)}
              key={i}
              css={{
                marginTop: `$${gap}`,
                marginLeft: `$${gap}`,
              }}
            >
              {child}
            </Box>
          )
      )}
    </Flex>
  </Wrapper>
);

Inline.defaultProps = {
  as: "div",
  gap: 2,
};
