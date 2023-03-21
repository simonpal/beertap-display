import * as React from "react"
import * as ReactDOM from "react-dom"

import App from "./App"

import { BrowserRouter } from "react-router-dom"

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     loader: rootLoader,
//     children: [
//       {
//         path: "team",
//         element: <Team />,
//         loader: teamLoader,
//       },
//     ],
//   },
// ]);

const mountNode = document.getElementById("app")
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  mountNode
)

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}
