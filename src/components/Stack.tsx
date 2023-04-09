import React from "react";
import { styled, theme } from "src/styles";
import { Divider } from "src/components/Divider";
import { determineChild } from "src/lib/layout";

type Align = "start" | "center" | "end";
type Gap = Extract<keyof (typeof theme)["space"], string | number>;

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
      (child: React.ReactNode, i) =>
        child && (
          <>
            {i > 0 &&
              React.Children.toArray(children).length > 1 &&
              divider && (
                <Divider
                  css={{
                    marginTop: i > 0 ? `$${gap}` : undefined,
                  }}
                />
              )}
            <StackChild
              as={determineChild(as)}
              key={i}
              css={{
                marginTop:
                  i > 0 && React.Children.toArray(children).length > 1
                    ? `$${gap}`
                    : undefined,
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
