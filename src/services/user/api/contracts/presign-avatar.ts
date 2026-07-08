export interface PresignUploadAvatarBody {
    mimeType: string;
}
export interface PresignUploadAvatarArgs {
    body: PresignUploadAvatarBody;
}
export interface PresignUploadAvatarResponse {
    uploadUrl: string;
    publicUrl: string;
    key: string;
    method: 'PUT';
}
