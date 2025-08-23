import { Exclude, Expose } from "class-transformer";

export class PublicUserDto {
    @Expose()
    id: string;

    @Expose()
    username: string;

    @Expose()
    email: string;

    @Expose()
    displayName?: string;

    @Expose()
    avatarFileId?: number;

    @Expose()
    experienceXp: number;

    @Expose()
    tokenVersion: number;

    @Expose()
    createdAt: Date;

    @Exclude()
    passwordHash: string;
}
