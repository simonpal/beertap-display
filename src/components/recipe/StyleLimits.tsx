import React, { useMemo } from "react";
import styled, { useTheme } from "styled-components";
import { ITheme } from "../../App";

interface IBackground {
  background: string;
}
const StyleLimitsWrapper = styled.div`
  height: 6rem;

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
  background-color: rgba(255, 255, 255, 0.1);
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

interface RangeProps extends IBackground {
  widthPercentage: number;
  rangeStart: number;
}

const StyleRange = styled.div<RangeProps>`
  width: ${({ widthPercentage }) => `${widthPercentage}%`};
  position: absolute;
  background-color: ${({ background }) => background};
  left: ${({ rangeStart }) => `${rangeStart}%`};
  /* left: 50%; 
  transform: translateX(-50%);*/
  height: 100%;
  top: 0;
  border-radius: 0.25rem;
`;

interface ValueProps extends IBackground {
  leftPercentage: number;
}
const ActualValue = styled.div<ValueProps>`
  width: 2px;
  height: 0.875rem;
  // border-radius: 50%;
  // background-color: ${({ background }) => background};
  background-color: #fff;
  box-shadow: 4px 3px 6px 0px rgba(0, 0, 0, 0.75);
  z-index: 10;
  left: ${({ leftPercentage }) => `${leftPercentage}%`};
  top: 50%;
  transform: translateY(-50%);
  position: absolute;
`;

interface StyleLimitProps {
  title: string;
  value: number;
  min: number;
  max: number;
  padding: number;
}

const StyleLimits = ({ title, value, min, max, padding }: StyleLimitProps) => {
  const theme = useTheme() as ITheme;
  const bg = value > max ? theme.colors.error : theme.colors.primary;

  const values = useMemo(() => {
    const valueMax = Math.max(value, max) * 1.1;
    const valueMin = Math.min(value, min) * 0.9;
    const diff = max - min;
    const minMaxDiff = valueMax - valueMin;
    const styleDiff = max - min;
    if (title === "test") {
      console.log({ minMaxDiff }, { styleDiff });
      console.log({ value });
      console.log({ min }, { valueMin }, { max }, { valueMax });
    }
    return {
      rangeWidth: ((max + min) / (valueMax + valueMin)) * 100,
      left: (value / valueMax) * 100,
      rangeStart: (diff / valueMax) * 100,
    };
  }, [value, min, max]);
  /*
    Range start (minValue * 0.7) -> end (maxValue * 1.3)
    Style min
    Style max
    Actual value = 
  */
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
        <ActualValue background={bg} leftPercentage={values.left}>
          <ValueHolder center>
            {value.countDecimals() > 3 ? value.toFixed(3) : value}
          </ValueHolder>
        </ActualValue>
        <StyleRange
          background={bg}
          rangeStart={values.rangeStart}
          widthPercentage={values.rangeWidth}
        ></StyleRange>
        {/* <ValueHolder right>{max}</ValueHolder> */}
      </Line>
    </StyleLimitsWrapper>
  );
};

export default React.memo(StyleLimits);
