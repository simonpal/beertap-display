import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Input } from "./layout/Input"
import { Label } from "./layout/Label"
import { ModalTitle } from "./layout/ModalTitle"
import { Checkbox } from "./layout/Checkbox"
import SettingsIcon from "./icons/SettingsIcon"
import { Button } from "./layout/Button"
import { Spinner } from "./layout/Spinner"
import { useMutateSettings, useSettings } from "../utils/customHooks"
import toast from "react-hot-toast"
import HelpIcon from "./icons/HelpIcon"
import { Modal } from "./Modal"
import { SmallText } from "./layout/SmallText"
import { useGlobalState } from "../utils/globalState"

const helpImg1 = require("../assets/brewfather-help-1.png")
const helpImg2 = require("../assets/brewfather-help-2.png")

const StyledSettings = styled.div`
  width: 500px;
  max-width: 100%;
  > div {
    margin-bottom: 1rem;
  }
  input:not([type="checkbox"]) {
    width: 100%;
  }
  p,
  h4 {
    text-align: left;
    margin-bottom: 1rem;
    img {
      margin-bottom: 1rem;
    }
  }
`

const KegLevels = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0.25rem;
  padding: 0.5rem;
  > div {
    width: 50%;
    padding: 0.5rem;
  }
`

export const Settings: React.FC<{ userId?: string }> = ({ userId }) => {
  if (!userId) return null
  const [formData, setFormData] = useState({})
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false)
  const {
    state: { isOffline },
  } = useGlobalState()

  const { fbSettings, fetchingSettings } = useSettings()
  const { mutation } = useMutateSettings(userId)

  const { mutate, error } = mutation

  // console.log(fbSettings)
  console.log(formData)

  const handleFormChange = (
    key: string,
    val: string | number | boolean | number[]
  ): void => {
    setFormData({ ...formData, [key]: val })
  }

  const onSubmit = () => {
    if (userId) {
      console.log("--- Save: ", formData)
      mutate(formData)
    } else {
      toast.error("Something went wrong")
    }
  }

  useEffect(() => {
    if (fbSettings) {
      setFormData(fbSettings)
    }
  }, [fbSettings])

  if (fetchingSettings) {
    return <Spinner />
  }

  return (
    <StyledSettings>
      <ModalTitle>
        <SettingsIcon /> Settings
      </ModalTitle>
      <div>
        <Label htmlFor="brewfatherUserId">
          Brewfather user id{" "}
          <button onClick={() => setShowHelpModal(true)}>
            <HelpIcon />
          </button>
        </Label>
        <Input
          type="text"
          id="brewfatherUserId"
          defaultValue={fbSettings?.brewfatherUserId}
          onChange={(e) => {
            handleFormChange(e.target.id, e.target.value)
          }}
        />
      </div>
      <div>
        <Label htmlFor="brewfatherApiKey">Brewfather api key</Label>
        <Input
          type="text"
          id="brewfatherApiKey"
          defaultValue={fbSettings?.brewfatherApiKey}
          onChange={(e) => {
            handleFormChange(e.target.id, e.target.value)
          }}
        />
      </div>
      <div>
        <Label htmlFor="brewfatherApiKey">Number of kegs</Label>
        <Input
          type="number"
          id="noKegs"
          defaultValue={fbSettings?.noKegs}
          onChange={(e) => {
            handleFormChange(e.target.id, Number(e.target.value))
          }}
        />
      </div>
      {fbSettings?.noKegs && fbSettings?.noKegs > 0 && (
        <>
          <Label>Manual keg level in percentage for each keg</Label>
          <KegLevels>
            {Array((formData as any)?.noKegs || 0)
              .fill(null)
              .map((_, i) => (
                <div key={`level-keg-${i}`}>
                  <Label htmlFor={`keg-level-${i}`}>Keg {i + 1}</Label>
                  <Input
                    type="number"
                    max="100"
                    min="0"
                    id={`keg-level-${i}`}
                    defaultValue={fbSettings?.kegLevel?.[i] ?? 100}
                    onChange={(e) => {
                      let arr = [...((formData as any)?.kegLevel ?? [])]
                      arr[i] = Number(e.target.value)
                      handleFormChange("kegLevel", arr)
                    }}
                  />
                </div>
              ))}
          </KegLevels>
          <SmallText>
            If you have a connected display and sensor this will be overwritten.
          </SmallText>
        </>
      )}
      <div>
        <Checkbox
          label="I have a connected display"
          defaultChecked={fbSettings?.connectedDisplay}
          id="connectedDisplay"
          // onChange={(e) => {
          //   handleFormChange(e.currentTarget.id, e.currentTarget.checked)
          // }}
          onClick={(e) => {
            handleFormChange(e.currentTarget.id, e.currentTarget.checked)
          }}
        />
      </div>
      {fbSettings?.connectedDisplay && (
        <div>
          <Label>Display API endpoint</Label>
          <Input
            type="text"
            id="displayApiEndpoint"
            defaultValue={fbSettings?.displayApiEndpoint}
            onChange={(e) => {
              handleFormChange(e.target.id, e.target.value)
            }}
          />
        </div>
      )}
      <Button onClick={onSubmit} disabled={isOffline}>
        Save settings
      </Button>
      <Modal visible={showHelpModal} onClose={() => setShowHelpModal(false)}>
        <StyledSettings>
          <ModalTitle>Help</ModalTitle>
          <h4>How to get a brewfather user id and token?</h4>
          <p>Start with signing in yo your brewfather application.</p>
          <p>Go to settings</p>
          <p>
            <img src={helpImg1.default} alt="Settings" />
          </p>
          <p>Go to Generate API key and click generate</p>
          <p>
            <img src={helpImg2.default} alt="API Key" />
          </p>
          <p>
            Generate an api key with read access to Recipes and enter the
            generated User id and API Key in the settings.
          </p>
        </StyledSettings>
      </Modal>
      {/* <div>
        <Button>
          <span>Close</span>
        </Button>
      </div> */}
    </StyledSettings>
  )
}
