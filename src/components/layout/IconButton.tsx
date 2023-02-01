import React from "react";
import styled from "styled-components";

export const IconButton = styled.button`
  background-color: rgba(255, 255, 255, 0.05);
  border: 0;
  border-radius: 0.25rem;
  width: 5rem;
  height: 5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  span {
    font-size: 5rem;
    background: ${({ theme }) => theme.colors.gradientBg};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
