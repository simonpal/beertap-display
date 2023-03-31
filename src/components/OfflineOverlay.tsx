import React, { useEffect } from "react"
import styled from "styled-components"
import { ITheme } from "../App"
import SadFaceIcon from "./icons/SadFaceIcon"
import { GlobalStateActionTypes, useGlobalState } from "../utils/globalState"

// const OfflineOverlayWrapper = styled.div`
//   z-index: 1001;
//   background-color: rgba(0, 0, 0, 0.7);
//   position: fixed;
//   left: 0;
//   top: 0;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `

const OfflineContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  background-color: ${({ theme }) => (theme as ITheme).colors.primary};
  border: 1px solid rgba(255, 255, 255, 0.3);
  width: 100%;
  max-width: 100%;
  text-align: center;
  transition: all 0.5s ease;
  transform: translateY(-150%);
  h2 {
    display: flex;
    align-items: center;
    svg {
      margin-left: 1rem;
      color: ${({ theme }) => (theme as ITheme).colors.text};
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
  const {
    state: { isOffline },
    dispatch,
  } = useGlobalState()

  useEffect(() => {
    if (offline !== isOffline) {
      dispatch({
        type: GlobalStateActionTypes.ToggleOffline,
        payload: offline,
      })
    }
  }, [offline])

  if (!offline) {
    return null
  }
  return (
    // <OfflineOverlayWrapper>
    <OfflineContentWrapper className={`${offline ? "active" : ""}`}>
      <h2>
        You are offline <SadFaceIcon />
      </h2>
    </OfflineContentWrapper>
    // </OfflineOverlayWrapper>
  )
}
