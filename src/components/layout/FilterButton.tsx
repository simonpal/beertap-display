import styled from "styled-components";
import { ITheme } from "../../App";

interface FilterButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}
export const FilterButton = styled.button<FilterButtonProps>`
  height: 2rem;
  padding: 0 0.5rem;
  border: ${({ theme }) => `1px solid ${(theme as ITheme).colors.primary}`};
  color: ${({ theme }) => (theme as ITheme).colors.primary};
  background-color: transparent;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.85rem;
  font-weight: bold;
  cursor: pointer;
  ${({ selected, theme }) =>
    selected &&
    `
        background-color: ${theme.colors.primary};
        color: ${theme.colors.text}
    `}
`;
