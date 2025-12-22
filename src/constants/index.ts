export const FORBIDDEN_WORDS: readonly string[] = (process.env.FORBIDDEN_WORDS ?? '')
  .split(',')
  .map(word => word.trim())
  .filter(word => word.length > 0);