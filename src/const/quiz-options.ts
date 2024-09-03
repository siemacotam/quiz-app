export const categories = [
  { name: "Sports", number: 21 },
  { name: "History", number: 23 },
  { name: "General", number: 9 },
];

export const difficulties = {
  easy: "easy",
  medium: "medium",
  hard: "hard",
} as const;

export type Difficulties = keyof typeof difficulties;
