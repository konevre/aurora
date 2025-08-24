import { Transform } from "class-transformer";
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Matches,
    MaxLength,
    MinLength
} from "class-validator";

// type-safe normalization of string
const lowerTrim = (input: unknown): string =>
    typeof input === "string" ? input.toLowerCase().trim() : "";

export class CreateUserDto {
    @Transform(({ value }) => lowerTrim(value))
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(64)
    password!: string;

    @Transform(({ value }) => lowerTrim(value))
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(64)
    // TODO: export to common (for frontend validation)
    @Matches(/^[a-z0-9._-]+$/, {
        message:
            "Username can only contain letters, numbers, dots, underscores, and hyphens"
    })
    username!: string;
}
