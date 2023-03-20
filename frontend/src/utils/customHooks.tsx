import { collection, doc, query, where } from "firebase/firestore"
import React, { useEffect, useMemo, useState } from "react"
import { auth, db } from "../firebase"
import {
  useFirestoreDocument,
  useFirestoreDocumentMutation,
  useFirestoreQuery,
} from "@react-query-firebase/firestore"
import toast from "react-hot-toast"
import { useAuthState } from "react-firebase-hooks/auth"
import { StorageSettings } from "../models"
import { useQueryClient } from "react-query"

const settingsAreUpdated = (
  settings?: StorageSettings,
  data?: any
): boolean => {
  return JSON.stringify(settings) !== JSON.stringify(data)
}

export const useSettings = () => {
  const [fbSettings, setFbSettings] = useState<any>()

  const [user] = useAuthState(auth)

  const ref = useMemo(
    () => (user?.uid ? doc(db, "userSettings", user.uid) : undefined),
    [user]
  )

  const { data, isLoading } = useFirestoreDocument(
    ["userSettings", { userId: user?.uid ?? "" }],
    ref,
    {},
    {
      enabled: typeof user?.uid !== "undefined" && typeof ref !== "undefined",
      staleTime: 5000,
    }
  )

  useEffect(() => {
    if (data) {
      const parsed = data.data()
      const updated = settingsAreUpdated(fbSettings, parsed)
      console.log("--- Should update? ", updated)
      if (updated) {
        setFbSettings(data.data())
      }
    }
  }, [data, fbSettings])

  return { fbSettings, fetchingSettings: isLoading }
}

export const useMutateSettings = (userId: string) => {
  const queryClient = useQueryClient()
  const ref = doc(db, "userSettings", userId)
  const mutation = useFirestoreDocumentMutation(
    ref,
    {},
    {
      onSuccess: () => {
        queryClient.invalidateQueries()
        toast.success("Saved successfully!", {
          duration: 4000,
        })
      },
      onError(error) {
        toast.error("Failed to update!")
      },
      onMutate() {
        toast("Updating...", {
          duration: 2000,
        })
      },
    }
  )

  return { mutation }
}
