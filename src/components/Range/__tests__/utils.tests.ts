import {
  ratioToPercentage,
  percentageToNumber,
  findNearestValue,
  percentageToPixels,
  getInitialMin,
  getInitialMax,
  forceNumberBetweenLimits
} from "../utils";
describe("Test for util functions of the Range Component", () => {
  describe("ratioToPercentage", () => {
    it("should convert 1, 2 to 50 (%)", () => {
      expect(ratioToPercentage(1, 2)).toBe(50);
    });
    it("should convert 0.25, 0.5 to 50 (%)", () => {
      expect(ratioToPercentage(0.25, 0.5)).toBe(50);
    });
  });
  describe("percentageToNumber", () => {
    it("If 0 = 0% (min) and 100 = 100% (max), 75% = 75", () => {
      expect(percentageToNumber(75, 0, 100)).toBe(75);
    });
    it("If 100 = 0% and 200 = 100%, 150 = 50%", () => {
      // Middle point (50%) bewteen 100 and 200 is 150
      expect(percentageToNumber(50, 100, 200)).toBe(150);
    });
  });
  describe("findNearestValue", () => {
    it("should return 5 if given a target 5 in array [3,4,5] ", () => {
      expect(findNearestValue([3, 4, 5], 5)).toBe(5);
    });
    it("should return 5 if given a target 4.6 in array [3,4,5] ", () => {
      expect(findNearestValue([3, 4, 5], 4.6)).toBe(5);
    });
    it("should return 4 if given a target 4.5 in array [3,4,5] ", () => {
      expect(findNearestValue([3, 4, 5], 4.6)).toBe(5);
    });
  });
  describe("percentageToPixels", () => {
    // TODO: think of a regex that does better checks to this function
    it("Should return a string that includes 75% if given 75", () => {
      expect(percentageToPixels(75).includes("75%")).toBe(true);
    });
    it("Should return a string that includes the word calc", () => {
      expect(percentageToPixels(75).includes("calc")).toBe(true);
    });
  });
  describe("getInitialMin", () => {
    it("return the first number of the range array if the range array is passed", () => {
      expect(getInitialMin([10, 90], null)).toBe(10);
    });
    it("return the min param if the range array is not passed", () => {
      expect(getInitialMin(null, 2)).toBe(2);
    });
    it("return the min param if the range array passed is empty", () => {
      expect(getInitialMin([], 2)).toBe(2);
    });
  });
  describe("getInitialMax", () => {
    it("return the last number of the range array if the range array is passed", () => {
      expect(getInitialMax([10, 90], null)).toBe(90);
    });
    it("return the max param if the range array is not passed", () => {
      expect(getInitialMax(null, 2)).toBe(2);
    });
    it("return the max param if the range array passed is empty", () => {
      expect(getInitialMax([], 2)).toBe(2);
    });
  });
  describe("forceNumberBetweenLimits", () => {
    it("should return the number if its between the min/max boundaries", () => {
      expect(forceNumberBetweenLimits({ number: 10, min: 5, max: 15 })).toBe(10);
    });
    it("should return the max number if the number passed is greater than the max limit", () => {
      expect(forceNumberBetweenLimits({ number: 16, min: 5, max: 15 })).toBe(15);
    });
    it("should return the min number if the number passed is less than the min limit", () => {
      expect(forceNumberBetweenLimits({ number: 1, min: 5, max: 15 })).toBe(5);
    });
  });
});
