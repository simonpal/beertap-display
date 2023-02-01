import React from "react";
import { FullRecipe } from "../recipeModel";
import { Field } from "./FieldType";

interface BeerInfoProps {
  recipe: FullRecipe;
}

export const BeerInfo = ({ recipe }: BeerInfoProps) => {
  if (!recipe) return <div>No recipe</div>;
  return (
    <div>
      {Object.entries(recipe).map((item) => {
        const [key, value] = item;
        return <Field key={key} prop={key} value={value} />;
      })}
    </div>
  );
};
