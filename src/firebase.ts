import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyASAgXoEi2iJwmLpSZZwTcoLHob0R4kdEY',
  authDomain: 'game-lobby-training-db0fb.firebaseapp.com',
  projectId: 'game-lobby-training-db0fb',
  storageBucket: 'game-lobby-training-db0fb.appspot.com',
  messagingSenderId: '974555358999',
  appId: '1:974555358999:web:9345336edc7f44859af952',
  measurementId: 'G-4QX0ZC1XSQ',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(app);

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    throw err;
  }
};
const registerWithEmailAndPassword = async (username, email, password) => {
  try {
    // TODO need to catch errors better
    await createUserWithEmailAndPassword(auth, email, password).catch((err) => {
      throw err;
    });
    await updateProfile(auth.currentUser, { displayName: username }).catch(
      (err) => {
        throw err;
      }
    );

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, uid: auth.currentUser.uid }),
    };

    const response = await fetch(
      'https://us-central1-game-lobby-training-db0fb.cloudfunctions.net/players/',
      requestOptions
    );

    // if (!response.ok) {
    //   throw new Error(`Error! status: ${response.status}`);
    // }

    await response.json();
  } catch (err) {
    throw err;
  }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    throw err;
  }
};
const logout = () => {
  signOut(auth);
};
export {
  auth,
  storage,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
