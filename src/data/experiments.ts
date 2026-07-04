export type ExperimentStatus = "active" | "archived";
export type ExperimentSize = "square" | "wide" | "large";

export type Experiment = {
  title: string;
  description: string;
  href: string;
  status: ExperimentStatus;
  tags: string[];
  size: ExperimentSize;
  media: {
    src: string;
    alt: string;
    type: "image" | "video";
  };
  source?: string;
};

export const experiments: Experiment[] = [
  {
    title: "Squircle Field",
    description: "A compact CSS study of squircle cards, layered borders and theme-aware contrast.",
    href: "/experiments/squircle-field/index.html",
    status: "active",
    tags: ["css", "squircles", "theme"],
    size: "wide",
    media: {
      src: "/media/squircle-field.svg",
      alt: "Monochrome squircle shapes arranged on a dark grid.",
      type: "image",
    },
  },
];
