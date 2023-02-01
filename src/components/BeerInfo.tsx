import React, { useMemo } from "react";
import { FullRecipe } from "../recipeModel";
import { Field } from "./FieldType";
import styled from "styled-components";
import { KeyValue } from "./recipe/KeyValue";
import StyleLimits from "./recipe/StyleLimits";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
`;
const HalfColumn = styled.div`
  width: 48%;
  justify-content: flex-start;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

interface BeerInfoProps {
  recipe: FullRecipe;
}

export const BeerInfo = ({ recipe }: BeerInfoProps) => {
  if (!recipe) return <div>No recipe</div>;

  const hops = useMemo(() => {
    const arr = [...new Set(recipe?.hops?.map((hop: any) => hop.name))];
    return arr;
  }, [recipe]);
  return (
    <div>
      <h2>{`${recipe?.name} ${recipe?.abv}% by ${recipe?.author}`}</h2>
      <Row>
        <HalfColumn>
          <KeyValue title="Batch size" value={`${recipe.batchSize}l`} />
          <KeyValue
            title="Total amount of fermentables"
            value={`${recipe?.fermentablesTotalAmount}kg`}
          />
          <KeyValue title="EBC" value={`${recipe?.color}`} />
          <KeyValue
            title="OG/FG"
            value={`${recipe?.og?.toFixed(3)} / ${recipe?.fg?.toFixed(3)}`}
          />
          <KeyValue title="IBU" value={`${recipe?.ibu}`} />
          <KeyValue title="Hops" value={hops.join(", ")} />
        </HalfColumn>
        <HalfColumn>
          <h3>
            {recipe?.style?.name && recipe?.style?.category
              ? `${recipe.style.name} - ${recipe.style.category}`
              : "Style"}
          </h3>

          {recipe?.style && (
            <>
              <StyleLimits
                title="IBU"
                value={recipe.ibu}
                min={recipe.style.ibuMin}
                max={recipe.style.ibuMax}
                padding={10}
              />
              <StyleLimits
                title="ABV"
                value={recipe.abv}
                min={recipe.style.abvMin}
                max={recipe.style.abvMax}
                padding={2}
              />
              <StyleLimits
                title="Color"
                value={recipe.color}
                min={recipe.style.colorMin}
                max={recipe.style.colorMax}
                padding={2}
              />
              <StyleLimits
                title="OG"
                value={recipe.og}
                min={recipe.style.ogMin}
                max={recipe.style.ogMax}
                padding={0.05}
              />
            </>
          )}
        </HalfColumn>
      </Row>
      {/* <h3>Fermentables</h3> */}
      <Field
        prop="Fermentables"
        value={recipe?.fermentables?.map((item) => {
          const {
            substitutes,
            notes,
            costPerAmount,
            usedIn,
            protein,
            attenuation,
            ibuPerAmount,
            diastaticPower,
            moisture,
            grainCategory,
            potential,
            inventory,
            ...rest
          } = item;
          return rest;
        })}
      />
      <Field
        prop="Hops"
        value={recipe?.hops?.map((item) => {
          const { notes, inventory, origin, ...rest } = item;
          return rest;
        })}
      />
      {/* <Row>
        <HalfColumn>
        </HalfColumn>
        <HalfColumn>
          <KeyValue title="EBC" value={`${recipe?.color}l`} />
        </HalfColumn>
      </Row> */}
      {/* {Object.entries(recipe).map((item) => {
        const [key, value] = item;
        return <Field key={key} prop={key} value={value} />;
      })} */}
    </div>
  );
};
