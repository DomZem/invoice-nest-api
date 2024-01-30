export const generateRandomString = (): string => {
  const firstChar = String.fromCharCode(65 + Math.floor(Math.random() * 26));

  const secondChar =
    Math.random() < 0.5
      ? String.fromCharCode(65 + Math.floor(Math.random() * 26)) // Letter
      : Math.floor(10 * Math.random()).toString(); // Digit

  const restOfChars = Math.floor(1000 + Math.random() * 9000).toString();

  return firstChar + secondChar + restOfChars;
};
