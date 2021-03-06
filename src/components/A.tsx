import { styled } from "src/styles";
import NextLink from "next/link";

export const A = styled("a", {
  fontWeight: "$bold",
  color: "$link",
  "&:focus": {
    outline: "2px solid $colors$blue500",
  },
  "p > &": {
    color: "currentColor",
  },

  variants: {
    variant: {
      muted: {
        color: "$mutedLink",
      },
    },
  },
});

export const Link = (props) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  if (isInternalLink) {
    return (
      <NextLink href={href}>
        <A {...props} />
      </NextLink>
    );
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};
