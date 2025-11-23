
/**
 * Utility to merge Tailwind classes safely
 */
export const clsx = (...classes: (string | undefined | null | boolean)[]): string => {
  return classes.filter(Boolean).join(' ');
};