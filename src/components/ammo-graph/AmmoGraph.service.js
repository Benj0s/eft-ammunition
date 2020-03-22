export const PADDING = 10

export const maxAndPad = (arr, padding = PADDING) =>
  Math.ceil(Math.max(...arr) / padding) * padding

export const generateTicks = (maxValue, padding = PADDING) =>
  Array(maxValue / padding + 1)
    .fill()
    .map((a, i) => i * padding)
