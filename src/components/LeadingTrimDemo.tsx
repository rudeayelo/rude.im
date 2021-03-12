import { useState } from "react";
import { Flex } from "src/components/Flex";
import { A } from "src/components/A";
import { css, styled } from "src/styles";

const Switch = styled("button", {
  display: "block",
  appearance: "none",
  border: "none",
  padding: 0,
  width: 24,
  height: 14,
  backgroundColor: "$gray200",
  borderRadius: 25,
  position: "relative",
  "&:focus": {
    outline: "none",
    boxShadow: "0 0 0 2px $colors$blue500",
  },
  "&[data-checked]": {
    backgroundColor: "$blue500",
  },
});

const Thumb = styled("span", {
  display: "block",
  width: 12,
  height: 12,
  backgroundColor: "white",
  borderRadius: "99em",
  boxShadow: "rgba(0, 0, 0, 0.3) 0px 0px 2px",
  transition: "transform 100ms",
  transform: "translateX(1px)",
  willChange: "transform",
  "[data-checked] > &": {
    transform: "translateX(11px)",
  },
});

const tab = css({
  padding: "$3 $6",
  background: "$codeBg",
  border: "1px solid $codeBorder",
  borderBottom: "none",
  borderRadius: "4px 4px 0 0",
});

const container = css({
  paddingLeft: "$6",
  paddingRight: "$6",
  marginBottom: "$8",
  background: "$codeBg",
  border: "1px solid $codeBorder",
  borderRadius: "0 4px 4px 4px",
});

const separator = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "hsl(30deg 100% 50% / 60%)",
  fontSize: "$3",
  color: "$gray900",
});

const h1 = css({
  margin: 0,
  fontSize: "$7",
  lineHeight: "$7",
  variants: {
    leadingTrim: {
      true: {
        textSize: "$7",
      },
    },
  },
});

const p = css({
  margin: 0,
  fontSize: "$5",
  lineHeight: "$5",
  variants: {
    leadingTrim: {
      true: {
        textSize: "$5",
      },
    },
  },
});

const span = css({
  textSize: "$4",
  fontWeight: "$bold",
});

const a = css({
  color: "$blue500",
  fontSize: "$5",
  lineHeight: "$5",
  fontWeight: "$bold",
  variants: {
    leadingTrim: {
      true: {
        textSize: "$5",
      },
    },
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

export const LeadingTrimDemo = () => {
  const [leadingTrimActive, setLeadingTrimActive] = useState(false);

  return (
    <Flex
      css={{
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <div className={tab()}>
        <Flex
          css={{
            alignItems: "baseline",
            cursor: "pointer",
          }}
          onClick={() => setLeadingTrimActive(!leadingTrimActive)}
        >
          <Switch
            {...(leadingTrimActive && { "data-checked": true })}
            css={{ marginRight: "$2" }}
          >
            <Thumb />
          </Switch>
          <span
            onClick={() => setLeadingTrimActive(!leadingTrimActive)}
            className={span()}
          >
            Trim vertical white space
          </span>
        </Flex>
      </div>
      <div className={container()}>
        <div className={separator()}>24px margin</div>
        <Flex
          css={{
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <h1 className={h1({ leadingTrim: leadingTrimActive })}>
            leading-trim demo
          </h1>
        </Flex>
        <div className={separator({ css: { height: "24px" } })}>
          36px margin
        </div>
        <p className={p({ leadingTrim: leadingTrimActive })}>
          By default text elements include vertical space based on its
          line-height value. The effect of that extra space may be overlooked or
          worked around, but when working with precise scales and layout
          components, there's probably no room for random spacing going around
          your text.
        </p>
        <div className={separator({ css: { height: "36px" } })}>
          24px margin
        </div>
        <p className={p({ leadingTrim: leadingTrimActive })}>
          <Code>leading-trim</Code> is a JavaScript port of <b>EightShapes</b>'s{" "}
          <A href="http://text-crop.eightshapes.com/">Text Crop mixin</A> (
          <A href="https://github.com/EightShapes/esds-text-crop">source</A>).
          It returns a CSS styles object ready to be used with any CSS-in-JS
          library that let's you inject styles with nested pseudo-elements.
        </p>
        <div className={separator({ css: { height: "36px" } })}>
          24px margin
        </div>
        <a
          className={a({ leadingTrim: leadingTrimActive })}
          href="https://github.com/rudeayelo/leading-trim"
        >
          Check leading-trim on Github
        </a>
        <div className={separator()}>24px margin</div>
      </div>
    </Flex>
  );
};
