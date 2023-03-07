import styled from 'styled-components'
import { type ITheme } from '../../App'

interface ButtonProps {
  outlined?: boolean
  center?: boolean
}

export const Button = styled.button<ButtonProps>`
  background: ${({ theme }) => theme.colors.gradientBg};
  color: ${({ theme }) => theme.colors.text};
  border: 0;
  display: inline-flex;
  padding: 0 2rem;
  border-radius: 0.25rem;
  height: 3rem;
  line-height: 3rem;
  align-items: center;
  font-size: 1rem;
  justify-content: center;
  font-weight: bold;
  position: relative;
  cursor: pointer;
  span {
    width: 100%;
    height: 100%;
  }
  svg {
    margin-right: 0.75rem;
    transition: transform 0.15s ease;
  }
  &:hover {
    svg {
      transform: scale(1.1);
    }
  }
  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
  ${({ outlined, theme }) =>
    outlined &&
    `
    background: ${(theme as ITheme).colors.modalBg};
    &:before {
      content: '';
      position: absolute;
      top: 0; right: 0; bottom: 0; left: 0;
      z-index: -1;
      margin: -2px; 
      border-radius: inherit;
      background: ${(theme as ITheme).colors.gradientBg};
    }
    &:hover {
      background: rgba(255,255,255,0.1);
    }
  `}
  ${({ center }) =>
    center &&
    `
    margin: 0 auto;
    }
  `}
`
