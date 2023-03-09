import React, { useMemo } from "react";
import { type Fermentable, type FullRecipe, type Hop } from "../recipeModel";
import { Field } from "./FieldType";
import styled from "styled-components";
import { KeyValue } from "./recipe/KeyValue";
import StyleLimits from "./recipe/StyleLimits";
import { formatObject } from "../utils";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  @media screen and (max-width: 420px) {
    flex-direction: column;
  }
`;
const HalfColumn = styled.div`
  width: 48%;
  justify-content: flex-start;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media screen and (max-width: 420px) {
    width: 100%;
    margin-bottom: 2rem;
  }
`;

const BeerTitle = styled.h2`
  margin-bottom: 2rem !important;
  padding-bottom: 1rem;
  text-align: center;
  width: 100%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const StyledImage = styled.img`
  max-width: 50%;
  border-radius: 1rem;
  margin: 0 auto 2rem auto;
  @media screen and (max-width: 420px) {
    max-width: 70%;
  }
`;
interface BeerInfoProps {
  recipe: FullRecipe;
}

export const BeerInfo: React.FC<BeerInfoProps> = ({ recipe }) => {
  if (!recipe) return <div>No recipe</div>;

  const hops = useMemo(() => {
    const arr = [...new Set(recipe?.hops?.map((hop: Hop) => hop.name))];
    return arr;
  }, [recipe]);
  return (
    <div>
      <BeerTitle>{`${recipe?.name} by ${recipe?.author}`}</BeerTitle>
      {recipe?.img_url && (
        <StyledImage src={recipe.img_url} alt={`${recipe?.name || ""}`} />
      )}
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
            value={(recipe?.yeasts || []).map((y) => y.name).join(", ")}
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
              {/* <StyleLimits
                title="test"
                value={30}
                min={20}
                max={40}
                paddingUpperFactor={1.1}
                paddingLowerFactor={0.9}
              /> */}
              <StyleLimits
                paddingUpperFactor={1.1}
                paddingLowerFactor={0.9}
                title="IBU"
                value={recipe.ibu}
                min={recipe.style.ibuMin}
                max={recipe.style.ibuMax}
              />
              <StyleLimits
                paddingUpperFactor={1.05}
                paddingLowerFactor={0.95}
                title="ABV"
                value={recipe.abv}
                min={recipe.style.abvMin}
                max={recipe.style.abvMax}
              />
              <StyleLimits
                paddingUpperFactor={1.1}
                paddingLowerFactor={0.9}
                title="Color"
                value={recipe.color}
                min={recipe.style.colorMin}
                max={recipe.style.colorMax}
              />
              <StyleLimits
                paddingUpperFactor={1.001}
                paddingLowerFactor={0.999}
                title="OG"
                value={recipe.og}
                min={recipe.style.ogMin}
                max={recipe.style.ogMax}
              />

              <StyleLimits
                paddingUpperFactor={1.001}
                paddingLowerFactor={0.999}
                title="FG"
                value={recipe.fg}
                min={recipe.style.fgMin}
                max={recipe.style.fgMax}
              />
            </>
          )}
        </HalfColumn>
      </Row>
      {/* <h3>Fermentables</h3> */}
      <Field
        prop="Fermentables"
        value={recipe?.fermentables?.map((item) => {
          const { name: fermentable } = item;
          const formatted = formatObject<Fermentable>(item, [
            "substitutes",
            "notes",
            "costPerAmount",
            "usedIn",
            "protein",
            "attenuation",
            "ibuPerAmount",
            "diastaticPower",
            "moisture",
            "grainCategory",
            "potential",
            "inventory",
            "notFermentable",
            "userNotes",
            "potentialPercentage",
            "origin",
            "bestBeforeDate",
            "manufacturingDate",
            "hidden",
            "lovibond",
            "name",
            "fgdb",
            "acid",
            "cgdb",
            "maxInBatch",
            "friability",
            "coarseFineDiff",
            "fan",
          ]);
          return { fermentable, ...formatted };
        })}
      />
      <Field
        prop="Hops"
        value={recipe?.hops?.map((item) => {
          const { name: hop } = item;
          const formatted = formatObject<Hop>(item, [
            "notes",
            "inventory",
            "origin",
            "name",
            "usedIn",
            "substitutes",
            "userNotes",
            "year",
            "temp",
            "actualTime",
            "beta",
            "manufacturingDate",
            "oil",
            "bestBeforeDate",
            "farnesene",
            "humulene",
            "cohumulone",
            "hsi",
            "caryophyllene",
            "myrcene",
          ]);
          return { hop, ...formatted };
        })}
      />
    </div>
  );
};
