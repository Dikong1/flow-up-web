export interface RegisterBody {
    email: string;
    username: string;
    password: string;
    fullName: string;
}
export interface RegisterArgs {
    body: RegisterBody;
}
export type RegisterResponse = boolean;
