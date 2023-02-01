import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { useRecipes } from "../api";
import { BaseRecipe } from "../models";
import { useStorage } from "../utils/storage";
import { Button } from "./layout/Button";
import { Input } from "./layout/Input";
import { Label } from "./layout/Label";

const StyledSettings = styled.div`
  width: 500px;
  max-width: 100%;
  > div {
    margin-bottom: 1rem;
  }
  input {
    width: 100%;
  }
  h2 {
    text-align: center;
    background: ${({ theme }) => theme.colors.gradientBg};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  ul {
    list-style-type: none;
    text-align: left;
    padding: 0;
    margin: 0;
    li {
      padding: 0.5rem 0;
      ul {
        margin-bottom: 1.5rem;
        li {
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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
        opacity: 0.5;
        font-size: 0.75rem;
      }
      button {
        background-color: transparent;
        color: ${({ theme }) => theme.colors.primary};
        border: ${({ theme }) => `1px solid ${theme.colors.primary}`};
        &.selected {
          background-color: ${({ theme }) => theme.colors.primary};
          color: ${({ theme }) => theme.colors.text};
        }
      }
    }
  }
  .save-recipes {
    padding: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    p {
      margin-bottom: 1rem;
    }
  }
`;
interface RecipeSettingsProps {
  onClose: () => void;
}
export const RecipeSettings = ({ onClose }: RecipeSettingsProps) => {
  const { settings, updateSettings = (k, v) => null } = useStorage();
  const [page, setPage] = useState(0);
  const [selectedRecipes, setSelectedRecipes] = useState(
    Array(settings.noKegs)
      .fill(null)
      .map((_, i) => settings.kegs?.[i] || null)
  );

  const { data } = useRecipes(page);
  const categorized: { [key: string]: BaseRecipe[] } = useMemo(() => {
    const defaultStyle = "No category";
    if (data && data.length > 0) {
      const mapped = data.reduce((acc: any, curr: any) => {
        const key = curr?.style?.name || defaultStyle;
        acc[key] =
          Array.isArray(acc[key]) && acc[key].length > 0
            ? [...acc[key], curr]
            : [curr];
        return acc;
      }, {});
      return mapped;
    }
    return {};
  }, [data]);
  console.log(categorized);
  const updateSelectedRecipes = (id: string, idx: number) => {
    let rec = [...selectedRecipes];
    const found = selectedRecipes.findIndex((item) => item === id);
    rec[idx] = id;
    if (found >= 0) {
      rec[found] = null;
    }
    setSelectedRecipes(rec);
  };

  const isSelected = (value: string, idx: number) => {
    return selectedRecipes[idx] !== null && selectedRecipes[idx] === value;
  };

  const saveRecipes = () => {
    updateSettings("kegs", selectedRecipes);
    onClose();
  };
  return (
    <StyledSettings>
      <h2>Recipes</h2>
      {categorized && (
        <ul>
          {Object.entries(categorized).map(([key, value]) => (
            <li>
              <h2>{key}</h2>
              <ul>
                {value.map((rec) => (
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
                        onClick={() => updateSelectedRecipes(rec._id, idx)}
                      >
                        Keg {idx + 1}
                      </button>
                    ))}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
      {data && page > 0 && (
        <Button onClick={() => setPage(page - 1)}>Previous</Button>
      )}
      {data && data.length === 10 && (
        <Button onClick={() => setPage(page + 1)}>Next</Button>
      )}
      <div className="save-recipes">
        <p>Do you want to save these settings?</p>
        <Button onClick={() => saveRecipes()}>Save</Button>
      </div>
    </StyledSettings>
  );
};
