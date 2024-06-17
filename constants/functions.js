const createPlaceholderData = (count) => {
  return Array.from({ length: count }, (_, index) => ({
    id: `placeholder-${index}`,
    title: "  ",
    poster_path: null,
  }));
};

export { createPlaceholderData };
