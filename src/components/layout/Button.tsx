import styled from "styled-components";

export const Button = styled.button`
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
`;
