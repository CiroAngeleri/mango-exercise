import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const MinRangeInputContainer = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;
`;
export const MaxRangeInputContainer = styled.div`
  margin-left: 10px;
  display: flex;
`;

export const RangeInput = styled.input`
  width: 34px;
  margin-bottom: 1px;
  text-align: right;
  outline: none;
  border: none;
  &:disabled {
    color: black;
    background: none;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
`;

export const Slider = styled.div`
  position: relative;
  border-radius: 3px;
  width: 100%;
  background: black;
  height: 5px;
`;

export const StartThumb = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
  top: -8px;
  background: black;
  cursor: pointer;
`;

export const EndThumb = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
  top: -8px;
  background: black;
  cursor: pointer;
`;
