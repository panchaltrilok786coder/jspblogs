alert("Hello auth.js");
import { db , auth } from "./firebase.js";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { GoogleAuthProvider , signInWithRedirect , getRedirectResult } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc , setDoc , getDoc , serverTimestamp} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
const loginBox = document.getElementById("loginBox");
const signupBox = document.getElementById("signupBox");
const loginUser = document.getElementById("loginUser");
const loginPass = document.getElementById("loginPass");
const signupEmail = document.getElementById("signupEmail");
const signupPass = document.getElementById("signupPass");
const userName = document.getElementById("signupName");
const goSignup = document.getElementById("goSignup");
const goLogin = document.getElementById("goLogin");
const signupBtn =  document.getElementById("signupBtn");
const loginBtn =  document.getElementById("loginBtn");
const googleSignInBtn = document.getElementById("googleSignInBtn");
//Chabging LoginBox and SigninBox visibility
goSignup.addEventListener("click", ()=>{
  signupBox.classList.remove("hidden");
  loginBox.classList.add("hidden");
});

goLogin.addEventListener("click", ()=>{
  signupBox.classList.add("hidden");
  loginBox.classList.remove("hidden");
});

// ======== Signup function =======
async function signUp(email, password){
  try{
  const userCredential = await createUserWithEmailAndPassword(auth , email, password);
  if(!userCredential){
    alert("no userCredential found");
  }
  alert(userCredential);
  const user = userCredential.user
  const userSnap = await getDoc(doc(db, "users", user.uid));
  if(!userSnap.exists()){
  await setDoc(doc(db, "users", user.uid),{
    email,
    createdAt: serverTimestamp()
  });
  }
  return{success : true, userInfo :userCredential};
  } catch(err){
    alert(err.message);
    return{success : false, error : err.message};
  }
}

async function logIn(email, password){
  try{
    const userCredential = await signInWithEmailAndPassword(auth, email , password);
    return{success : true, userCredential};
  } catch(err){
    return{success : false, error : err.message};
  }
}

loginBtn.addEventListener("click" , async ()=>{
  if(loginUser.value == "" || loginPass.value ==""){
    alert("Please fil the full email and password");
    return;
  }
  const result = await logIn(loginUser.value, loginPass.value);
  if(result.success == true){
    alert("U successfully logged in");
  }else{
    alert("The email or password is lincorrect!");
  }
})

signupBtn.addEventListener("click" , async ()=>{
  if(signupEmail.value == "" || signupPass.value == ""){
    alert("Please fil the full email and password");
    return;
  }
  const result = await signUp(signupEmail.value, signupPass.value);
  if(result.success == true){
    alert("U successfully signedUp");
  }else{
    alert("The email or password is sincorrect!");
  }
});

// ================= Google Auth =================

const provider = new GoogleAuthProvider();
googleSignInBtn.addEventListener("click" , ()=>{
  signInWithRedirect(auth, provider);
})

window.addEventListener("load" , async ()=>{
    try{
      const result = await getRedirectResult(auth);
      if(result && result.user){
        console.log("The user is: " , result.user);
        const userSnap =  await getDoc(doc(db , "users", result.user.uid));
        if(!userSnap.exists()){
        await setDoc(doc(db , "users", result.user.uid), {
          email: result.user.email,
          createdAt: serverTimestamp()
        })
        }
      }
    } catch(err){
      alert("Error :" + err.message)
    }
  })