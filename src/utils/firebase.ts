import { FIREBASE_CONFIG } from '@/constans/common'
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

export const app = getApps().length > 0 ? getApp() : initializeApp(FIREBASE_CONFIG)

export const auth = getAuth(app)

export const db = getDatabase(app)

export const getProviderById = (id: 'github.com' | 'google.com') => {
  switch (id) {
    case 'github.com':
      return new GithubAuthProvider()
    case 'google.com':
      return new GoogleAuthProvider()
  }
}
