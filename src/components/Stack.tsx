import React, { ComponentType, ReactElement, ReactNode } from "react";
import { styled, theme } from "src/styles";

type Align = "start" | "center" | "end";
type Gap = Extract<keyof typeof theme["space"], string | number>;

const determineChild = (parent) =>
  typeof parent === "string"
    ? {
        ul: "li",
        ol: "li",
        span: "span",
        p: "span",
        h1: "span",
        h2: "span",
        h3: "span",
        h4: "span",
        h5: "span",
        h6: "span",
      }[parent] || "div"
    : parent;

const alignMap = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
};

const StackBase = styled("div", {
  display: "flex",
  flexDirection: "column",
});

const StackChild = styled("div", {});

export const Stack = ({
  as,
  gap,
  align,
  children,
  ...props
}: {
  as?: keyof JSX.IntrinsicElements;
  gap?: Gap;
  align?: Align;
  children: React.ReactNode;
}) => (
  <StackBase as={as} css={{ alignItems: align && alignMap[align] }} {...props}>
    {React.Children.map(
      children,
      (child, i) =>
        child && (
          <StackChild
            as={determineChild(as)}
            index={i}
            css={{
              marginTop: i > 0 ? `$${gap}` : undefined,
              // @ts-ignore
              ...(child?.props?.alignSelf && {
                // @ts-ignore
                alignSelf: child?.props?.alignSelf,
              }),
            }}
          >
            {child}
          </StackChild>
        )
    )}
  </StackBase>
);

Stack.defaultProps = {
  as: "div",
  gap: 5,
};
