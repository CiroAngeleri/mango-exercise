import { findNearestValue, percentageToNumber } from "./utils";

export const useInitialThumbValue = (
  initialThumbPercentage: number,
  min: number,
  max: number,
  range: number[]
) => {
  let initialThumbValue = percentageToNumber(initialThumbPercentage, min, max);
  /* 
    NOTE: we could use useMemo in the next line but since we used refs 
    our component only renders initially and when the user types 
    which is not allowed on fixed values/range mode so using useMemo
    would only add complexity and no performance improvement. 
  */
  if (range.length) initialThumbValue = findNearestValue(range, initialThumbValue);

  return {
    initialThumbValue
  };
};
