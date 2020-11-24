import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import {firebase_config} from '../config_data';





firebase.initializeApp(firebase_config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments_test = (
  collectionKey,
  objectsToAdd
) => {

  const collectionRef = firestore.collection(collectionKey);
  console.log("############");
  console.log(collectionRef);
}


export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertContentsSnapshotToMap = contents => {
  //console.log("@@@@@@@@@@@@@@2");
  

  const transformedContent = contents.docs.map(doc => {
    //console.log(doc.data());
    const { title, elements } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      elements
    };
  });
  //console.log('3333333333333333333');
  //console.log(transformedCollection);
  return transformedContent.reduce((accumulator, content) => {
    accumulator[content.title.toLowerCase()] = content;
    return accumulator;
  }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
