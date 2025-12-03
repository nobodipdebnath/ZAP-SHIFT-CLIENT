import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../../Firebase/firebase.init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const provider = new GoogleAuthProvider();

    const createAccount = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const emailVerify = () => {
        setLoading(true);
        return sendEmailVerification(auth.currentUser);
    }

    const passwordReset = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    }

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const logOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            unSubscribe();
        }
    }, [])

    const userData = {
        createAccount,
        loading,
        user,
        logInUser,
        logOutUser,
        emailVerify,
        passwordReset,
        signInWithGoogle
    }

    return (
        <AuthContext.Provider value={userData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;