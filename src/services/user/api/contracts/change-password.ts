export interface ChangePasswordBody {
    oldPassword: string;
    newPassword: string;
}
export interface ChangePasswordArgs {
    body: ChangePasswordBody;
}
