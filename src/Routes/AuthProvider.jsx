import React, { createContext } from 'react';
import auth from './firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';

function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const authContext = createContext();

  function login(email, password) {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      setUser(userCredential.user);
      return userCredential;
    });
  }
  const value = { user, login };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export default AuthProvider;
