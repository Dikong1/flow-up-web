import type { IUser } from '../../types/user';

export interface CompleteUploadAvatarBody {
    key: string;
}
export interface CompleteUploadAvatarArgs {
    body: CompleteUploadAvatarBody;
}
export type CompleteUploadAvatarResponse = IUser;
