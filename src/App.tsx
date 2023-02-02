import * as React from "react";
import { useState } from "react";
import { hot } from "react-hot-loader/root";
import {
  createGlobalStyle,
  DefaultTheme,
  ThemeProvider,
} from "styled-components";
import { Modal } from "./components/Modal";
import { Settings } from "./components/Settings";
import { StorageProvider } from "./utils/storage";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import AllKegs from "./components/AllKegs";
import { RecipeSettings } from "./components/Recipes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000 * 60,
    },
  },
});

export interface ITheme {
  colors: {
    pageBg: string;
    text: string;
    primary: string;
    modalBg: string;
    gradientBg: string;
    error: string;
  };
}
const theme = {
  colors: {
    pageBg: "#101018",
    text: "#FFF",
    primary: "#7A5CF5",
    modalBg: "#101018",
    gradientBg: "linear-gradient(to right, #c6426e, #642b73)",
    error: "#eb4d4b",
  },
};

interface Props {
  name: string;
}

interface GlobalStyleProps {
  theme: ITheme;
}

const GlobalStyles = createGlobalStyle<GlobalStyleProps>`
*, *::before, *::after {
  box-sizing: border-box;
}
* {
  margin: 0;
}
html, body {
  height: 100%;
}
body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  background-color: ${({ theme }) => theme.colors.pageBg};
  color: ${({ theme }) => theme.colors.text};
  font-family: 'Montserrat', sans-serif;
}
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}
input, button, textarea, select {
  font: inherit;
  color: inherit;
}
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}
#root, #__next {
  isolation: isolate;
}
header {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem;
  button {
    background: transparent;
    border: 0;
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
  }
}
`;

const App: React.FC = () => {
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [recipesModalVisible, setRecipesModalVisible] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <StorageProvider>
          <GlobalStyles />
          <header>
            <button onClick={() => setRecipesModalVisible(true)}>
              Select recipes
            </button>
            <button onClick={() => setSettingsModalVisible(true)}>
              Settings
            </button>
          </header>
          <Modal
            visible={settingsModalVisible}
            onClose={() => setSettingsModalVisible(false)}
          >
            <Settings />
          </Modal>
          <Modal
            visible={recipesModalVisible}
            onClose={() => setRecipesModalVisible(false)}
          >
            <RecipeSettings onClose={() => setRecipesModalVisible(false)} />
          </Modal>
          <AllKegs />
        </StorageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default hot(App);