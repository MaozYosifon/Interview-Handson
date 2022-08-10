import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot,
    getDoc,
    updateDoc,
} from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA5hxxa6hcO2IktwSztA34P4HFr8qDpkdc",
    authDomain: "mister-tasker-c726d.firebaseapp.com",
    projectId: "mister-tasker-c726d",
    storageBucket: "mister-tasker-c726d.appspot.com",
    messagingSenderId: "109802129383",
    appId: "1:109802129383:web:2c164090fc8e22892a5f42"
};


// Initialize Firebase
// const app = initializeApp(firebaseConfig)
initializeApp(firebaseConfig)
const db = getFirestore()
// const db = getFirestore(app)
//const colRef = collection(db, 'task')


async function query(collectionName) {
    try {
        const entitiesSnapshop = await getDocs(collection(db, collectionName))
        return entitiesSnapshop.docs.map((doc) => {
            return { _id: doc.id, ...doc.data() }
        })
    } catch (error) {
        console.log('Had an query error', error);
        throw (error)
    }
}

async function getEntityById(collectionName, id) {
    const docRef = doc(db, collectionName, id)
    try {
        const docSnap = await getDoc(docRef)
        return { _id: docSnap.id, ...docSnap.data() }
    } catch (error) {
        console.log('Had an getById error', error)
        throw (error)
    }
}

async function removeEntity(collectionName, id) {
    const docRef = doc(db, collectionName, id)
    try {
        deleteDoc(docRef)
        console.log('Entity removed successfully')
    } catch (error) {
        console.log('Had an removeEntity error', error)
        throw (error)
    }
}

async function saveEntity(collectionName, entity) {
    if (entity._id) {
        try {
            const docRef = doc(db, collectionName, entity._id)
            const tempId = entity._id
            delete entity._id
            await updateDoc(docRef, entity)
            return { _id: tempId, ...entity }
        } catch (error) {
            console.log('Had an updateEntity error', error)
            throw (error)
        }
    } else {
        try {
            const res = await addDoc(collection(db, collectionName), entity)
            const resEntity = await getEntityById(collectionName,res.id)
            return resEntity
        } catch (error) {
            console.log('Had an addEntity error', error)
            throw (error)
        }
    }
}

// function getEmptyEntity() {
//     return {
//         title: '',
//         description: '',
//         importance: 1,
//         createdAt: Date.now(),
//         doneAt: null,
//         status: 'New'
//     }
// }

export const fireBaseService = {
    query,
    getEntityById,
    removeEntity,
    saveEntity,
    // getEmptyEntity
}