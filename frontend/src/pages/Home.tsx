import React, { useState } from "react"
import { Modal } from "../components/Modal"
import { Settings } from "../components/Settings"
import { RecipeSettings } from "../components/Recipes"
import { DisplaySettings } from "../components/DisplaySettings"
import AllKegs from "../components/AllKegs"
import { Header } from "../components/layout/Header"

const Home = () => {
  const [settingsModalVisible, setSettingsModalVisible] = useState(false)
  const [recipesModalVisible, setRecipesModalVisible] = useState(false)
  const [displayModalVisible, setDisplayModalVisible] = useState(false)
  return (
    <>
      <Header
        showSettingsModal={() => {
          setSettingsModalVisible(true)
        }}
        showRecipesModal={() => {
          setRecipesModalVisible(true)
        }}
        showDisplayModal={() => {
          setDisplayModalVisible(true)
        }}
      />
      <Modal
        visible={settingsModalVisible}
        onClose={() => {
          setSettingsModalVisible(false)
        }}
      >
        <Settings />
      </Modal>
      <Modal
        visible={recipesModalVisible}
        onClose={() => {
          setRecipesModalVisible(false)
        }}
      >
        <RecipeSettings
          onClose={() => {
            setRecipesModalVisible(false)
          }}
        />
      </Modal>
      <Modal
        visible={displayModalVisible}
        onClose={() => {
          setDisplayModalVisible(false)
        }}
      >
        <DisplaySettings />
      </Modal>
      <AllKegs />
    </>
  )
}

export default Home
