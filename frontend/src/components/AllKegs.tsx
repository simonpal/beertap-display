import React from "react"
import Keg from "./Keg"
import { KegRow, KegWrapper } from "./layout/KegRow"
import styled from "styled-components"
import { ITheme } from "../App"
import { useSettings } from "../utils/customHooks"
import { auth } from "../firebase"
import { useAuthState } from "react-firebase-hooks/auth"

const OnTap = styled.div`
  font-family: "Lobster", cursive;
  font-size: 3rem;
  margin-bottom: 1rem;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 1);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => (theme as ITheme).colors.gradientStart};
  span:not(.line) {
    margin: 0 1rem;
    /* color: ${({ theme }) => theme.colors.gradientStart};
    text-align: center;
    background: ${({ theme }) => theme.colors.gradientBg};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent; */
  }
  span.line {
    height: 1px;
    width: 20%;
    /* background-color: ${({ theme }) =>
      (theme as ITheme).colors.gradientStart}; */
    /* opacity: 0.5; */
    background-color: rgba(255, 255, 255, 0.3);
    display: inline-block;
  }
`

const AllKegs: React.FC = () => {
  const { fbSettings } = useSettings()
  if (!fbSettings) return null
  return (
    <>
      <OnTap>
        <span className="line" />
        <span>On Tap</span>
        <span className="line" />
      </OnTap>
      <KegRow>
        {Boolean(fbSettings && fbSettings?.noKegs > 0) &&
          Array(fbSettings.noKegs)
            .fill(null)
            .map((_, i) => {
              const keg = fbSettings?.kegs?.[i]
              if (!keg) return null
              return (
                <KegWrapper noKegs={fbSettings?.noKegs ?? 1} key={`keg-${i}`}>
                  <Keg recipeId={fbSettings?.kegs[i]} />
                </KegWrapper>
              )
            })}
      </KegRow>
    </>
  )
}

export default AllKegs
