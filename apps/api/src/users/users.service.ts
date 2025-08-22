import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PublicUserDto } from './dto/public-user.dto';
import * as bcrypt from 'bcrypt';
import { env } from 'src/config/env';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly configService: ConfigService
    ) {}
  
    async create(createUserDto: CreateUserDto): Promise<PublicUserDto> {
      const { username, email, password } = createUserDto;
  
      const userAlreadyExists = await this.prisma.user.findFirst({
        where: {
          OR: [{ username }, { email }],
        },
        select: { id: true },
      });
  
      if (userAlreadyExists) {
        throw new ConflictException(
          'User with this email or username already exists',
        );
      }
  
      const passwordHash = await bcrypt.hash(password, env.BCRYPT_SALT_ROUNDS);
  
      const newUser = await this.prisma.user.create({
        data: {
          username,
          email,
          passwordHash,
          displayName: username,
        },
      });
  
      const { passwordHash: _, ...publicUser } = newUser;
  
      return publicUser as unknown as PublicUserDto;
    }
  }