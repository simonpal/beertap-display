import React from "react"
import { IconWrapper } from "../layout/IconWrapper"

const HelpIcon: React.FC<React.HTMLAttributes<SVGElement>> = (props) => {
  return (
    <IconWrapper
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      {...props}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </IconWrapper>
  )
}

export default HelpIcon
