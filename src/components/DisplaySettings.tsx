import React, { useState } from "react"
import styled from "styled-components"
import { ModalTitle } from "./layout/ModalTitle"
import { DisplayKegForm } from "./DisplayKegForm"
import { Button } from "./layout/Button"
import DisplayIcon from "./icons/DisplayIcon"
import { useSettings } from "../utils/customHooks"
import { useGlobalState } from "../utils/globalState"

const StyledSettings = styled.div`
  width: 500px;
  max-width: 100%;
  > div {
    margin-bottom: 1rem;
  }
  input {
    width: 100%;
  }
  .center {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

const StyledFormWrapper = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  h3 {
    margin-bottom: 1rem;
  }
  input:not([type="checkbox"]) {
    margin-bottom: 1rem;
  }
`
export type FormValue = Record<string, string>
export const DisplaySettings: React.FC = () => {
  const { fbSettings } = useSettings()
  const [formData, setFormData] = useState<FormValue[]>(
    Array(fbSettings?.noKegs ?? 0).fill({})
  )

  const {
    state: { isOffline },
  } = useGlobalState()

  const setInitialValue =
    (idx: number) =>
    (obj: FormValue): void => {
      const data = [...formData]
      data[idx] = obj
      setFormData(data)
    }

  const handleChange =
    (idx: number) =>
    (key: string, val: string): void => {
      const newArr = [...formData]
      newArr[idx] = { ...formData[idx], [key]: val }
      setFormData(newArr)
    }

  const handleSave = (): void => {
    console.log(formData)
  }

  return (
    <StyledSettings>
      <ModalTitle>
        <DisplayIcon /> Display settings
      </ModalTitle>
      {fbSettings?.kegs &&
        fbSettings?.kegs.length > 0 &&
        fbSettings.kegs.map((id: string, idx: number) => (
          <StyledFormWrapper key={id}>
            <h3>Settings for keg {idx + 1}</h3>
            <DisplayKegForm
              recipeId={id}
              onChange={handleChange(idx)}
              setInitialValue={setInitialValue(idx)}
            />
          </StyledFormWrapper>
        ))}
      <div className="center">
        <Button onClick={handleSave} disabled={isOffline}>
          Save to display
        </Button>
      </div>
      {/* <div>
        <Label htmlFor="brewfatherApiKey">Brewfather api key</Label>
        <Input
          type="text"
          id="brewfaterApiKey"
          defaultValue={settings.brewfatherApiKey}
          onChange={(e) => {
            updateSettings('brewfatherApiKey', e.target.value)
          }}
        />
      </div>
      <div>
        <Label htmlFor="brewfatherApiKey">Number of kegs</Label>
        <Input
          type="number"
          id="noKegs"
          defaultValue={settings.noKegs}
          onChange={(e) => {
            updateSettings('noKegs', Number(e.target.value))
          }}
        />
      </div> */}
      {/* <div>
        <Button>
          <span>Close</span>
        </Button>
      </div> */}
    </StyledSettings>
  )
}
