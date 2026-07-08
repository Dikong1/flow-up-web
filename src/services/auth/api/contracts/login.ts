export interface LoginBody {
    email: string;
    password: string;
}
export interface LoginArgs {
    body: LoginBody;
}
export interface AuthTokenResponse {
    accessToken: string;
}
export type LoginResponse = AuthTokenResponse;
