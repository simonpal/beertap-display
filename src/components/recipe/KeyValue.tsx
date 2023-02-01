import React from "react";
import styled from "styled-components";

const StyledKeyValue = styled.div`
  flex-basis: 25%;
  padding: 1rem 0.5rem;
  color: ${({ theme }) => theme.colors.text};
  strong {
    display: block;
    margin-bottom: 0.2rem;
    text-transform: capitalize;
  }
`;

interface KeyValueProps {
  title: string;
  value: string | Number;
}
export const KeyValue: React.FC<KeyValueProps> = ({ title, value }) => {
  return (
    <StyledKeyValue data-testid={`data-item-${title}`}>
      {title && <strong>{title}: </strong>}
      {value}
    </StyledKeyValue>
  );
};
