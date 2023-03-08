import React, { useEffect, useMemo } from 'react'
import { useRecipe } from '../api'
import { Label } from './layout/Label'
import { Input } from './layout/Input'
import { calcFromEbc } from '../utils/colorCalc'
import { Spinner } from './layout/Spinner'
import { isNull } from '../utils'
import { type FormValue } from './DisplaySettings'

interface KegFormProps {
  recipeId: string
  onChange: (key: string, val: string) => void
  setInitialValue: (obj: FormValue) => void
}
export const DisplayKegForm: React.FC<KegFormProps> = ({
  recipeId,
  onChange,
  setInitialValue
}) => {
  const { data: recipe, isLoading, error } = useRecipe(recipeId)

  const rgb = useMemo(() => calcFromEbc(recipe?.color ?? 10), [recipe])

  const recipeTitle = useMemo(() => {
    return `${recipe?.name ?? ''} ${recipe?.abv ? recipe.abv.toFixed(1) : 0}%`
  }, [recipe])

  useEffect(() => {
    if (typeof recipe !== 'undefined' && isNull(error)) {
      setInitialValue({
        recipeName: recipeTitle,
        recipeColor: `#${rgb}`
      })
    }
  }, [recipe, error])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <div>
        <Label htmlFor="recipeName">Recipe name</Label>
        <Input
          type="text"
          id="recipeName"
          defaultValue={recipeTitle}
          onChange={(e) => {
            onChange(e.target.id, e.target.value)
          }}
        />
      </div>
      <div>
        <Label htmlFor="recipeColor">Color</Label>
        <Input
          type="text"
          id="recipeColor"
          defaultValue={`#${rgb}`}
          onChange={(e) => {
            onChange(e.target.id, e.target.value)
          }}
        />
      </div>
    </>
  )
}
