import { useInitialThumbValue } from "../hooks";

describe("Test for hooks of the Range Component", () => {
  describe("useInitialThumbValue", () => {
    it("should transform percentage to number when range array is empty", () => {
      expect(useInitialThumbValue(20, 0, 100, []).initialThumbValue).toBe(20);
    });
    it("should transform percentage (between min and max) to number when range array is empty ", () => {
      expect(useInitialThumbValue(50, 100, 200, []).initialThumbValue).toBe(150);
    });
    it("should transform percentage to closest number of range array", () => {
      expect(useInitialThumbValue(50, 0, 100, [20, 51, 70, 120]).initialThumbValue).toBe(
        51
      );
    });
  });
});
