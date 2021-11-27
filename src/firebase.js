
 import { initializeApp } from 'firebase/app';
 import { getFirestore, collection, getDocs,query,where,doc ,addDoc} from 'firebase/firestore';
 import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,signOut} from "firebase/auth";
  const firebaseConfig = {
    apiKey: "AIzaSyDnLxUzk00g54XnHSAkFASb_EPx1ONqGc4",
    authDomain: "msscheduler-f78f1.firebaseapp.com",
    projectId: "msscheduler-f78f1",
    storageBucket: "msscheduler-f78f1.appspot.com",
    messagingSenderId: "239433271920",
    appId: "1:239433271920:web:41bd5031197e33a7fec2b5",
    measurementId: "G-369XFHNN9L"
  };
 initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const colRef=collection(db,"users");

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle=  ()=>{
 
   signInWithPopup(auth,googleProvider)
   .then((cred)=>{
    
    getDocs(query(colRef,where("uid", "==", cred.user.uid)))
    .then((res)=>{
     
      if (res.length === 0) {
         addDoc(doc(db,"users",cred.user.uid),{
          name: cred.user.displayName,
          authProvider: "google",
          email: cred.user.email,
        });
      }
    })
   })
  
}

const SignInWithEmailAndPassword = (email, password) => {
  
  signInWithEmailAndPassword(auth,email, password)
.then((cred)=>{
  console.log('user logged in:', cred.user)
})
  
  . catch ((err) =>{
    console.error(err);
    alert(err.message);
  });
};
const registerWithEmailAndPassword = (name, email, password) => {
  
    createUserWithEmailAndPassword(auth,email, password)
    .then((cred)=>{
      collection(db,"users").add({
        uid: cred.user.uid,
        name,
        authProvider: "local",
        email,
      });
    })
     
  .catch ((err) =>{
    console.error(err);
    alert(err.message);
  })
};

const logout = () => {
  signOut(auth).then(()=>{
    alert("logged out");
  }).catch((error)=>{
    alert(error.message);
  })
  
};


export {
  auth,
  db,
  signInWithGoogle,
  SignInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout
};

