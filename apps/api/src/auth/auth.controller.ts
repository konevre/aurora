import {
    Body,
    Controller,
    HttpCode,
    Post,
    Req,
    Res,
    UnauthorizedException,
    UseGuards
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { Request, Response } from "express";

import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";

import { SignInDto } from "./dto/signin.dto";
import { JwtRefreshGuard } from "./guards/jwt-refresh.guard";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService
    ) {}

    @HttpCode(200)
    @Post("signup")
    async signUp(
        @Body() createUserDto: CreateUserDto,
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response
    ) {
        const user = await this.usersService.create(createUserDto);
        const tokens = await this.authService.signIn(
            {
                id: user.id,
                username: user.username,
                tokenVersion: user.tokenVersion
            },
            { ua: request.headers["user-agent"], ip: request.ip }
        );

        this.authService.setAuthCookies(response, tokens);

        return { id: user.id, username: user.username };
    }

    @HttpCode(200)
    @Post("signin")
    async signIn(
        @Body() signInDto: SignInDto,
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response
    ) {
        const user = await this.usersService.findByEmailOrUsername(
            signInDto.emailOrUsername
        );
        if (!user) {
            throw new UnauthorizedException("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(
            signInDto.password,
            user.passwordHash
        );
        if (!isPasswordValid) {
            throw new UnauthorizedException("Invalid credentials");
        }

        const tokens = await this.authService.signIn(
            {
                id: user.id,
                username: user.username,
                tokenVersion: user.tokenVersion
            },
            { ua: request.headers["user-agent"], ip: request.ip }
        );

        this.authService.setAuthCookies(response, tokens);

        return { id: user.id, username: user.username };
    }

    @UseGuards(JwtRefreshGuard)
    @HttpCode(200)
    @Post("signout")
    async signOut(
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response
    ) {
        const principal = request.user as {
            userId: string;
            username?: string;
            sid: string;
            tokenVersion?: number;
        };
        await this.authService.signOut(principal.sid);

        this.authService.clearAuthCookies(response);

        return { ok: true };
    }

    @UseGuards(JwtRefreshGuard)
    @Post("refresh")
    refresh(
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response
    ) {
        const principal = request.user as {
            userId: string;
            username?: string;
            sid: string;
            tokenVersion?: number;
        };

        const tokens = this.authService.refresh(principal);

        this.authService.setAuthCookies(response, tokens);

        return { ok: true, accessTtlMs: tokens.accessTtlMs };
    }
}
