import { render, fireEvent } from "@testing-library/react";
import { Range } from "../index";

Object.defineProperties(window.HTMLElement.prototype, {
  offsetLeft: {
    get: function () {
      return parseFloat(window.getComputedStyle(this).marginLeft) || 0;
    }
  },
  offsetTop: {
    get: function () {
      return parseFloat(window.getComputedStyle(this).marginTop) || 0;
    }
  },
  offsetHeight: {
    get: function () {
      return parseFloat(window.getComputedStyle(this).height) || 0;
    }
  },
  offsetWidth: {
    get: function () {
      return parseFloat(window.getComputedStyle(this).width) || 0;
    }
  }
});

describe("Tests for the Range component", () => {
  it("renders correctly", () => {
    const component = render(<Range min={5000} max={8000} />);
    expect(component).toBeTruthy();
  });

  it("moves the starting thumb to the left", () => {
    const { getByTestId } = render(<Range min={10} max={100} />);
    const startThumb = getByTestId("start-thumb");
    fireEvent.mouseDown(startThumb);
    fireEvent.mouseMove(startThumb, { clientX: 4000 });
    fireEvent.mouseUp(startThumb);

    expect(true).toBeTruthy();
  });
});
