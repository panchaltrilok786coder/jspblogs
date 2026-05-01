import { db , auth } from "./firebase.js";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc , setDoc , getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const loginBox = document.getElementById("loginBox");
const sugnupBox = document.getElementById("signupBox");
const loginUser = document.getElementById("loginUser");
const loginPass = document.getElementById("loginPass");
const signupEmail = document.getElementById("signupEmail");
const signupPass = document.getElementById("signupPass");
const userName = document.getElementById("signupName");
const signupPass = document.getElementById("signupPass");
const signupPass = document.getElementById("signupPass");
