import styled from "styled-components"
import { ITheme } from "../../App"

export const Input = styled.input`
  background-color: rgba(255, 255, 255, 0.05);
  height: 3rem;
  line-height: 3rem;
  border: 0;
  padding: 0 1rem;
  &:invalid {
    border: ${({ theme }) => `1px solid ${(theme as ITheme).colors.error}`};
  }
`
