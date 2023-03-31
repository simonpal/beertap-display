import React from "react"
import styled from "styled-components"
import BeerGlassIcon from "../icons/BeerGlassIcon"
// import BeerMugFull from '../icons/BeerMugFull';
import SettingsIcon from "../icons/SettingsIcon"
import DisplayIcon from "../icons/DisplayIcon"

import glass from "../../assets/glass-icon.svg"
import { auth, logout } from "../../firebase"
import LogoutIcon from "../icons/LogoutIcon"
import { useAuthState } from "react-firebase-hooks/auth"
import { useSettings } from "../../utils/customHooks"

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: rgba(0, 0, 0, 0.5);
  button {
    background: transparent;
    display: inline-flex;
    align-items: center;
    border: 0;
    font-weight: bold;
    // text-decoration: underline;
    cursor: pointer;
    svg {
      margin-right: 0.75rem;
      transition: transform 0.15s ease;
    }
    &:hover {
      svg {
        transform: scale(1.1);
      }
    }
  }
  > div {
    width: 33%;
    align-items: center;
    display: flex;
  }
  .multi-btn {
    display: flex;
    justify-content: flex-end;
    button {
      padding: 0 1rem;
      border-right: 1px solid rgba(255, 255, 255, 0.1);
      &:last-of-type {
        border-right: 0;
      }
    }
  }
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    font-family: "Lobster", cursive;
    /* color: ${({ theme }) => theme.colors.gradientStart}; */
    color: #fff;
    text-align: center;
    /* background: ${({ theme }) => theme.colors.gradientBg};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent; */
    svg {
      margin-right: 0.5rem;
      font-size: 1.5rem;
    }
    img {
      max-width: 2rem;
      margin-right: 0.5rem;
    }
    .text {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      line-height: 80%;
    }
  }
  @media screen and (max-width: 420px) {
    flex-direction: column;
    margin-bottom: 2rem;
    padding-bottom: 0;
    > div.logo {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      flex-direction: row;
      padding-bottom: 1rem;
      margin-bottom: 0;
    }
    > div {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      &.multi-btn button,
      button {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        border-right: 0;
        width: 100%;
        text-align: center;
        padding: 0.5rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
    }
    > div:nth-child(2) {
      order: 1;
    }
    > div:nth-child(1) {
      order: 2;
    }
    > div:nth-child(3) {
      order: 3;
    }
  }
`

interface HeaderProps {
  showRecipesModal: () => void
  showSettingsModal: () => void
  showDisplayModal: () => void
}

export const Header: React.FC<HeaderProps> = ({
  showRecipesModal,
  showSettingsModal,
  showDisplayModal,
}) => {
  const { fbSettings } = useSettings()
  const [user] = useAuthState(auth)

  console.log(fbSettings)

  return (
    <StyledHeader>
      <div>
        {user && (
          <button onClick={showRecipesModal}>
            <BeerGlassIcon /> Select recipes
          </button>
        )}
      </div>
      <div className="logo">
        {/* <LogoIcon /> */}
        <img src={glass} alt="MyCraftBeer" />
        <div className="text">
          <span>My</span>
          <span>Craft</span>
          <span>Beer</span>
        </div>
      </div>
      <div className="multi-btn">
        {user && (
          <>
            <button onClick={showSettingsModal}>
              <SettingsIcon />
              Settings
            </button>
            {fbSettings?.connectedDisplay && (
              <button onClick={showDisplayModal}>
                <DisplayIcon />
                Display
              </button>
            )}
            <button onClick={logout}>
              <LogoutIcon />
              Sign out
            </button>
          </>
        )}
      </div>
    </StyledHeader>
  )
}
