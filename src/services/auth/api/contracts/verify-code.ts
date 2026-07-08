export interface VerifyCodeBody {
    code: string;
}
export interface VerifyCodeArgs {
    body: VerifyCodeBody;
}
export type VerifyCodeResponse = boolean;
