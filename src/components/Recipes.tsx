import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRecipes } from '../api'
import { type BaseRecipe } from '../models'
import { useStorage } from '../utils/storage'
import { Button } from './layout/Button'
import { Spinner } from './layout/Spinner'
import { BiBeer } from 'react-icons/Bi'
import { ModalTitle } from './layout/ModalTitle'
import { type ITheme } from '../App'

const StyledSettings = styled.div`
  width: 500px;
  max-width: 100%;
  > div {
    margin-bottom: 1rem;
  }
  input {
    width: 100%;
  }
  ul {
    list-style-type: none;
    text-align: left;
    padding: 0;
    margin: 0 0 1rem 0;
    width: 100%;
    li {
      padding: 0.5rem 0;
      width: 100%;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      ul {
        margin-bottom: 1.5rem;
        li {
        }
      }
      h2,
      div {
        margin-bottom: 0.25rem;
      }
      h2 {
        text-align: left;
      }
      .author,
      .style {
        opacity: 0.8;
        font-size: 0.75rem;
      }
      button {
        background-color: transparent;
        color: ${({ theme }) => (theme as ITheme).colors.text};
        border: ${({ theme }) =>
          `1px solid ${(theme as ITheme).colors.primary}`};
        font-weight: bold;
        font-size: 0.875rem;
        height: 2rem;
        transition: background-color 0.2s ease;
        &.selected {
          background-color: ${({ theme }) => (theme as ITheme).colors.primary};
          color: ${({ theme }) => (theme as ITheme).colors.text};
        }
        &:first-of-type {
          border-top-left-radius: 0.25rem;
          border-bottom-left-radius: 0.25rem;
        }
        &:last-of-type {
          border-top-right-radius: 0.25rem;
          border-bottom-right-radius: 0.25rem;
        }
      }
    }
  }
  .save-recipes {
    padding: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-top: 1rem;
    width: 100%;
    p {
      margin-bottom: 1rem;
    }
  }
`
interface RecipeSettingsProps {
  onClose: () => void
}
export const RecipeSettings: React.FC<RecipeSettingsProps> = ({ onClose }) => {
  const { settings, updateSettings = (k: string, v: any) => null } =
    useStorage()
  const [lastId, setLastId] = useState('')
  const [selectedRecipes, setSelectedRecipes] = useState(
    Array(settings.noKegs)
      .fill(null)
      .map((_, i) => settings.kegs?.[i] || null)
  )

  const { recipes, isLoading, reachedLimit } = useRecipes(lastId)
  // const categorized: { [key: string]: BaseRecipe[] } = useMemo(() => {
  //   const defaultStyle = "No category";
  //   if (data && data.length > 0) {
  //     const mapped = data.reduce((acc: any, curr: any) => {
  //       const key = curr?.style?.name || defaultStyle;
  //       acc[key] =
  //         Array.isArray(acc[key]) && acc[key].length > 0
  //           ? [...acc[key], curr]
  //           : [curr];
  //       return acc;
  //     }, {});
  //     return mapped;
  //   }
  //   return {};
  // }, [data]);
  // console.log(categorized);
  const updateSelectedRecipes = (id: string, idx: number): void => {
    const rec = [...selectedRecipes]
    const found = selectedRecipes.findIndex((item) => item === id)
    rec[idx] = id
    if (found >= 0) {
      rec[found] = null
    }
    setSelectedRecipes(rec)
  }

  const isSelected = (value: string, idx: number): boolean => {
    return selectedRecipes[idx] !== null && selectedRecipes[idx] === value
  }

  const saveRecipes = (): void => {
    updateSettings('kegs', selectedRecipes)
    onClose()
  }

  useEffect(() => {
    if (selectedRecipes.length === 0 && settings.noKegs > 0) {
      setSelectedRecipes(
        Array(settings.noKegs)
          .fill(null)
          .map((_, i) => settings.kegs?.[i] || null)
      )
    }
  }, [settings.noKegs])
  return (
    <StyledSettings>
      <ModalTitle>
        <BiBeer /> Recipes
      </ModalTitle>
      {recipes && recipes.length > 0 && (
        <ul>
          {recipes.map((rec: BaseRecipe) => (
            <li key={rec._id}>
              <h3>{rec?.name || '(No name)'}</h3>
              <div className="author">Author: {rec.author}</div>
              {rec?.style && (
                <div className="style">Style: {rec.style.name}</div>
              )}
              {selectedRecipes.map((_, idx) => (
                <button
                  key={`button-${rec._id}-${idx}`}
                  className={`${isSelected(rec._id, idx) ? 'selected' : ''}`}
                  onClick={() => {
                    updateSelectedRecipes(rec._id, idx)
                  }}
                >
                  Keg {idx + 1}
                </button>
              ))}
            </li>
          ))}
        </ul>
      )}

      {isLoading && (
        <div style={{ width: '100%' }}>
          <Spinner />
        </div>
      )}
      <Button
        outlined
        center
        onClick={() => {
          setLastId(recipes[recipes.length - 1]._id)
        }}
        disabled={reachedLimit}
      >
        {reachedLimit ? 'No more recipes' : 'Fetch more'}
      </Button>

      <div className="save-recipes">
        <p>Do you want to save these settings?</p>
        <Button
          onClick={() => {
            saveRecipes()
          }}
        >
          Save
        </Button>
      </div>
    </StyledSettings>
  )
}
