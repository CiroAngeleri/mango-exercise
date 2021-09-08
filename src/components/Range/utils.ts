import memoize from "memoizee";

export const ratioToPercentage = (current: number, max: number) => (100 * current) / max;

export const percentageToNumber = (percentage: number, min: number, max: number) =>
  ((max - min) / 100) * percentage + min;

const findNearestValueNoMemo = (arr: number[], goal: number) =>
  arr.reduce((prev, curr) =>
    Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev
  );
export const findNearestValue = memoize(findNearestValueNoMemo);

export const percentageToPixels = (percentage: number) => `calc(${percentage}% - 5px)`;

export const getInitialMin = (range?: number[], min?: number) =>
  (range && range[0]) || min || 0;

export const getInitialMax = (range?: number[], max?: number) =>
  (range && range[range.length - 1]) || max || 0;

interface Param {
  number: number;
  min: number;
  max: number;
}
export const forceNumberBetweenLimits = ({ number, min, max }: Param) => {
  if (number < min) {
    return min;
  }

  if (number > max) {
    return max;
  }
  return number;
};
