import styled from 'styled-components'
export const CloseButton = styled.button`
  width: 3rem;
  height: 3rem;
  z-index: 101;
  top: -1rem;
  right: -1rem;
  border: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  font-size: 2rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.gradientBg};
  color: #fff;
  cursor: pointer;
  span {
    display: inline-block;
  }
`
