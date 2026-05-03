import { db, auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ================= DOM =================
const loginBox = document.getElementById("loginBox");
const signupBox = document.getElementById("signupBox");

const loginUser = document.getElementById("loginUser");
const loginPass = document.getElementById("loginPass");

const signupEmail = document.getElementById("signupEmail");
const signupPass = document.getElementById("signupPass");
const userName = document.getElementById("signupName");

const goSignup = document.getElementById("goSignup");
const goLogin = document.getElementById("goLogin");

const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");
const googleSignInBtn = document.getElementById("googleSignInBtn");

// ================= UI Helpers =================
function toggleAuth(mode) {
  if (mode === "signup") {
    signupBox.classList.remove("hidden");
    loginBox.classList.add("hidden");
  } else {
    signupBox.classList.add("hidden");
    loginBox.classList.remove("hidden");
  }
}

goSignup.addEventListener("click", () => toggleAuth("signup"));
goLogin.addEventListener("click", () => toggleAuth("login"));

// ================= Firestore Helper =================
async function createUserDocIfNotExists(user, extraData = {}) {
  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    await setDoc(userRef, {
      email: user.email,
      ...extraData,
      createdAt: serverTimestamp()
    });
  }
}

// ================= Auth Functions =================
async function signUp(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await createUserDocIfNotExists(user, {
      name: userName.value
    });

    return { success: true, user: userCredential };

  } catch (err) {
    return { success: false, error: err.message };
  }
}

async function logIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential };

  } catch (err) {
    return { success: false, error: err.message };
  }
}

// ================= Event Handlers =================

// Login
loginBtn.addEventListener("click", async () => {
  if (!loginUser.value || !loginPass.value) {
    alert("Please fill email and password");
    return;
  }

  const result = await logIn(loginUser.value, loginPass.value);

  if (result.success) {
    alert("Logged in successfully");
    // window.location.href = "/dashboard.html";
  } else {
    alert(result.error);
  }
});

// Signup
signupBtn.addEventListener("click", async () => {
  if (!signupEmail.value || !signupPass.value) {
    alert("Please fill email and password");
    return;
  }

  const result = await signUp(signupEmail.value, signupPass.value);

  if (result.success) {
    alert("Signed up successfully");
    // window.location.href = "/dashboard.html";
  } else {
    alert(result.error);
  }
});

// ================= Google Auth =================
const provider = new GoogleAuthProvider();

googleSignInBtn.addEventListener("click", async () => {
  try {
    console.log("Starting redirect...");
    await signInWithRedirect(auth, provider);
  } catch (err) {
    console.error("Redirect error:", err);
    alert(err.message);
  }
});

// Handle redirect result
window.addEventListener("load", async () => {
  try {
    alert("await result");
    const result = await getRedirectResult(auth);

    if (result?.user) {
      console.log("Google user:", result.user);
      alert(" Googleuserdetails");
      await createUserDocIfNotExists(result.user);
    }
  } catch (err) {
    alert("Error: " + err.message);
  }
});

function checkAuthState(){
  onAuthStateChanged(auth , (user)=>{
    const path = window.location.pathname;
    if(!user){
      if(!path.includes("auth.html")){
      window.location.href = "./auth.html";
      return;
      }else{
         alert("U R on correct page");
         return;
      }
    }
    if(path.includes("auth.html")){
      window.location.href = "./home.html";
      alert(JSON.stringify(user, null, 2));
      return;
    }
  })
}

checkAuthState();