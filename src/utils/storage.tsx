import React, { createContext, useContext, useEffect, useState } from "react";

// const storage = {
// 	name: 'myStorage',
// 	read: (key: string) => { localStorage.getItem('myStorage') },
// 	write: function(key, value) { ... },
// 	each: function(fn) { ... },
// 	remove: function(key) { ... },
// 	clearAll: function() { ... }
// }

interface Recipe {
  name: string;
}

interface Keg {
  volume: number;
  recipe?: Recipe;
}

interface Settings {
  brewfatherUserId: string;
  brewfatherApiKey: string;
  noKegs: number;
  kegs: string[];
}

interface StorageProviderProps {
  settings: Settings;
  updateSettings?: (key: string, value: any) => void;
}

let initSettings = {
  brewfatherUserId: "",
  brewfatherApiKey: "",
  noKegs: 0,
  kegs: [],
};

const storageSettings = localStorage.getItem("settings");
if (storageSettings) {
  initSettings = JSON.parse(storageSettings);
}

const StorageContext = createContext<StorageProviderProps>({
  settings: initSettings,
});

export const StorageProvider: React.FC = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(initSettings);

  const updateSettings = (key: string, value: any) => {
    const settingsCopy = JSON.parse(JSON.stringify(settings));
    settingsCopy[key] = value;
    setSettings(settingsCopy);
  };
  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);
  return (
    <StorageContext.Provider value={{ settings, updateSettings }}>
      {children}
    </StorageContext.Provider>
  );
};

export const useStorage = () => useContext(StorageContext);
