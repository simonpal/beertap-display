import React, { useEffect, useMemo, useState } from "react"
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
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase"
import GoogleIcon from "../components/icons/GoogleIcon"

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const [user, loading, error] = useAuthState(auth)
  const navigate = useNavigate()

  const handleFormChange = (key: string, val: string): void => {
    setFormData({ ...formData, [key]: val })
  }

  const formValid = useMemo(() => {
    return Object.values(formData).every((input) => input !== "")
  }, [formData])

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    registerWithEmailAndPassword(
      formData.name,
      formData.email,
      formData.password
    )
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
        <ModalTitle>Sign up</ModalTitle>
        <p>Create a user to add your preferences.</p>
        <form onSubmit={onSubmit}>
          <InputWrapper>
            <Label htmlFor="name">Name</Label>
            <Input
              placeholder="Enter your name"
              type="text"
              id="name"
              onChange={(e) => handleFormChange(e.target.id, e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="username">Email</Label>
            <Input
              placeholder="Enter your email"
              type="email"
              id="email"
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
          <Button type="submit" disabled={!formValid}>
            Create user
          </Button>
          <div className="google-login">
            <button
              className="register__btn register__google"
              onClick={signInWithGoogle}
            >
              <GoogleIcon />
              Register with Google
            </button>
          </div>
        </form>
      </SignInForm>
      <FormAddition>
        Already have a user? <Link to="/">Sign in</Link>
      </FormAddition>
    </FullPageWrapper>
  )
}
export default SignUp
