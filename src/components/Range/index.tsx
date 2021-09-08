import React, { ChangeEvent, FC, useEffect, useState, useRef } from "react";
import {
  Header,
  Slider,
  StartThumb,
  EndThumb,
  RangeInput,
  Container,
  MinRangeInputContainer,
  MaxRangeInputContainer
} from "./styled";
import { useInitialThumbValue } from "./hooks";
import {
  getInitialMin,
  getInitialMax,
  ratioToPercentage,
  percentageToNumber,
  findNearestValue,
  percentageToPixels,
  forceNumberBetweenLimits
} from "./utils";
import { RangeProps } from "./types";

export const Range: FC<RangeProps> = ({ initialStartPercentage, initialEndPercentage, min, max, range = [] }) => {
  const initialMin = getInitialMin(range, min);
  const initialMax = getInitialMax(range, max);

  const [minInputValue, setMinInputValue] = useState(0);
  const [maxInputValue, setMaxInputValue] = useState(0);

  useEffect(() => {
    setMinInputValue(initialMin)
  }, [initialMin])

  useEffect(() => {
    setMaxInputValue(initialMax)
  }, [initialMax])

  const { initialThumbValue: initialStartThumbValue } = useInitialThumbValue(
    initialStartPercentage,
    initialMin,
    initialMax,
    range
  );

  const { initialThumbValue: initialEndThumbValue } = useInitialThumbValue(
    initialEndPercentage,
    initialMin,
    initialMax,
    range
  );

  const sliderRef = useRef<HTMLDivElement>(null);

  const startThumbRef = useRef<HTMLDivElement>(null);
  const endThumbRef = useRef<HTMLDivElement>(null);

  const currentRef = useRef<HTMLSpanElement>(null);
  const currentRef2 = useRef<HTMLSpanElement>(null);

  const minRangeInputRef = useRef<HTMLDivElement>(null);
  const maxRangeInputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // NOTE: Populates currently selected range values ONLY the first time.
    if (currentRef.current)
      currentRef.current.textContent = initialStartThumbValue.toString();
    if (currentRef2.current)
      currentRef2.current.textContent = initialEndThumbValue.toString();
  }, [initialStartThumbValue, initialEndThumbValue]);

  const handleMouseMoveStartThumb = (event: MouseEvent) => {
    const sliderWidth = sliderRef.current?.offsetWidth || 0;
    const sliderLeftViewportDistance = sliderRef.current?.getBoundingClientRect
      ? sliderRef.current.getBoundingClientRect().left
      : 0;

    const endThumbLeftViewportDistance = endThumbRef.current?.getBoundingClientRect
      ? endThumbRef.current.getBoundingClientRect().left
      : 0;
    const endThumbLeft = endThumbLeftViewportDistance - sliderLeftViewportDistance + 3;

    const minStartThumbValue = 0;
    const maxStartThumbValue = endThumbLeft;

    const thumbValue = event.clientX - sliderLeftViewportDistance - 10;
    const newStartThumbValue = forceNumberBetweenLimits({
      number: thumbValue,
      min: minStartThumbValue,
      max: maxStartThumbValue
    });

    const percentage = ratioToPercentage(newStartThumbValue, sliderWidth);

    let newValue = percentageToNumber(percentage, minInputValue, maxInputValue);

    if (range.length) newValue = findNearestValue(range, newValue);

    if (startThumbRef.current)
      startThumbRef.current.style.left = percentageToPixels(percentage);
    if (currentRef.current) currentRef.current.textContent = newValue.toFixed(2);

  };
  const handleMouseMoveEndThumb = (event: MouseEvent) => {
    const sliderWidth = sliderRef.current?.offsetWidth || 0;
    const sliderLeftViewportDistance = sliderRef.current?.getBoundingClientRect
      ? sliderRef.current.getBoundingClientRect().left
      : 0;

    const startThumbLeftViewportDistance = startThumbRef.current?.getBoundingClientRect
      ? startThumbRef.current.getBoundingClientRect().left
      : 0;

    const startThumbLeftWidth = startThumbRef.current
      ? startThumbRef.current.offsetWidth
      : 0;
    const startThumbLeft =
      startThumbLeftViewportDistance -
      sliderLeftViewportDistance +
      startThumbLeftWidth / 3;

    const endThumbMinValue = startThumbLeft;
    const endThumbMaxValue = sliderWidth;

    const thumbValue = event.clientX - sliderLeftViewportDistance - 10;
    const newEndThumbValue = forceNumberBetweenLimits({
      number: thumbValue,
      min: endThumbMinValue,
      max: endThumbMaxValue
    });

    const percentage = ratioToPercentage(newEndThumbValue, sliderWidth);

    let newValue = percentageToNumber(percentage, minInputValue, maxInputValue);
    if (range.length) newValue = findNearestValue(range, newValue);

    if (endThumbRef.current)
      endThumbRef.current.style.left = percentageToPixels(percentage);
    if (currentRef2.current) currentRef2.current.textContent = newValue.toFixed(2);
  };

  const handleMouseUpStartThumb = () => {
    if (startThumbRef.current) {
      startThumbRef.current.style.width = "20px";
      startThumbRef.current.style.height = "20px";
      startThumbRef.current.style.top = "-8px";
      startThumbRef.current.style.cursor = "pointer";
    }

    document.removeEventListener("mouseup", handleMouseUpStartThumb);
    document.removeEventListener("mousemove", handleMouseMoveStartThumb);
  };

  const handleMouseUpEndThumb = () => {
    if (endThumbRef.current) {
      endThumbRef.current.style.width = "20px";
      endThumbRef.current.style.height = "20px";
      endThumbRef.current.style.top = "-8px";
      endThumbRef.current.style.cursor = "pointer";
    }

    document.removeEventListener("mouseup", handleMouseUpEndThumb);
    document.removeEventListener("mousemove", handleMouseMoveEndThumb);
  };

  const handleMouseDownStartThumb = () => {
    if (startThumbRef.current) {
      startThumbRef.current.style.width = "25px";
      startThumbRef.current.style.height = "25px";
      startThumbRef.current.style.top = "-10px";
      startThumbRef.current.style.cursor = "grab";
    }

    document.addEventListener("mousemove", handleMouseMoveStartThumb);
    document.addEventListener("mouseup", handleMouseUpStartThumb);
  };
  const handleMouseDownEndThumb = () => {
    if (endThumbRef.current) {
      endThumbRef.current.style.width = "25px";
      endThumbRef.current.style.height = "25px";
      endThumbRef.current.style.top = "-10px";
      endThumbRef.current.style.cursor = "grab";
    }

    document.addEventListener("mousemove", handleMouseMoveEndThumb);
    document.addEventListener("mouseup", handleMouseUpEndThumb);
  };

  return (
    <div>
      <Header>
        <span ref={currentRef} data-testid="current-start-thumb-value"></span>
          -
        <span ref={currentRef2} data-testid="current-end-thumb-value"></span>
      </Header>
      <Container>
        <MinRangeInputContainer ref={minRangeInputRef}>
          <RangeInput
            disabled={Boolean(range?.length)}
            type="number"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setMinInputValue(parseFloat(e.target.value))
            }
            value={minInputValue}
          />
          <span>€</span>
        </MinRangeInputContainer>

        <Slider ref={sliderRef}>
          <StartThumb
            data-testid="start-thumb"
            style={{ left: percentageToPixels(initialStartPercentage) }}
            ref={startThumbRef}
            onMouseDown={handleMouseDownStartThumb}
          />
          <EndThumb
            data-testid="end-thumb"
            style={{ left: percentageToPixels(initialEndPercentage) }}
            ref={endThumbRef}
            onMouseDown={handleMouseDownEndThumb}
          />
        </Slider>
        <MaxRangeInputContainer ref={maxRangeInputRef}>
          <RangeInput
            disabled={Boolean(range?.length)}
            type="number"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setMaxInputValue(parseFloat(e.target.value))
            }
            value={maxInputValue}
          />
          <span>€</span>
        </MaxRangeInputContainer>
      </Container>
    </div>
  );
};
