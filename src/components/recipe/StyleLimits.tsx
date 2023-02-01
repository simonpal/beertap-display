import React from "react";
import styled from "styled-components";

const StyleLimitsWrapper = styled.div`
  height: 6rem;
  margin-bottom: 0.5rem;
  width: 100%;
  padding: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  h4 {
    text-align: left;
    margin-bottom: 0.25rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    span {
      font-size: 0.875rem;
    }
  }
`;

const Line = styled.div`
  position: relative;
  height: 0.25rem;
  width: 100%;
  border-radius: 0.25rem;
  background-color: rgba(255, 255, 255, 0.05);
`;

interface ValueHolderProps {
  right?: boolean;
  center?: boolean;
}

const ValueHolder = styled.div<ValueHolderProps>`
  position: absolute;
  left: ${({ right }) => (right ? "auto" : 0)};
  right: ${({ right }) => (right ? 0 : "auto")};
  padding: 0.15rem 0.3rem;
  background: #333;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-weight: bold;
  top: calc(100% + 8px);
  transform: translateX(-50%);
  ${({ center, right }) =>
    !center &&
    right &&
    `
    transform: translateX(50%);
  `}
  ${({ center }) =>
    center &&
    `
    left: 50%;
  `}
  &:after {
    content: "";
    position: absolute;
    border-right: 8px solid transparent;
    border-left: 8px solid transparent;
    border-bottom: 8px solid #333;
    left: 50%;
    bottom: 100%;
    transform: translateX(-50%);
  }
`;

interface RangeProps {
  widthPercentage: number;
}

const StyleRange = styled.div<RangeProps>`
  width: ${({ widthPercentage }) => `${widthPercentage}%`};
  position: absolute;
  background-color: ${({ theme }) => theme.colors.primary};
  left: 0;
  height: 100%;
  top: 0;
  border-radius: 0.25rem;
`;

interface ValueProps {
  leftPercentage: number;
}
const ActualValue = styled.div<ValueProps>`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow: 4px 3px 6px 0px rgba(0, 0, 0, 0.75);
  z-index: 10;
  left: ${({ leftPercentage }) => `${leftPercentage}%`};
  top: 50%;
  transform: translateY(-50%);
  position: absolute;
`;

const StyleLimits = ({ title, value, min, max, padding }: any) => {
  const valueMax = Math.max(value, max) + padding;
  const width = (max / valueMax) * 100;
  const left = (value / valueMax) * 100;
  return (
    <StyleLimitsWrapper>
      <h4>
        {title}{" "}
        <span>
          Min: {min} / Max: {max}
        </span>
      </h4>
      <Line>
        {/* <ValueHolder>{min}</ValueHolder> */}
        <ActualValue leftPercentage={left}>
          <ValueHolder center>{value.toFixed(3)}</ValueHolder>
        </ActualValue>
        <StyleRange widthPercentage={width} />
        {/* <ValueHolder right>{max}</ValueHolder> */}
      </Line>
    </StyleLimitsWrapper>
  );
};

export default React.memo(StyleLimits);
