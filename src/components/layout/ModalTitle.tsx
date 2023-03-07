import styled from "styled-components";

export const ModalTitle = styled.h2`
  display: flex;
  color: ${({ theme }) => theme.colors.gradientStart};
  text-align: center;
  background: ${({ theme }) => theme.colors.gradientBg};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  svg {
    margin-right: 0.75rem;
    /* path {
      fill: ${({ theme }) => theme.colors.gradientStart};
    } */
  }
`;
