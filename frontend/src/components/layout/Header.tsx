import React from "react"
import styled from "styled-components"
import { useStorage } from "../../utils/storage"
import BeerGlassIcon from "../icons/BeerGlassIcon"
// import BeerMugFull from '../icons/BeerMugFull';
import SettingsIcon from "../icons/SettingsIcon"
import DisplayIcon from "../icons/DisplayIcon"
import LogoIcon from "../icons/LogoIcon"

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem;
  margin-bottom: 4rem;
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
    font-family: "Righteous", cursive;
    color: ${({ theme }) => theme.colors.gradientStart};
    text-align: center;
    background: ${({ theme }) => theme.colors.gradientBg};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    svg {
      margin-right: 0.5rem;
      font-size: 1.5rem;
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
  const { settings } = useStorage()

  return (
    <StyledHeader>
      <div>
        <button onClick={showRecipesModal}>
          <BeerGlassIcon /> Select recipes
        </button>
      </div>
      <div className="logo">
        <LogoIcon />
        MyBeerTaps
      </div>
      <div className="multi-btn">
        <button onClick={showSettingsModal}>
          <SettingsIcon />
          Settings
        </button>
        {settings.connectedDisplay && (
          <button onClick={showDisplayModal}>
            <DisplayIcon />
            Display
          </button>
        )}
      </div>
    </StyledHeader>
  )
}
