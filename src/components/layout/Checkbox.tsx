import React from "react";
import styled from "styled-components";
import { ITheme } from "../../App";
import { Label } from "./Label";

const CheckboxWrapper = styled.div`
  --input-ouline: ${({ theme }) => (theme as ITheme).colors.primary};
  display: flex;
  justify-content: flex-start;
`;

const HiddenCheckbox = styled.input`
  /* Remove most all native input styles */
  appearance: none;
  /* For iOS < 15 */
  /* Not removed via appearance */
  margin: 0;

  font: inherit;
  color: currentColor;
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid currentColor;
  border-radius: 0.15em;
  transform: translateY(-0.075em);
  margin-right: 0.5rem;

  display: grid;
  place-content: center;
  &:before {
    content: "";
    display: inline-flex;
    width: 0.65em;
    height: 0.65em;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    transform: scale(0);
    transform-origin: bottom left;
    transition: 120ms transform ease-in-out;
    box-shadow: ${({ theme }) =>
      `inset 1em 1em ${(theme as ITheme).colors.primary}`};
    /* Windows High Contrast Mode */
    background-color: #fff;
  }
  &:checked:before {
    transform: scale(1);
  }
  &:focus {
    outline: max(1px, 0.15em) solid var(--input-ouline);
    outline-offset: max(1px, 0.15em);
  }
  &:disabled {
    opacity: 0.5;
  }
`;

const ExtendedLabel = styled(Label)`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

interface CheckboxProps extends React.HTMLAttributes<HTMLInputElement> {
  label: string;
}
export const Checkbox: React.FC<CheckboxProps> = ({ label, ...rest }) => {
  return (
    <CheckboxWrapper>
      <ExtendedLabel>
        <HiddenCheckbox type="checkbox" {...rest} />
        {label}
      </ExtendedLabel>
    </CheckboxWrapper>
  );
};
