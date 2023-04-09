import { styled } from "src/styles";
import NextLink from "next/link";

export const A = styled("a", {
  fontWeight: "$bold",
  "&:focus": {
    outline: "2px solid $colors$blue500",
  },

  variants: {
    variant: {
      default: {
        color: "$link",
      },
      muted: {
        color: "$mutedLink",
      },
      discrete: {
        color: "currentColor",
      },
    },
  },

  defaultVariants: {
    variant: "default",
  },
});

export const Link = (props) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  if (isInternalLink) {
    return (
      <NextLink legacyBehavior href={href}>
        <A {...props} />
      </NextLink>
    );
  }

  return (
    <A
      target="_blank"
      rel="noopener noreferrer"
      data-splitbee-event={`Click on ${href.substr(8)}`}
      {...props}
    />
  );
};
