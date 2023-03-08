import React, { useState } from 'react'
import styled from 'styled-components'
import { ModalTitle } from './layout/ModalTitle'
import { BsDisplay } from 'react-icons/Bs'
import { useStorage } from '../utils/storage'
import { DisplayKegForm } from './DisplayKegForm'
import { Button } from './layout/Button'
import { Label } from './layout/Label'
import { Input } from './layout/Input'

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
`
export type FormValue = Record<string, string>
export const DisplaySettings: React.FC = () => {
  const [formData, setFormData] = useState<FormValue[]>([])

  const setInitialValue =
    (idx: number) =>
      (obj: FormValue): void => {
        const data = [...formData]
        data[idx] = obj
        setFormData(data)
      }

  const { settings, updateSettings = () => null } = useStorage()

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
        <BsDisplay /> Display settings
      </ModalTitle>
      <StyledFormWrapper>
        <Label>Display API endpoint</Label>
        <Input
          type="text"
          id="displayApiEndpoint"
          defaultValue={settings.displayApiEndpoint}
          onChange={(e) => {
            updateSettings(e.target.id, e.target.value)
          }}
        />
      </StyledFormWrapper>
      {settings.kegs.map((id, idx) => (
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
        <Button onClick={handleSave}>Save to display</Button>
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
