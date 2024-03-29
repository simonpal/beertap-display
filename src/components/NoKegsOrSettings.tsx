import React from "react"
import styled from "styled-components"
import InfoIcon from "./icons/InfoIcon"
import { useSettings } from "../utils/customHooks"

const NoContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.3);
  width: 500px;
  max-width: 100%;
  margin: 1rem auto;
  text-align: center;
  h2 {
    display: flex;
    align-items: center;
    svg {
      margin-right: 1rem;
    }
  }
`

export const NoKegsOrSettings = () => {
  const { fbSettings } = useSettings()
  // console.log(fbSettings)
  if (
    fbSettings?.noKegs > 0 &&
    fbSettings?.brewfatherApiKey !== "" &&
    fbSettings?.brewfatherUserId !== ""
  ) {
    console.log("Do not show empty message")
    return null
  }
  return (
    <NoContentWrapper>
      <h2>
        <InfoIcon /> Insufficient settings
      </h2>
      <p>
        Make sure you add all the necessary settings to show recipes and kegs.
      </p>
    </NoContentWrapper>
  )
}
