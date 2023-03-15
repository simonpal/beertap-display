import React from "react"
import { useStorage } from "../utils/storage"
import Keg from "./Keg"
import { KegRow, KegWrapper } from "./layout/KegRow"
import { NoKegsOrSettings } from "./NoKegsOrSettings"

const AllKegs: React.FC = () => {
  const { settings } = useStorage()

  return (
    <>
      <NoKegsOrSettings />
      <KegRow>
        {Array(settings.noKegs)
          .fill(null)
          .map((_, i) => i)
          .map((_, i) => (
            <KegWrapper noKegs={settings.noKegs} key={`keg-${i}`}>
              <Keg
                recipeId={settings.kegs[i]}
                onClick={() => {
                  console.log(i)
                }}
              />
            </KegWrapper>
          ))}
      </KegRow>
    </>
  )
}

export default AllKegs
