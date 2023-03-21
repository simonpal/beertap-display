// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth"
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore"
import { StorageSettings } from "./models"
import toast from "react-hot-toast"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY, // "AIzaSyC04S9AYB5xThCdxWkWK5VL8zg2cMqIyHE",
  authDomain: "mycraftbeer-8eec7.firebaseapp.com",
  projectId: "mycraftbeer-8eec7",
  storageBucket: "mycraftbeer-8eec7.appspot.com",
  messagingSenderId: process.env.FIREBASE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

// AUTHENTICATION
const googleProvider = new GoogleAuthProvider()

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider)
    const user = res.user
    const q = query(collection(db, "users"), where("uid", "==", user.uid))
    const docs = await getDocs(q)
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      })
    }
  } catch (err: unknown) {
    console.error(err)
    toast.error((err as Error).message)
  }
}

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (err) {
    console.error(err)
    toast.error((err as Error).message)
  }
}

const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    })
  } catch (err) {
    console.error(err)
    toast.error((err as Error).message)
  }
}

const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email)
    toast.success("Password reset link sent!")
  } catch (err) {
    console.error(err)
    toast.error((err as Error).message)
  }
}

const logout = () => {
  signOut(auth)
}

// const updateSettings = async (settings: StorageSettings, userId: string) => {
//   try {
//     // const res = await createUserWithEmailAndPassword(auth, email, password)
//     //const user = res.user
//     await addDoc(collection(db, "usersettings"), {
//       userRef: userId,
//       ...settings,
//     })
//   } catch (err) {
//     console.error(err)
//     alert((err as Error).message)
//   }
// }

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
}
