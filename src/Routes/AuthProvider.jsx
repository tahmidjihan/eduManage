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
import axios from 'axios';
import { useIsUser } from './TanstackProvider';

const authContext = createContext();
export const useAuth = () => useContext(authContext);

function AuthProvider({ children }) {
  const [authError, setAuthError] = React.useState(null);
  const [user, setUser] = React.useState(undefined);
  const [refetchUser, setRefetchUser] = React.useState(0);
  const isUser = useIsUser(user?.email);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        // console.log(user);
        const isUserRes = await isUser.refetch(user.email);
        const newUser = {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
          phone: user.phoneNumber,
          role: 'student',
        };
        if (isUserRes.data?.isUser === false) {
          axios.post('http://localhost:3000/api/users', newUser);
          // console.log(isUserRes);
        } else {
          //log user in
        }
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, [refetchUser]);
  function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        return userCredential;
      })
      .then(() => setRefetchUser(refetchUser + 1))
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
      .then(() => setRefetchUser(refetchUser + 1))
      .catch((error) => setAuthError(error.message));
  }
  function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .then(() => setRefetchUser(refetchUser + 1))
      .catch((error) => setAuthError(error.message));
  }
  function logout() {
    auth.signOut().then(() => {
      // setUser(null);
      setRefetchUser(refetchUser + 1);
    });
  }

  const value = { user, login, signUp, authError, loginWithGoogle, logout };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export default AuthProvider;
