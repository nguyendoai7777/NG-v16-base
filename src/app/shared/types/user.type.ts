export interface AuthToken {
  access_token: string;
  refresh_token: string;
}

export interface LoginUser {
  username: string;
  password: string;
}

export interface SignUpUser {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface JWTDecodeProps {
  user_id: number;
  rule: number;
  iat: number;
  exp: number;
}
