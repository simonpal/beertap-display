import React, { useEffect, useState } from "react"
import { Label } from "../components/layout/Label"
import { Input } from "../components/layout/Input"
import { Button } from "../components/layout/Button"
import { ModalTitle } from "../components/layout/ModalTitle"
import LogoIcon from "../components/icons/LogoIcon"
import { FullPageWrapper } from "../components/layout/FullPageWrapper"
import { Link, useNavigate } from "react-router-dom"
import {
  FormAddition,
  InputWrapper,
  SignInForm,
} from "../components/layout/UserFormElements"
import glass from "../assets/glass-icon.svg"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, sendPasswordReset } from "../firebase"

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  })

  const [user, loading, error] = useAuthState(auth)
  const navigate = useNavigate()

  const handleFormChange = (key: string, val: string): void => {
    setFormData({ ...formData, [key]: val })
  }
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    sendPasswordReset(formData.email)
  }

  useEffect(() => {
    if (!loading && user) navigate("/mybeers")
  }, [user, loading])
  return (
    <FullPageWrapper>
      <SignInForm>
        <div className="logo">
          {/* <img src={logo.default} alt="My beer tap" /> */}
          <img src={glass} alt="My beer tap" />
          MyCraftBeer
          {/* <LogoIcon /> */}
        </div>
        <ModalTitle>Reset password</ModalTitle>
        <p>Instructions to reset your password will be sent to your email.</p>
        <form onSubmit={onSubmit}>
          <InputWrapper>
            <Label htmlFor="email">Email</Label>
            <Input
              placeholder="Enter your email"
              type="text"
              id="email"
              onChange={(e) => handleFormChange(e.target.id, e.target.value)}
            />
          </InputWrapper>
          <Button type="submit">Reset password</Button>
        </form>
      </SignInForm>
      <FormAddition>
        <Link to="/">Sign in</Link>
      </FormAddition>
    </FullPageWrapper>
  )
}
export default ForgotPassword
