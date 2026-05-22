export interface LoguinRequest {
  username: string;
  password: string;
}

export interface LoguinResponse {
  accessToken: string;
  refreshToken: string;
  token: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
}

export interface JwTPayload {
  sub: number;
  username: string;
  iat: number;
}
