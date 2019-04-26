export enum UserRecordStatuses {
  active = "active",
  deleted = "deleted",
  pendingVerification = "pending verification"
}

export enum UserTypes {
  admin = "admin",
  public = "public"
}

export enum AccountTypes {
  Individual = 1,
  Business = 2
}
export enum AuthTokenTypes {
  accessToken = "access_token",
  refreshToken = "refresh_token",
  signUpEmailVerificationToken = "signup_email_verification_token",
  nonVerifiedUserAccessToken = "nv_access_token",
  passwordRecovery = "password_recovery"
}
