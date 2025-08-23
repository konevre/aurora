import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TokenVersionValidator {
  constructor(private readonly usersService: UsersService) {}

  async assertUpToDate(userId: string, tokenVersion?: number): Promise<void> {
    const currentVersion = await this.usersService.getTokenVersion(userId);
    const incomingVersion = tokenVersion ?? 0;

    if (currentVersion === null || currentVersion !== incomingVersion) {
      throw new UnauthorizedException('Token has been invalidated');
    }
  }
}


