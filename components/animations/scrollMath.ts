export const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export const easeQuad = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
