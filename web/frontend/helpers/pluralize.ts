export function pluralize(word: string, amount: number) {
    if (amount === 1) {
      return word;
    }
    return `${word}s`;
  }
  