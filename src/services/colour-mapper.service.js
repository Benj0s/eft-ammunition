export const generateHexColourFromString = string =>
  `#${Math.floor(parseInt(string, 10)).toString(16)}`
