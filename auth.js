alert("Hello auth.js");
import { db , auth } from "./firebase.js";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc , setDoc , getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
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
  await setDoc(doc(db, "users", user.uid),{
    email,
    createdAt: new Date()
  });
  return{success : true, userInfo :userCredential};
  } catch(err){
    alert(err.message);
    return{success : false, error : err.message};
    alert(err.message);
  }
}

async function logIn(email, password){
  try{
    const userCredential = await signInWithEmailAndPassword(auth, email , password);
    return{success : true, userCredetial};
  } catch(err){
    return{success : false, error : err.message};
  }
}

loginBtn.addEventListener("click" , async ()=>{
  if(loginUser.value == "" || loginPass.value ==""){
    alert("Please fil the full email and password")
  }
  const result = await logIn(loginUser.value, loginPass.value);
  if(result.success == true){
    alert("U successfully logged in");
  }else{
    alert("The email or password is incorrect!");
  }
})

signupBtn.addEventListener("click" , async ()=>{
  if(!signupEmail || !signupPass){
    alert("Please fil the full email and password")
  }
  const result = await signUp(loginUser.value, loginPass.value);
  if(result.success == true){
    alert("U successfully logged in");
  }else{
    alert("The email or password is incorrect!");
  }
})
