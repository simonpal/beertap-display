import styled from "styled-components"
import { ITheme } from "../../App"

export const Label = styled.label`
  font-weight: bold;
  display: flex;
  align-items: center;
  width: 100%;
  text-align: left;
  margin-bottom: 0.25rem;
  svg {
    color: ${({ theme }) => (theme as ITheme).colors.gradientStart};
    margin-left: 0.5rem;
  }
  button {
    background: transparent;
    color: ${({ theme }) => (theme as ITheme).colors.gradientStart};
    border: 0;
    font-size: 1rem;
    cursor: pointer;
  }
`
