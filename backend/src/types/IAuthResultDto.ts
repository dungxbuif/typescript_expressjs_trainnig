export interface IAuthResultDto {
   accessToken: string | null;
   encryptedAccessToken: string | null;
   expireInSeconds: Number;
   userId: Number | null;
}
