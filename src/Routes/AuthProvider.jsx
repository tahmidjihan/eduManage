import React, { createContext, useContext, useEffect, useState } from 'react';
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
import { useAdmin, useTeachers, useUsers } from './TanstackProvider';
import { use } from 'react';
// import { getIsUser } from './TanstackProvider';

const authContext = createContext();
export const useAuth = () => useContext(authContext);

function AuthProvider({ children }) {
  const [authError, setAuthError] = React.useState(null);
  const [user, setUser] = React.useState(undefined);
  const [refetchUser, setRefetchUser] = React.useState(0);
  // const [isUser, setIsUser] = React.useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (
        user &&
        user?.email !== null &&
        user?.displayName !== null &&
        user?.photoURL !== null
      ) {
        setUser(user);
        const newUser = {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
          phone: user?.phoneNumber,
          role: 'student',
        };
        axios
          .post('https://edumng.vercel.app/api/jwt', newUser)
          .then((res) => {
            localStorage.setItem('token', res.data.token);
          })
          .then(() => {
            axios
              .post('https://edumng.vercel.app/api/users', newUser, {
                headers: { authorization: `${localStorage.getItem('token')}` },
              })
              .then((res) => {
                setRefetchUser(refetchUser + 1);
              });
          });
      } else {
        setUser(null);
        localStorage.removeItem('token');
      }
    });
    return unsubscribe;
  }, [refetchUser, user]);
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
  function isAdmin() {
    const { user } = useAuth();
    const email = user?.email;
    const [isAdmin, setIsAdmin] = React.useState(undefined);
    const { admin, refetchAdmin } = useAdmin();
    useEffect(() => {
      refetchAdmin();
    }, [admin, refetchAdmin]);
    useEffect(() => {
      if (Array.isArray(admin)) {
        // console.log(admin);
        const check = admin.some((user) => user.email === email);
        setIsAdmin(check);
      }
    });
    // console.log(isAdmin);
    return isAdmin;
  }
  function isTeachers() {
    const { user } = useAuth();
    const email = user?.email;
    const [isTeachers, setIsTeacher] = useState();
    const { teachers, refetchTeachers } = useTeachers();
    useEffect(() => {
      refetchTeachers;
    }, [user, teachers, refetchTeachers]);
    useEffect(() => {
      if (Array.isArray(teachers)) {
        const check = teachers.some((teacher) => teacher.email === email);
        setIsTeacher(check);
      }
    });
    return isTeachers;
  }

  const value = {
    user,
    login,
    signUp,
    authError,
    loginWithGoogle,
    logout,
    isAdmin,
    isTeachers,
  };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export default AuthProvider;
