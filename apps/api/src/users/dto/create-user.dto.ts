import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Transform } from "class-transformer";

export class CreateUserDto {
    @Transform(({ value }) => value.toLowerCase().trim())
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(64)
    password: string;

    @Transform(({ value }) => value.toLowerCase().trim())
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(64)
    // TODO: export to common (for frontend validation)
    @Matches(/^[a-z0-9._-]+$/, {
        message: 'Username can only contain letters, numbers, dots, underscores, and hyphens',
    })
    username: string;
}