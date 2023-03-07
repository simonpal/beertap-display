import React from 'react'
import styled from 'styled-components'

const Svg = styled.svg``

export const Wave: React.FC = (props: any) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 150 20"
      fill="none"
      className="waves"
      {...props}
    >
      <g clipPath="url(#clip0_3_37)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M150 12.2222C120.844 12.2222 111.572 -0.0252837 73.9688 -3.11974e-05C36.4688 -3.11974e-05 27.0938 12.2222 0 12.2222V20H150C150 20 150 15.1515 150 12.2222Z"
          fill="#E1A91B"
        />
      </g>
      <defs>
        <clipPath id="clip0_3_37">
          <rect width="150" height="20" fill="white" />
        </clipPath>
      </defs>
    </Svg>
  )
}
