import React from "react"
import { useStorage } from "../utils/storage"
import Keg from "./Keg"
import { KegRow, KegWrapper } from "./layout/KegRow"
import { NoKegsOrSettings } from "./NoKegsOrSettings"
import styled from "styled-components"
import { ITheme } from "../App"

const OnTap = styled.div`
  font-family: "Lobster", cursive;
  font-size: 3rem;
  margin-bottom: 2rem;
  text-shadow: 3px 3px 5px rgba(0, 0, 0, 1);
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
  const { settings } = useStorage()

  return (
    <>
      <NoKegsOrSettings />
      <OnTap>
        <span className="line" />
        <span>On Tap</span>
        <span className="line" />
      </OnTap>
      <KegRow>
        {Array(settings.noKegs)
          .fill(null)
          .map((_, i) => i)
          .map((_, i) => (
            <KegWrapper noKegs={settings.noKegs} key={`keg-${i}`}>
              <Keg
                recipeId={settings.kegs[i]}
                onClick={() => {
                  console.log(i)
                }}
              />
            </KegWrapper>
          ))}
      </KegRow>
    </>
  )
}

export default AllKegs
