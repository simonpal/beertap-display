import React from 'react'
import styled from 'styled-components'
import { useStorage } from '../../utils/storage'
import { BiBeer } from 'react-icons/Bi'
import { FiSettings } from 'react-icons/Fi'
import { BsDisplay } from 'react-icons/Bs'

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem;
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
      <button
        onClick={() => {
          setRecipesModalVisible(true)
        }}
      >
        <BiBeer /> Select recipes
      </button>
      <div>
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
