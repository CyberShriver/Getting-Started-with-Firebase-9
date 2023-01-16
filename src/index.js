import {initializeApp} from "firebase/app"
import {
 getFirestore,collection,getDoc, getDocs, addDoc, doc, deleteDoc, onSnapshot, query, where, orderBy, serverTimestamp,updateDoc
} from "firebase/firestore"
import {
    getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged
} from "firebase/auth"

// ===== configuration =================
const firebaseConfig = {
  apiKey: "AIzaSyBRfPP2aVXUpHtNfu4OoBW4G3oA5svutuM",
  authDomain: "first-project-firebase-9.firebaseapp.com",
  projectId: "first-project-firebase-9",
  storageBucket: "first-project-firebase-9.appspot.com",
  messagingSenderId: "280304492284",
  appId: "1:280304492284:web:f52c438f84087e228e0179"
};

//================ init firebase ==============

initializeApp(firebaseConfig);

//******** init service (initialize the db) *********

const db=getFirestore()
const auth=getAuth()

//*************/ get collection reference *********

const colRef=collection(db,'books')

//=========== query =======================

const q=query(colRef,orderBy("createdAt"))

//============ get data from document(collection) ============

// getDocs(colRef).then(
//     snapShot=>{
//         let books=[];
//         snapShot.docs.forEach(book=>{
//             books.push({...book.data(),id:book.id})
//         })
//         console.log(books);
//     }
// ).catch(
//     error=>{
//         console.log(error.message);
//     }
// )

// ========= get data in realtime using onSnapShot ===========

const UnsubAlldata=onSnapshot(q,(snapshot)=>{
    let books=[]
    snapshot.docs.forEach(doc=>{
        books.push({...doc.data(),id:doc.id})
    })
    console.log(books);
})

//========== get one document ===========

const colDoc=doc(db,"books","T6N3cQGEuSxj0QEnUgvU")

// ***  not real time one document ***
// getDoc(colDoc,(doc)=>{
//     console.log(doc.data(),doc.id);
// })

//**** on realtime one document *******

const unSubDat=onSnapshot(colDoc,doc=>{
    console.log(doc.data(),doc.id);
})

// add document
const addBookForm=document.querySelector(".addForm")
addBookForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    addDoc(colRef,{
        title:addBookForm.title.value,
        author:addBookForm.author.value,
        createdAt:serverTimestamp()
    }).then(
        addBookForm.reset()
    )
    
}
)

// delete document
const deletBookForm=document.querySelector(".deletForm")
deletBookForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const delDoc=doc(db,'books',deletBookForm.id.value)
    deleteDoc(delDoc).then(
       deletBookForm.reset() 
    )
}
)

// update document
const updateBookForm=document.querySelector(".updateForm")
updateBookForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const updDoc=doc(db,'books',updateBookForm.id.value)
    updateDoc(updDoc,{
        title:"book title is update"
    }).then(
       updateBookForm.reset() 
    )
}
)

// create user

const signUpForm=document.querySelector(".login")
signUpForm.addEventListener("submit",(e)=>{
    e.preventDefault()
 
    const email=signUpForm.email.value
    const password=signUpForm.password.value
 createUserWithEmailAndPassword(auth,email,password)
 .then(cred=>{
    // console.log("user created:",cred.user);
    signUpForm.reset();
 })
 .catch(err=>{
    console.log(err.message);
 })
})

// login

const LoginForm=document.querySelector(".loginUserForm")
LoginForm.addEventListener("submit",(e)=>{
    e.preventDefault()

    const email=LoginForm.email.value
    const password=LoginForm.password.value
    signInWithEmailAndPassword(auth,email,password)
        .then(cred=>{
            // console.log("user logged:",cred.user);
            LoginForm.reset()
        })
        .catch(err=>{
            console.log(err.message);
        })
})

// logout

const logout=document.querySelector(".signOut")
logout.addEventListener("click",()=>{
    signOut(auth)
    // console.log("user logged out");
})

// subscription
const UnsubAuth=onAuthStateChanged(auth,(user)=>{
 console.log("the state changed:",user);
})

// Unsubscription

const Unsubscript=document.querySelector(".Unsubscription")
Unsubscript.addEventListener("click",()=>{
    console.log("Unsubscription");
    UnsubAuth()
    UnsubAlldata()
    unSubDat()

})
