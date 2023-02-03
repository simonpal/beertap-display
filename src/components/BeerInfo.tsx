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

const BeerTitle = styled.h2`
  margin-bottom: 2rem !important;
  padding-bottom: 1rem;
  text-align: center;
  width: 100%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
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
      <BeerTitle>{`${recipe?.name} by ${recipe?.author}`}</BeerTitle>
      <Row>
        <HalfColumn>
          <KeyValue title="ABV" value={`${recipe.abv}%`} />
          <KeyValue title="Batch size" value={`${recipe.batchSize}l`} />
          <KeyValue
            title="Amount of fermentables"
            value={`${recipe?.fermentablesTotalAmount}kg`}
          />
          <KeyValue title="EBC" value={`${recipe?.color}`} />
          <KeyValue
            title="OG/FG"
            value={`${recipe?.og?.toFixed(3)} / ${recipe?.fg?.toFixed(3)}`}
          />
          <KeyValue title="IBU" value={`${recipe?.ibu}`} />
          <KeyValue title="Hops" value={hops.join(", ")} />
          <KeyValue
            title="Yeasts"
            value={recipe.yeasts.map((y) => y.name).join(", ")}
          />
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
                title="test"
                value={30}
                min={20}
                max={40}
                paddingUpperFactor={1.1}
                paddingLowerFactor={0.9}
              />
              <StyleLimits
                paddingUpperFactor={1.1}
                paddingLowerFactor={0.9}
                title="IBU"
                value={recipe.ibu}
                min={recipe.style.ibuMin}
                max={recipe.style.ibuMax}
              />
              {/*<StyleLimits
                title="ABV"
                value={recipe.abv}
                min={recipe.style.abvMin}
                max={recipe.style.abvMax}
              />
              <StyleLimits
                title="Color"
                value={recipe.color}
                min={recipe.style.colorMin}
                max={recipe.style.colorMax}
              />*/}
              <StyleLimits
                paddingUpperFactor={1.01}
                paddingLowerFactor={0.96}
                title="OG"
                value={recipe.og}
                min={recipe.style.ogMin}
                max={recipe.style.ogMax}
              />
              {/* <StyleLimits
                title="FG"
                value={recipe.fg}
                min={recipe.style.fgMin}
                max={recipe.style.fgMax}
              />  */}
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
            notFermentable,
            userNotes,
            potentialPercentage,
            origin,
            bestBeforeDate,
            manufacturingDate,
            hidden,
            lovibond,
            name,
            ...rest
          } = item;
          return { name, ...rest };
        })}
      />
      <Field
        prop="Hops"
        value={recipe?.hops?.map((item) => {
          const {
            notes,
            inventory,
            origin,
            name,
            usedIn,
            substitutes,
            userNotes,
            year,
            temp,
            actualTime,
            ...rest
          } = item;
          return { name, ...rest };
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
