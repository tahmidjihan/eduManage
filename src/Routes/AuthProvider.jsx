import React, { createContext, useContext, useEffect } from 'react';
import auth from './firebase.config';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';

const authContext = createContext();
export const useAuth = () => useContext(authContext);

function AuthProvider({ children }) {
  const [authError, setAuthError] = React.useState(null);
  const [user, setUser] = React.useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
    return unsubscribe;
  });
  function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        return userCredential;
      })
      .catch((error) => setAuthError(error.message));
  }
  function signUp(email, password, name, image) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name,
          photoURL: image,
        }).then(() => {
          setUser(user);
        });
      })
      .catch((error) => setAuthError(error.message));
  }
  function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      const user = result.user;
      setUser(user);
    });
  }
  function logout() {
    auth.signOut().then(() => setUser(null));
  }

  const value = { user, login, signUp, authError, loginWithGoogle, logout };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export default AuthProvider;
