import React, { useMemo } from "react";
import { useRecipe } from "../api";
import { Label } from "./layout/Label";
import { Input } from "./layout/Input";
import { calcFromEbc } from "../utils/colorCalc";
import { Spinner } from "./layout/Spinner";

interface KegFormProps {
  recipeId: string;
}
export const DisplayKegForm: React.FC<KegFormProps> = ({ recipeId }) => {
  console.log({ recipeId });
  const { data: recipe, isLoading } = useRecipe(recipeId);

  console.log("Recipe from form", recipe);

  const rgb = useMemo(() => calcFromEbc(recipe?.color ?? 10), [recipe]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div>
        <Label htmlFor="recipeName">Recipe name</Label>
        <Input
          type="text"
          id="recipeName"
          defaultValue={`${recipe?.name} ${
            recipe?.abv ? recipe.abv.toFixed(1) : 0
          }%`}
        />
      </div>
      <div>
        <Label htmlFor="recipeColor">Color</Label>
        <Input type="text" id="recipeColor" defaultValue={`#${rgb}`} />
      </div>
    </>
  );
};
