import React from "react";
import { css, styled } from "src/styles";
import { Link } from "src/components/A";
import { Text } from "src/components/Text";
import { Divider } from "src/components/Divider";
import { LeadingTrimDemo } from "src/components/blog/LeadingTrimDemo";
import { ThemeToggleDemo } from "src/components/blog/ThemeToggleDemo";

const Pre = styled("pre", {
  border: "1px solid $codeBorder",
  borderRadius: "4px",
  fontSize: "$3",
  // Hack to gain a bit more of specificity
  "&[class]": {
    fontFamily: "$mono",
    marginBottom: "$8",
    marginTop: 0,
    padding: "$4",
    overflow: "auto",
    background: "$codeBg",
  },
  "& code[class]": {
    fontFamily: "$mono",
    lineHeight: 1.7,
  },
});

const Code = styled("code", {
  fontSize: "$3",
  padding: "2px $1",
  overflow: "auto",
  background: "$codeBg",
  border: "1px solid $codeBorder",
  borderRadius: "4px",
});

const Ul = styled("ul", {
  marginBottom: "$8",
});

const Li = styled("li", {
  marginBottom: "$4",
  display: "flex",
  alignItems: "baseline",
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
      (child: React.ReactNode, i) =>
        child && (
          <Li key={i}>
            {props.as === "ol" ? (
              <Text
                as="span"
                css={{
                  textSize: "$5",
                  fontWeight: "$black",
                  color: "$tertiary",
                  marginRight: "$2",
                  flexShrink: 0,
                }}
              >
                {i + 1}.
              </Text>
            ) : (
              <Bullet css={{ flexShrink: 0 }} />
            )}
            {child}
          </Li>
        )
    )}
  </Ul>
);

const Blockquote = styled("blockquote", {
  borderLeft: "2px solid $border",
  marginTop: 0,
  marginLeft: 0,
  marginRight: 0,
  marginBottom: "$8",
  padding: "$2 $4",
  color: "$tertiary",
  "& > *:last-child": {
    marginBottom: 0,
  },
});

export const MDXComponents = {
  a: Link,
  h1: (props) => (
    <Text
      {...props}
      as="h1"
      css={{
        textSize: "$8",
        fontWeight: "$black",
        marginBottom: "$8",
        letterSpacing: "$title",
      }}
    />
  ),
  h2: (props) => (
    <Text
      {...props}
      as="h2"
      css={{
        textSize: "$7",
        fontWeight: "$black",
        marginBottom: "$8",
        letterSpacing: "$title",
      }}
    />
  ),
  h3: (props) => (
    <Text
      {...props}
      as="h3"
      css={{
        textSize: "$6",
        fontWeight: "$black",
        marginBottom: "$8",
        letterSpacing: "$title",
      }}
    />
  ),
  p: (props) => (
    <div className={css({ marginBottom: "$8" })()}>
      <Text {...props} css={{ textSize: "$5" }} />
    </div>
  ),
  pre: (props) => <Pre {...props} />,
  ul: (props) => <List {...props} />,
  ol: (props) => <List {...props} as="ol" />,
  li: (props) => <Text {...props} as="span" css={{ textSize: "$5" }} />,
  hr: (props) => (
    <Divider css={{ marginTop: "$10", marginBottom: "$10" }} {...props} />
  ),
  inlineCode: (props) => <Code {...props} />,
  blockquote: Blockquote,
  LeadingTrimDemo,
  ThemeToggleDemo,
};
