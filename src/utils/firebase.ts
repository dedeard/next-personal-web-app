import { FIREBASE_CONFIG } from '@/constans/common'
import { getApp, getApps, initializeApp } from 'firebase/app'
import { GithubAuthProvider, GoogleAuthProvider, getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

export const app = getApps().length > 0 ? getApp() : initializeApp(FIREBASE_CONFIG)

export const auth = getAuth(app)

export const db = getFirestore(app)

export const getProviderById = (id: 'github.com' | 'google.com') => {
  switch (id) {
    case 'github.com':
      return new GithubAuthProvider()
    case 'google.com':
      return new GoogleAuthProvider()
  }
}
