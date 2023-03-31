import React, { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { useRecipes } from "../api"
import { type BaseRecipe } from "../models"
import { Button } from "./layout/Button"
import { Spinner } from "./layout/Spinner"
import { ModalTitle } from "./layout/ModalTitle"
import { type ITheme } from "../App"
import { FilterButton } from "./layout/FilterButton"
import BeerGlassIcon from "./icons/BeerGlassIcon"
import { useMutateSettings, useSettings } from "../utils/customHooks"
import { useGlobalState } from "../utils/globalState"

const StyledSettings = styled.div`
  width: 600px;
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

const FilterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`
interface RecipeSettingsProps {
  onClose: () => void
  userId: string
}
interface StyleFilter {
  name: string
  count: number
}
export const RecipeSettings: React.FC<RecipeSettingsProps> = ({
  onClose,
  userId,
}) => {
  if (!userId) return null
  const { fbSettings } = useSettings()
  const { mutation } = useMutateSettings(userId)
  const [lastId, setLastId] = useState("")
  const [filters, setFilters] = useState<string[]>([])
  const [selectedRecipes, setSelectedRecipes] = useState(
    Array(fbSettings?.noKegs ?? 0)
      .fill(null)
      .map((_, i) => fbSettings?.kegs?.[i] ?? null)
  )

  const {
    state: { isOffline },
  } = useGlobalState()

  const { recipes, isLoading, reachedLimit } = useRecipes(lastId, userId)

  const { mutate } = mutation

  const parsedRecipes = useMemo(() => {
    return recipes.map((rec) =>
      rec?.style?.name ? rec : { ...rec, style: { name: "Uncategorized" } }
    )
  }, [recipes])

  const availableFilters = useMemo(() => {
    return parsedRecipes.reduce(
      (allFilters: StyleFilter[], currentRecipe: BaseRecipe) => {
        const foundIdx = allFilters.findIndex(
          (filt) => filt.name === currentRecipe.style.name
        )
        if (foundIdx > -1) {
          const newArr = [...allFilters]
          const obj: StyleFilter = {
            ...allFilters[foundIdx],
            count: allFilters[foundIdx].count + 1,
          }
          newArr[foundIdx] = obj
          return newArr
        } else {
          return [...allFilters, { name: currentRecipe.style.name, count: 1 }]
        }
      },
      []
    )
  }, [parsedRecipes])

  const handleSelectedFilters: (rec: BaseRecipe) => boolean = (
    rec: BaseRecipe
  ) => {
    if (filters.length === 0) return true
    return filters.includes(rec?.style?.name)
  }

  const updateSelectedRecipes = (id: string, idx: number): void => {
    const rec = [...selectedRecipes]
    const found = selectedRecipes.findIndex((item) => item === id)
    rec[idx] = id
    if (found >= 0) {
      rec[found] = null
    }
    setSelectedRecipes(rec)
  }

  const handleFilterSelection: (name: string) => void = (name: string) => {
    if (filters.includes(name)) {
      setFilters([...filters.filter((filt) => filt !== name)])
    } else {
      setFilters([...filters, name])
    }
  }

  const isSelected = (value: string, idx: number): boolean => {
    return selectedRecipes[idx] !== null && selectedRecipes[idx] === value
  }

  const saveRecipes = (): void => {
    const newObj = { ...fbSettings, kegs: selectedRecipes }
    mutate(newObj)
    //updateSettings('kegs', selectedRecipes);
    onClose()
  }

  useEffect(() => {
    if (selectedRecipes.length === 0 && fbSettings?.noKegs > 0) {
      setSelectedRecipes(
        Array(fbSettings?.noKegs ?? 0)
          .fill(null)
          .map((_, i) => fbSettings?.kegs?.[i] ?? null)
      )
    }
  }, [fbSettings])
  return (
    <StyledSettings>
      <ModalTitle>
        <BeerGlassIcon /> Recipes
      </ModalTitle>
      {recipes && recipes.length > 0 && (
        <>
          {availableFilters.length > 0 && (
            <>
              <h4>Filter by style</h4>
              <FilterWrapper>
                {availableFilters.map((filt) => (
                  <FilterButton
                    selected={filters.includes(filt.name)}
                    key={filt.name}
                    onClick={() => {
                      handleFilterSelection(filt.name)
                    }}
                  >
                    {filt.name} ({filt.count})
                  </FilterButton>
                ))}
              </FilterWrapper>
            </>
          )}
          <ul>
            {parsedRecipes
              .filter(handleSelectedFilters)
              .map((rec: BaseRecipe) => (
                <li key={rec._id}>
                  <h3>{rec?.name || "(No name)"}</h3>
                  <div className="author">Author: {rec.author}</div>
                  {rec?.style && (
                    <div className="style">Style: {rec.style.name}</div>
                  )}
                  {selectedRecipes.map((_, idx) => (
                    <button
                      key={`button-${rec._id}-${idx}`}
                      className={`${
                        isSelected(rec._id, idx) ? "selected" : ""
                      }`}
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
        </>
      )}

      {isLoading && (
        <div style={{ width: "100%" }}>
          <Spinner />
        </div>
      )}
      <Button
        outlined
        center
        onClick={() => {
          setLastId(recipes[recipes.length - 1]._id)
        }}
        disabled={reachedLimit || isOffline}
      >
        {reachedLimit ? "No more recipes" : "Fetch more"}
      </Button>

      <div className="save-recipes">
        <p>Do you want to save these settings?</p>
        <Button
          disabled={isOffline}
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
