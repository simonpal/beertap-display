import React from "react"
import styled from "styled-components"
import { ITheme } from "../App"
import SadFaceIcon from "./icons/SadFaceIcon"

const OfflineOverlayWrapper = styled.div`
  z-index: 1001;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const OfflineContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: ${({ theme }) => (theme as ITheme).colors.modalBg};
  border: 1px solid rgba(255, 255, 255, 0.3);
  width: 500px;
  max-width: 100%;
  margin: 1rem auto;
  text-align: center;
  transition: all 0.5s ease;
  transform: translateY(-150%);
  h2 {
    display: flex;
    align-items: center;
    svg {
      margin-right: 1rem;
      color: ${({ theme }) => (theme as ITheme).colors.gradientStart};
    }
  }
  &.active {
    transform: translateY(0);
  }
`

interface OfflineOverlayProps {
  offline: boolean
}

export const OfflineOverlay: React.FC<OfflineOverlayProps> = ({ offline }) => {
  if (!offline) {
    return null
  }
  return (
    <OfflineOverlayWrapper>
      <OfflineContentWrapper className={`${offline ? "active" : ""}`}>
        <h2>
          <SadFaceIcon /> You are offline
        </h2>
      </OfflineContentWrapper>
    </OfflineOverlayWrapper>
  )
}
