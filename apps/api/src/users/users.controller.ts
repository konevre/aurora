import { Body, Controller, Post } from "@nestjs/common";

import { CreateUserDto } from "./dto/create-user.dto";
import { PublicUserDto } from "./dto/public-user.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<PublicUserDto> {
        return await this.usersService.create(createUserDto);
    }
}
