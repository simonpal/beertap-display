import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useRecipes } from "../api";
import { type BaseRecipe } from "../models";
import { useStorage } from "../utils/storage";
import { Button } from "./layout/Button";
import { Spinner } from "./layout/Spinner";
import { BiBeer } from "react-icons/Bi";
import { ModalTitle } from "./layout/ModalTitle";
import { type ITheme } from "../App";
import { FilterButton } from "./layout/FilterButton";

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
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;
interface RecipeSettingsProps {
  onClose: () => void;
}
interface StyleFilter {
  name: string;
  count: number;
}
export const RecipeSettings: React.FC<RecipeSettingsProps> = ({ onClose }) => {
  const { settings, updateSettings = (k: string, v: any) => null } =
    useStorage();
  const [lastId, setLastId] = useState("");
  const [filters, setFilters] = useState<string[]>([]);
  const [selectedRecipes, setSelectedRecipes] = useState(
    Array(settings.noKegs)
      .fill(null)
      .map((_, i) => settings.kegs?.[i] || null)
  );

  const { recipes, isLoading, reachedLimit } = useRecipes(lastId);

  const availableFilters = useMemo(() => {
    return recipes.reduce(
      (allFilters: StyleFilter[], currentRecipe: BaseRecipe) => {
        if (currentRecipe?.style?.name) {
          const foundIdx = allFilters.findIndex(
            (filt) => filt.name === currentRecipe.style.name
          );
          if (foundIdx > -1) {
            let newArr = [...allFilters];
            newArr[foundIdx] = {
              name: allFilters[foundIdx].name,
              count: allFilters[foundIdx].count + 1,
            } as StyleFilter;
            return newArr;
          } else {
            return [
              ...allFilters,
              { name: currentRecipe.style.name, count: 1 },
            ];
          }
        }
        return allFilters;
        // if (currentRecipe?.style?.name) {
        //   return [...new Set([...allFilters, currentRecipe.style.name])];
        // }
        // return allFilters;
      },
      []
    );
  }, [recipes]);

  const handleSelectedFilters = (rec: BaseRecipe) => {
    if (filters.length === 0) return true;
    return filters.includes(rec?.style?.name);
  };

  const updateSelectedRecipes = (id: string, idx: number): void => {
    const rec = [...selectedRecipes];
    const found = selectedRecipes.findIndex((item) => item === id);
    rec[idx] = id;
    if (found >= 0) {
      rec[found] = null;
    }
    setSelectedRecipes(rec);
  };

  const handleFilterSelection = (name: string) => {
    if (filters.includes(name)) {
      setFilters([...filters.filter((filt) => filt !== name)]);
    } else {
      setFilters([...filters, name]);
    }
  };

  const isSelected = (value: string, idx: number): boolean => {
    return selectedRecipes[idx] !== null && selectedRecipes[idx] === value;
  };

  const saveRecipes = (): void => {
    updateSettings("kegs", selectedRecipes);
    onClose();
  };

  useEffect(() => {
    if (selectedRecipes.length === 0 && settings.noKegs > 0) {
      setSelectedRecipes(
        Array(settings.noKegs)
          .fill(null)
          .map((_, i) => settings.kegs?.[i] || null)
      );
    }
  }, [settings.noKegs]);
  return (
    <StyledSettings>
      <ModalTitle>
        <BiBeer /> Recipes
      </ModalTitle>
      {recipes && recipes.length > 0 && (
        <>
          {availableFilters.length > 0 && (
            <>
              <h4>Filters</h4>
              <FilterWrapper>
                {availableFilters &&
                  availableFilters.map((filt) => (
                    <FilterButton
                      selected={filters.includes(filt.name)}
                      key={filt.name}
                      onClick={() => handleFilterSelection(filt.name)}
                    >
                      {filt.name} ({filt.count})
                    </FilterButton>
                  ))}
              </FilterWrapper>
            </>
          )}
          <ul>
            {recipes.filter(handleSelectedFilters).map((rec: BaseRecipe) => (
              <li key={rec._id}>
                <h3>{rec?.name || "(No name)"}</h3>
                <div className="author">Author: {rec.author}</div>
                {rec?.style && (
                  <div className="style">Style: {rec.style.name}</div>
                )}
                {selectedRecipes.map((_, idx) => (
                  <button
                    key={`button-${rec._id}-${idx}`}
                    className={`${isSelected(rec._id, idx) ? "selected" : ""}`}
                    onClick={() => {
                      updateSelectedRecipes(rec._id, idx);
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
          setLastId(recipes[recipes.length - 1]._id);
        }}
        disabled={reachedLimit}
      >
        {reachedLimit ? "No more recipes" : "Fetch more"}
      </Button>

      <div className="save-recipes">
        <p>Do you want to save these settings?</p>
        <Button
          onClick={() => {
            saveRecipes();
          }}
        >
          Save
        </Button>
      </div>
    </StyledSettings>
  );
};
