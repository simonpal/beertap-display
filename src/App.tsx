import * as React from "react"
import { hot } from "react-hot-loader/root"
import { createGlobalStyle, ThemeProvider } from "styled-components"
import { GlobalStateProvider } from "./utils/globalState"
import { QueryClient, QueryClientProvider } from "react-query"
import { Detector } from "react-detect-offline"
import { OfflineOverlay } from "./components/OfflineOverlay"
import { Outlet, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import NoMatch from "./pages/NoMatch"
import ForgotPassword from "./pages/ForgotPassword"
import { Toaster } from "react-hot-toast"

const appBg = require("./assets/appbg-3.jpeg")

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000 * 60,
    },
  },
})

export interface ITheme {
  colors: {
    pageBg: string
    text: string
    primary: string
    modalBg: string
    gradientBg: string
    gradientStart: string
    error: string
  }
}
const theme = {
  colors: {
    pageBg: "#101018",
    text: "#FFF",
    primary: "#7A5CF5",
    modalBg: "#101018",
    gradientStart: "#c6426e",
    gradientBg: "linear-gradient(to right, #c6426e, #642b73)",
    error: "#eb4d4b",
  },
}

interface GlobalStyleProps {
  theme: ITheme
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
a {
    color: ${({ theme }) => (theme as ITheme).colors.text};
}
#root, #__next {
  isolation: isolate;
}
#app {
  min-height: 100%;
  &:after {
  content: "";
  background-image: url(${appBg.default});
  background-size: cover;
  background-position: center center;
  opacity: 0.3;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: fixed;
  z-index: -1;   
}
}
header {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem;
  button {
    background: transparent;
    display: inline-flex;
    align-items: center;
    border: 0;
    font-weight: bold;
    cursor: pointer;
    svg {
      margin-right: 0.75rem;
      transition: transform 0.15s ease;
    }
    &:hover {
      svg {
        transform: scale(1.1);
      }
    }
  }
  
}
`

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStateProvider>
          <GlobalStyles />

          <Detector
            render={({ online }) => <OfflineOverlay offline={!online} />}
          />
          <Toaster
            toastOptions={{
              className: "",
              style: {
                border: "1px solid rgba(255,255,255,0.1)",
                padding: "1rem",
                color: "#fff",
                backgroundColor: theme.colors.modalBg,
              },
            }}
          />
          <Routes>
            <Route path="/" element={<Outlet />}>
              <Route index element={<SignIn />} />
              <Route path="mybeers" element={<Home />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="reset" element={<ForgotPassword />} />

              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
        </GlobalStateProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default hot(App)
