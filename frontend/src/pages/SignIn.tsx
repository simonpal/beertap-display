import React, { useState } from "react"
import { Label } from "../components/layout/Label"
import { Input } from "../components/layout/Input"
import { Button } from "../components/layout/Button"
import { ModalTitle } from "../components/layout/ModalTitle"
import LogoIcon from "../components/icons/LogoIcon"
import { FullPageWrapper } from "../components/layout/FullPageWrapper"
import {
  FormAddition,
  InputWrapper,
  SignInForm,
} from "../components/layout/UserFormElements"
import { Link } from "react-router-dom"

import glass from "../assets/glass-icon.svg"

// const logo = require("../assets/my-beer-tap2.png")

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const handleFormChange = (key: string, val: string): void => {
    setFormData({ ...formData, [key]: val })
  }
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    console.log(formData)
  }
  return (
    <FullPageWrapper>
      <SignInForm>
        <div className="logo">
          {/* <img src={logo.default} alt="My beer tap" /> */}
          <img src={glass} alt="My beer tap" />
          MyCraftBeer
          {/* <LogoIcon /> */}
        </div>
        <ModalTitle>Sign in</ModalTitle>
        <form onSubmit={onSubmit}>
          <InputWrapper>
            <Label htmlFor="username">Username</Label>
            <Input
              placeholder="Enter your username"
              type="text"
              id="username"
              onChange={(e) => handleFormChange(e.target.id, e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="password">Password</Label>
            <Input
              placeholder="Enter your password"
              type="password"
              id="password"
              onChange={(e) => handleFormChange(e.target.id, e.target.value)}
            />
          </InputWrapper>
          <Button type="submit">Sign in</Button>
        </form>
      </SignInForm>
      <FormAddition>
        Don't have a user? <Link to="/signup">Register here</Link>
      </FormAddition>
    </FullPageWrapper>
  )
}
export default SignIn
