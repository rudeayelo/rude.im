export const formatShortDate = (isoDate: string) => {
  const date = new Date(isoDate).toLocaleString("en-GB", {
    year: "numeric",
    month: "long",
  });

  return date;
};
