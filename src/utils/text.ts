export const decodeQuestion = (text: string) =>
  text
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "")
    .replace(/&ldquo;/g, "")
    .replace(/&rdquo;/g, "");

export function capitalizeFirstLetter(string: string) {
  if (!string) return string; // Sprawdzenie, czy string nie jest pusty
  return string.charAt(0).toUpperCase() + string.slice(1);
}
