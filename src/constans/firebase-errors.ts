const FIREBASE_ERRORS: Record<string, string> = {
  'auth/operation-not-allowed': 'This operation is not allowed.',
  'auth/user-disabled': 'This user account has been disabled.',
  'auth/user-not-found': 'No user found with this email address.',
  'auth/wrong-password': 'The password is incorrect for the provided email.',
  'auth/email-already-in-use': 'The email address is already in use by another account.',
  'auth/invalid-email': 'The provided value for the email is invalid.',
  'auth/weak-password': 'The password must be at least six characters long.',
  'auth/account-exists-with-different-credential':
    'An account already exists with the same email address but different sign-in credentials.',
  'auth/network-request-failed': 'Network request failed. Please try again.',
  'auth/too-many-requests': 'We have blocked all requests from this device due to unusual activity. Try again later.',
  'auth/requires-recent-login': 'This operation requires recent authentication. Log in again before retrying this request.',
  'auth/credential-already-in-use': 'This credential is already associated with a different user account.',
  'auth/expired-action-code': 'The action code has expired. Please request a new one.',
  'auth/invalid-action-code': 'The action code is invalid. This can happen if the code is malformed or has already been used.',
  'auth/user-token-expired': "User's token has been expired, you need to sign In again.",
  'auth/popup-closed-by-user': 'The sign-in popup was closed by the user.',

  'auth/invalid-login-credentials': 'The provided login credentials are invalid. Please check your email and password.',
  'auth/invalid-credential': 'The supplied auth credential is malformed or has expired.',
  'auth/invalid-user-token': "The user's credential is no longer valid. The user must sign in again.",
  'auth/null-user': 'The user is null. Please authenticate again.',
  'auth/app-deleted': 'The instance of FirebaseApp was deleted.',
  'auth/unauthorized-domain': 'The domain of the current site is not authorized for OAuth operations.',
  'auth/user-mismatch': 'The supplied credentials do not correspond to the previously signed in user.',
  'auth/invalid-provider-id': 'The supplied provider ID is not supported for this operation.',
  'auth/invalid-verification-code': 'The SMS verification code used to create the phone auth credential is invalid.',
  'auth/invalid-verification-id': 'The verification ID used to create the phone auth credential is invalid.',
}

export default FIREBASE_ERRORS
