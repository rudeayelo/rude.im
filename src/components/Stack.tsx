import React from "react";
import { styled, theme } from "src/styles";
import { Divider } from "src/components/Divider";

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
  divider,
  children,
  className,
  ...props
}: {
  as?: keyof JSX.IntrinsicElements;
  gap?: Gap;
  align?: Align;
  divider?: boolean;
  children: React.ReactNode;
  className?: string;
}) => (
  <StackBase
    as={as}
    css={{ alignItems: align && alignMap[align] }}
    className={className}
    {...props}
  >
    {React.Children.map(
      children,
      (child: React.Component<any, any, any>, i) =>
        child && (
          <>
            {i > 0 && divider && (
              <Divider
                css={{
                  marginTop: i > 0 ? `$${gap}` : undefined,
                }}
              />
            )}
            <StackChild
              as={determineChild(as)}
              index={i}
              css={{
                marginTop: i > 0 ? `$${gap}` : undefined,
                ...(child.props?.alignSelf && {
                  alignSelf: child.props?.alignSelf,
                }),
              }}
            >
              {child}
            </StackChild>
          </>
        )
    )}
  </StackBase>
);

Stack.defaultProps = {
  as: "div",
  gap: 6,
};
