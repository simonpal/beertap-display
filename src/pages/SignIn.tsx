import React, { useEffect, useState } from "react"
import { Label } from "../components/layout/Label"
import { Input } from "../components/layout/Input"
import { Button } from "../components/layout/Button"
import { ModalTitle } from "../components/layout/ModalTitle"
import { FullPageWrapper } from "../components/layout/FullPageWrapper"
import {
  FormAddition,
  InputWrapper,
  SignInForm,
} from "../components/layout/UserFormElements"
import { Link, useNavigate } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"

import glass from "../assets/glass-icon.svg"
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase"
import GoogleIcon from "../components/icons/GoogleIcon"
import { Spinner } from "../components/layout/Spinner"
import { ErrorBox } from "../components/layout/ErrorBox"

// const logo = require("../assets/my-beer-tap2.png")

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  //   const [loginError, setLoginError] = useState("")

  const [user, loading, error] = useAuthState(auth)
  const navigate = useNavigate()

  //   console.log({ error })

  const handleFormChange = (key: string, val: string): void => {
    setFormData({ ...formData, [key]: val })
  }
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    // console.log(formData)
    logInWithEmailAndPassword(formData.username, formData.password)
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
        <ModalTitle>Sign in</ModalTitle>
        {loading && <Spinner />}
        {!loading && error && <ErrorBox>Something went wrong.</ErrorBox>}
        <form onSubmit={onSubmit}>
          <InputWrapper>
            <Label htmlFor="username">Email</Label>
            <Input
              placeholder="Enter your email"
              type="text"
              id="username"
              disabled={loading}
              onChange={(e) => handleFormChange(e.target.id, e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="password">Password</Label>
            <Input
              placeholder="Enter your password"
              type="password"
              id="password"
              disabled={loading}
              onChange={(e) => handleFormChange(e.target.id, e.target.value)}
            />
          </InputWrapper>
          <Button type="submit" disabled={loading}>
            Sign in
          </Button>
          <div className="google-login">
            <button
              className="login__btn login__google"
              onClick={signInWithGoogle}
              disabled={loading}
            >
              <GoogleIcon />
              Login with Google
            </button>
          </div>
        </form>
      </SignInForm>
      <FormAddition>
        Don't have a user? <Link to="/signup">Register here</Link>.<br />
        Forgot your password? <Link to="/reset">Reset password</Link>
      </FormAddition>
    </FullPageWrapper>
  )
}
export default SignIn
