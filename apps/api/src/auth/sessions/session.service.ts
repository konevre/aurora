import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SessionsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, meta: { ua?: string; ip?: string; ttlMs: number }) {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + meta.ttlMs);

    return this.prisma.authSession.create({
      data: { userId, userAgent: meta.ua, ip: meta.ip, expiresAt },
    });
  }

  async validate(sid: string, userId: string) {
    const session = await this.prisma.authSession.findUnique({ where: { id: sid } });
    if (!session) return false;
    if (session.userId !== userId) return false;
    if (session.revokedAt) return false;
    if (session.expiresAt <= new Date()) return false;

    return true;
  }

  async revoke(sid: string) {
    return this.prisma.authSession.update({
      where: { id: sid },
      data: { revokedAt: new Date() },
    });
  }
}