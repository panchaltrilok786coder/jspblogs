import {
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { auth } from "./firebase.js";
document.getElementById("signOutBtn").addEventListener("click" , async ()=>{
  try{
  await signOut(auth);
  window.location.href("./auth.html");
  } catch(err){
   alert(err.message);
  }
})