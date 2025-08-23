import { IsNotEmpty, IsString, Matches } from "class-validator";

export class SignInDto {
    @IsString()
    @IsNotEmpty()
    emailOrUsername: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
