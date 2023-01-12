import {initializeApp} from "firebase/app"
import {
 getFirestore,collection,getDoc, getDocs
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBRfPP2aVXUpHtNfu4OoBW4G3oA5svutuM",
  authDomain: "first-project-firebase-9.firebaseapp.com",
  projectId: "first-project-firebase-9",
  storageBucket: "first-project-firebase-9.appspot.com",
  messagingSenderId: "280304492284",
  appId: "1:280304492284:web:f52c438f84087e228e0179"
};

// init firebase
initializeApp(firebaseConfig);

// init service (initialize the db)

const db=getFirestore()

// get collection reference

const colRef=collection(db,'books')

// get data from document(collection)

getDocs(colRef).then(
    snapShot=>{
        let books=[];
        snapShot.docs.forEach(book=>{
            books.push({...book.data(),id:book.id})
        })
        console.log(books);
    }
).catch(
    error=>{
        console.log(error.message);
    }
)
