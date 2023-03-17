import styled from "styled-components"
import { ITheme } from "../../App"

export const SignInForm = styled.div`
  background-color: ${({ theme }) => (theme as ITheme).colors.modalBg};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  width: 500px;
  max-width: 100%;
  margin: 1rem auto;
  h2 {
    width: 100%;
    text-align: center;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
    svg {
      font-size: 5rem;
      margin-bottom: 1rem;
    }
  }
  p {
    margin-bottom: 1rem;
    text-align: center;
  }
  button {
    margin-top: 2rem;
    width: 100%;
  }
  .logo {
    font-size: 3rem;
    font-family: "Lobster", cursive;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${({ theme }) => (theme as ITheme).colors.gradientStart};
    img {
      max-width: 4rem;
    }
  }
  .google-login {
    margin-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    button {
      margin-top: 1rem;
      display: inline-flex;
      border-radius: 0.25rem;
      height: 3rem;
      line-height: 3rem;
      align-items: center;
      font-size: 1rem;
      justify-content: center;
      font-weight: bold;
      background-color: #ea4335;
      color: #fff;
      border: 0;
      cursor: pointer;
      svg {
        margin-right: 0.5rem;
      }
    }
  }
`

export const InputWrapper = styled.div`
  margin-bottom: 1rem;
  width: 100%;
  input {
    width: 100%;
  }
`

export const FormAddition = styled.div`
  margin: 0 auto 1rem auto;
  text-align: center;
  a {
    font-weight: bold;
  }
`
