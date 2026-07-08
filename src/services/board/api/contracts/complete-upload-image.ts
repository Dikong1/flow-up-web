import type { BoardParams } from './board-params';

export interface CompleteUploadImageBody {
    key: string;
}
export interface CompleteUploadImageArgs extends BoardParams {
    body: CompleteUploadImageBody;
}
export type CompleteUploadImageResponse = boolean;
