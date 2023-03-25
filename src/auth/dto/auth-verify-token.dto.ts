import { IsJWT } from 'class-validator';

export class VerifyTokenDTO {
  @IsJWT()
  token: string;
}
