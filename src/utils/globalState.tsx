import React, { createContext, useContext, useReducer } from "react"

export enum GlobalStateActionTypes {
  ToggleOffline = "TOGGLE_OFFLINE",
}

type GlobalStatePayload = {
  [GlobalStateActionTypes.ToggleOffline]: boolean
  // [Types.Delete]: {
  //   id: number;
  // }
}
type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

export type GlobalStateActions =
  ActionMap<GlobalStatePayload>[keyof ActionMap<GlobalStatePayload>]

const reducer = (state: IGlobalState, action: GlobalStateActions) => {
  switch (action.type) {
    case GlobalStateActionTypes.ToggleOffline:
      return { ...state, isOffline: action.payload }
    default:
      return state
  }
}

interface IGlobalState {
  isOffline: boolean
}

const GlobalStateContext = createContext<{
  state: IGlobalState
  dispatch: React.Dispatch<any>
}>({
  state: {
    isOffline: false,
  },
  dispatch: () => null,
})

export const GlobalStateProvider: React.FC<React.ReactNode> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    isOffline: false,
  })
  // const { todos, isLoggedIn } = state;

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  )
}

export const useGlobalState = (): {
  state: IGlobalState
  dispatch: React.Dispatch<any>
} => useContext(GlobalStateContext)
