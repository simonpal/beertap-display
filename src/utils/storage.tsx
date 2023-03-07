import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { type StorageSettings } from "../models";
import { isNull } from "../utils";

// const storage = {
// 	name: 'myStorage',
// 	read: (key: string) => { localStorage.getItem('myStorage') },
// 	write: function(key, value) { ... },
// 	each: function(fn) { ... },
// 	remove: function(key) { ... },
// 	clearAll: function() { ... }
// }

// interface Recipe {
//   name: string;
// }

// interface Keg {
//   volume: number
//   recipe?: Recipe
// }

interface StorageProviderProps {
  settings: StorageSettings;
  updateSettings?: (key: string, value: any) => void;
}

const baseSettings = {
  brewfatherUserId: "",
  brewfatherApiKey: "",
  noKegs: 0,
  kegs: [],
  connectedDisplay: false,
};

let initSettings = { ...baseSettings };

const storageSettings = localStorage.getItem("settings");

if (typeof storageSettings !== "undefined" && !isNull(storageSettings)) {
  initSettings = JSON.parse(storageSettings ?? "");
  console.log("after parse", initSettings);
}

const StorageContext = createContext<StorageProviderProps>({
  settings: initSettings,
});

export const StorageProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [settings, setSettings] = useState<StorageSettings>(initSettings);

  const updateSettings = (key: string, value: any): any => {
    const settingsCopy = JSON.parse(JSON.stringify(settings));
    settingsCopy[key] = value;
    setSettings(settingsCopy);
  };
  const settingsAreEmpty = useMemo(() => {
    return JSON.stringify(settings) === JSON.stringify(baseSettings);
  }, [settings, baseSettings]);
  useEffect(() => {
    if (!settingsAreEmpty) {
      localStorage.setItem("settings", JSON.stringify(settings));
    }
  }, [settings, settingsAreEmpty]);
  return (
    <StorageContext.Provider value={{ settings, updateSettings }}>
      {children}
    </StorageContext.Provider>
  );
};

export const useStorage = (): StorageProviderProps =>
  useContext(StorageContext);
