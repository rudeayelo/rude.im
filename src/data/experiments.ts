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

export const experiments: Experiment[] = [];
