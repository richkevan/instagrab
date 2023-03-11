import { getFunctions, httpsCallable } from "firebase/functions"
import { app } from "./firebase-config"


const functions = getFunctions(app)

const InstaGrab = httpsCallable(functions, "instaGrab");


export {
  InstaGrab
}