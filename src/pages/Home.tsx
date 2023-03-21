import React, { useEffect, useState } from "react"
import { Modal } from "../components/Modal"
import { Settings } from "../components/Settings"
import { RecipeSettings } from "../components/Recipes"
import { DisplaySettings } from "../components/DisplaySettings"
import AllKegs from "../components/AllKegs"
import { Header } from "../components/layout/Header"
import { useNavigate } from "react-router-dom"
import { collection, getDocs, query, where } from "firebase/firestore"
import { auth, db } from "../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { NoKegsOrSettings } from "../components/NoKegsOrSettings"
import toast from "react-hot-toast"

const Home = () => {
  const [settingsModalVisible, setSettingsModalVisible] = useState(false)
  const [recipesModalVisible, setRecipesModalVisible] = useState(false)
  const [displayModalVisible, setDisplayModalVisible] = useState(false)
  const [name, setName] = useState("")
  //   console.log(name)

  const [user, loading, error] = useAuthState(auth)
  //   console.log(user)
  const navigate = useNavigate()
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid))
      const doc = await getDocs(q)
      const data = doc.docs[0].data()
      setName(data.name)
    } catch (err) {
      console.error(err)
      toast.error("An error occured while fetching user data")
    }
  }
  useEffect(() => {
    if (loading) return
    if (!user) return navigate("/")
    fetchUserName()
  }, [user, loading])
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
        <Settings userId={user?.uid} />
      </Modal>
      <Modal
        visible={recipesModalVisible}
        onClose={() => {
          setRecipesModalVisible(false)
        }}
      >
        <RecipeSettings
          userId={user?.uid ?? ""}
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
      <NoKegsOrSettings />
      <AllKegs />
    </>
  )
}

export default Home
