import type { BoardParams } from './board-params';

export interface PresignUploadImageBody {
    mimeType: string;
}
export interface PresignUploadImageArgs extends BoardParams {
    body: PresignUploadImageBody;
}
export interface PresignUploadImageResponse {
    uploadUrl: string;
    publicUrl: string;
    key: string;
    method: 'PUT';
}
