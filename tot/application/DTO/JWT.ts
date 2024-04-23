export interface IJWT {
  accessToken?: string;
  code?: string;
  deviceCode?: string;
  error?: string;
  errorDescription?: string;
  errorUri?: string;
  expiresIn?: string;
  idToken?: string;
  iss?: string;
  refreshToken?: string;
  scope?: string;
  state?: string;
  tokenType?: 'Bearer';
  userCode?: string;
  verificationUri?: string;
  verificationUriComplete?: string;
  count?: number;
}
