import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  sendPasswordResetEmail,
  sendEmailVerification,
  signInWithPopup,
  updateProfile,
  UserCredential
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

// Check if we're using demo Firebase configuration
const isDemoMode = !import.meta.env.VITE_FIREBASE_API_KEY;

type AuthContextType = {
  currentUser: User | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<User>;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  verifyEmail: () => Promise<void>;
  googleSignIn: () => Promise<User>;
  updateUserProfile: (displayName: string) => Promise<void>;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  function signup(email: string, password: string) {
    if (isDemoMode) {
      console.log('Demo mode: Creating mock user with email:', email);
      // Create a mock user for demo mode
      const mockUser = {
        uid: 'demo-user-' + Date.now(),
        email: email,
        emailVerified: true,
        displayName: email.split('@')[0],
        isAnonymous: false,
        metadata: {},
        providerData: [],
        refreshToken: '',
        tenantId: null,
        delete: () => Promise.resolve(),
        getIdToken: () => Promise.resolve('mock-token'),
        getIdTokenResult: () => Promise.resolve({ token: 'mock-token', claims: {}, expirationTime: '', authTime: '', issuedAtTime: '', signInProvider: null, signInSecondFactor: null }),
        reload: () => Promise.resolve(),
        toJSON: () => ({})
      } as unknown as User;
      
      // Simulate a delay for authentication
      return new Promise<User>(resolve => {
        setTimeout(() => {
          setCurrentUser(mockUser);
          resolve(mockUser);
        }, 500);
      });
    }
    
    return createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // Send email verification
        sendEmailVerification(result.user);
        return result.user;
      });
  }

  function login(email: string, password: string) {
    if (isDemoMode) {
      console.log('Demo mode: Logging in with mock user:', email);
      // Create a mock user for demo mode
      const mockUser = {
        uid: 'demo-user-' + Date.now(),
        email: email,
        emailVerified: true,
        displayName: email.split('@')[0],
        isAnonymous: false,
        metadata: {},
        providerData: [],
        refreshToken: '',
        tenantId: null,
        delete: () => Promise.resolve(),
        getIdToken: () => Promise.resolve('mock-token'),
        getIdTokenResult: () => Promise.resolve({ token: 'mock-token', claims: {}, expirationTime: '', authTime: '', issuedAtTime: '', signInProvider: null, signInSecondFactor: null }),
        reload: () => Promise.resolve(),
        toJSON: () => ({})
      } as unknown as User;
      
      // Simulate a delay for authentication
      return new Promise<User>(resolve => {
        setTimeout(() => {
          setCurrentUser(mockUser);
          // Set admin status if email ends with @allin-production.com
          setIsAdmin(email.endsWith('@allin-production.com'));
          resolve(mockUser);
        }, 500);
      });
    }
    
    return signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        return result.user;
      });
  }

  function logout() {
    if (isDemoMode) {
      console.log('Demo mode: Logging out mock user');
      return new Promise<void>(resolve => {
        setTimeout(() => {
          setCurrentUser(null);
          setIsAdmin(false);
          resolve();
        }, 500);
      });
    }
    
    return signOut(auth);
  }

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  function verifyEmail() {
    if (currentUser) {
      return sendEmailVerification(currentUser);
    }
    return Promise.reject('No user logged in');
  }

  function googleSignIn() {
    if (isDemoMode) {
      console.log('Demo mode: Google sign-in with mock user');
      // Create a mock user for demo mode with Google provider
      const mockUser = {
        uid: 'demo-google-user-' + Date.now(),
        email: 'demo.user@gmail.com',
        emailVerified: true,
        displayName: 'Demo Google User',
        isAnonymous: false,
        metadata: {},
        providerData: [{ providerId: 'google.com' }],
        refreshToken: '',
        tenantId: null,
        delete: () => Promise.resolve(),
        getIdToken: () => Promise.resolve('mock-token'),
        getIdTokenResult: () => Promise.resolve({ token: 'mock-token', claims: {}, expirationTime: '', authTime: '', issuedAtTime: '', signInProvider: 'google.com', signInSecondFactor: null }),
        reload: () => Promise.resolve(),
        toJSON: () => ({})
      } as unknown as User;
      
      // Simulate a delay for authentication
      return new Promise<User>(resolve => {
        setTimeout(() => {
          setCurrentUser(mockUser);
          setIsAdmin(false); // Google users are not admins by default
          resolve(mockUser);
        }, 500);
      });
    }
    
    return signInWithPopup(auth, googleProvider)
      .then((result) => {
        return result.user;
      });
  }

  function updateUserProfile(displayName: string) {
    if (currentUser) {
      return updateProfile(currentUser, { displayName });
    }
    return Promise.reject('No user logged in');
  }

  useEffect(() => {
    if (isDemoMode) {
      console.log('Demo mode: Skipping auth state listener');
      // In demo mode, we don't need to listen for auth state changes
      // as we're managing the state manually
      setLoading(false);
      return () => {};
    }
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      
      // Check if user is admin (email ends with @allin-production.com)
      if (user && user.email) {
        setIsAdmin(user.email.endsWith('@allin-production.com'));
      } else {
        setIsAdmin(false);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    signup,
    login,
    logout,
    resetPassword,
    verifyEmail,
    googleSignIn,
    updateUserProfile,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}