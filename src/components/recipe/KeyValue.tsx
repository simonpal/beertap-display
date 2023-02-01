import React, { useMemo } from "react";
import styled from "styled-components";
import { calcFromEbc } from "../../utils/colorCalc";

const StyledKeyValue = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  strong {
    /* display: block;
    margin-bottom: 0.2rem; */
    text-transform: capitalize;
  }
`;

interface ColorBoxProps {
  backgroundColor: string;
}
const ColorBox = styled.span<ColorBoxProps>`
  width: 1rem;
  height: 1rem;
  display: inline-block;
  margin-left: 0.5rem;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

interface KeyValueProps {
  title: string;
  value: string | Number;
}
export const KeyValue: React.FC<KeyValueProps> = ({ title, value }) => {
  let bg = useMemo(() => calcFromEbc(Number(value) || 10), [value]);
  return (
    <StyledKeyValue data-testid={`data-item-${title}`}>
      <span>{title && <strong>{title}: </strong>}</span>
      <span>
        {value} {title === "EBC" && <ColorBox backgroundColor={`#${bg}`} />}
      </span>
    </StyledKeyValue>
  );
};
