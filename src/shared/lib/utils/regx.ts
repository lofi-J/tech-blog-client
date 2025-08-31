export const isFilename = (str: string): boolean => {
  const filenameRegex = /^[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/;
  return filenameRegex.test(str);
};
