import React from 'react'
import styled from 'styled-components'
import { useStorage } from '../../utils/storage'
import { BiBeer } from 'react-icons/Bi'
import { FiSettings } from 'react-icons/Fi'
import { BsDisplay } from 'react-icons/Bs'
import { CiBeerMugFull } from 'react-icons/Ci'

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
    svg {
      margin-right: 0.25rem;
      font-size: 2rem;
    }
  }
`

interface HeaderProps {
  setRecipesModalVisible: (val: boolean) => void
  setSettingsModalVisible: (val: boolean) => void
  setDisplayModalVisible: (val: boolean) => void
}

export const Header: React.FC<HeaderProps> = ({
  setRecipesModalVisible,
  setSettingsModalVisible,
  setDisplayModalVisible
}) => {
  const { settings } = useStorage()

  return (
    <StyledHeader>
      <div>
        <button
          onClick={() => {
            setRecipesModalVisible(true)
          }}
        >
          <BiBeer /> Select recipes
        </button>
      </div>
      <div className="logo">
        <CiBeerMugFull />
        MyBeerTaps
      </div>
      <div className="multi-btn">
        <button
          onClick={() => {
            setSettingsModalVisible(true)
          }}
        >
          <FiSettings />
          Settings
        </button>
        {settings.connectedDisplay && (
          <button
            onClick={() => {
              setDisplayModalVisible(true)
            }}
          >
            <BsDisplay />
            Display
          </button>
        )}
      </div>
    </StyledHeader>
  )
}
