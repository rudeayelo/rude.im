import { css, styled } from "src/styles";
import { Link } from "src/components/A";
import { Text } from "src/components/Text";
import { Divider } from "src/components/Divider";
import React from "react";

const Pre = styled("pre", {
  marginTop: 0,
  marginBottom: "$6",
  padding: "$4",
  overflow: "auto",
  background: "$codeBg",
  border: "1px solid $codeBorder",
  borderRadius: "4px",
});

const Ul = styled("ul", {
  marginBottom: "$6",
});

const Li = styled("li", {
  marginBottom: "$4",
  display: "flex",
  alignItems: "center",
});

const Bullet = styled("div", {
  background: "$border",
  opacity: 0.4,
  width: "1ch",
  height: "1ch",
  marginRight: "$3",
  borderRadius: ".4ch",
});

const List = (props) => (
  <Ul as={props.as}>
    {React.Children.map(
      props.children,
      (child: React.Component<any, any, any>, i) =>
        child && (
          <Li key={i}>
            <Bullet />
            {child}
          </Li>
        )
    )}
  </Ul>
);

export const MDXComponents = {
  a: Link,
  h1: (props) => (
    <Text
      {...props}
      as="h1"
      css={{ fontSize: "$8", fontWeight: "$black", marginBottom: "$6" }}
    />
  ),
  h2: (props) => (
    <Text
      {...props}
      as="h2"
      css={{ fontSize: "$7", fontWeight: "$black", marginBottom: "$6" }}
    />
  ),
  h3: (props) => (
    <Text
      {...props}
      as="h3"
      css={{ fontSize: "$6", fontWeight: "$black", marginBottom: "$6" }}
    />
  ),
  p: ({ className, ...props }) => (
    <div className={`${css({ marginBottom: "$6" })()} ${className}`}>
      <Text {...props} css={{ fontSize: "$5" }} />
    </div>
  ),
  pre: ({ className, ...props }) => <Pre {...props} />,
  ul: ({ className, ...props }) => <List {...props} />,
  ol: ({ className, ...props }) => <List {...props} />,
  li: ({ className, ...props }) => <Text {...props} css={{ fontSize: "$5" }} />,
  hr: (props) => (
    <Divider css={{ marginTop: "$10", marginBottom: "$10" }} {...props} />
  ),
};
