import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { baseSettings } from "../utils/storage"
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

export const Settings: React.FC<{ userId?: string }> = ({ userId }) => {
  if (!userId) return null
  const [formData, setFormData] = useState({})
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false)

  const { fbSettings, fetchingSettings } = useSettings()
  const { mutation } = useMutateSettings(userId)

  const { mutate, error } = mutation

  // console.log(fbSettings)
  // console.log(formData)

  const handleFormChange = (
    key: string,
    val: string | number | boolean
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
      <Button onClick={onSubmit}>Save settings</Button>
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
