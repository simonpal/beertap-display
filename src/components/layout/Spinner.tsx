import styled, { keyframes } from 'styled-components'

const rotation = keyframes`
    0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
`

export const Spinner = styled.span`
  width: 48px;
  height: 48px;
  display: inline-block;
  margin: 1rem auto;
  position: relative;
  &:after,
  &:before {
    content: "";
    box-sizing: border-box;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #fff;
    position: absolute;
    left: 0;
    top: 0;
    animation: ${rotation} 2s linear infinite;
  }
  &:after {
    animation-delay: 1s;
  }
`
