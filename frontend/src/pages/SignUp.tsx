import React, { useState } from "react"
import { Label } from "../components/layout/Label"
import { Input } from "../components/layout/Input"
import { Button } from "../components/layout/Button"
import { ModalTitle } from "../components/layout/ModalTitle"
import LogoIcon from "../components/icons/LogoIcon"
import { FullPageWrapper } from "../components/layout/FullPageWrapper"
import { Link } from "react-router-dom"
import {
  FormAddition,
  InputWrapper,
  SignInForm,
} from "../components/layout/UserFormElements"
import glass from "../assets/glass-icon.svg"

const SignUp = () => {
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
        <ModalTitle>Sign up</ModalTitle>
        <p>Create a user to add your preferences.</p>
        <form onSubmit={onSubmit}>
          <InputWrapper>
            <Label htmlFor="username">Email</Label>
            <Input
              placeholder="Enter your email"
              type="text"
              id="username"
              onChange={(e) => handleFormChange(e.target.id, e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="password">Password</Label>
            <Input
              placeholder="Enter a password"
              type="password"
              id="password"
              onChange={(e) => handleFormChange(e.target.id, e.target.value)}
            />
          </InputWrapper>
          <Button type="submit">Create user</Button>
        </form>
      </SignInForm>
      <FormAddition>
        Already have a user? <Link to="/login">Sign in</Link>
      </FormAddition>
    </FullPageWrapper>
  )
}
export default SignUp
