import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCZq35BFhGREvZWwl8CSZvkoSAzaVC5QEM",
  authDomain: "selfmadeblogs.firebaseapp.com",
  projectId: "selfmadeblogs",
  storageBucket: "selfmadeblogs.firebasestorage.app",
  messagingSenderId: "1050480761860",
  appId: "1:1050480761860:web:b296ef6edb11a616fba951"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
const auth = getAuth(app);
const db = getFirestore(app);

// Export
export { auth, db };