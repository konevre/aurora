import path from "node:path";
import * as dotenv from "dotenv";
import type { PrismaConfig } from "prisma";

dotenv.config();

export default {
    schema: path.join("prisma")
} satisfies PrismaConfig;
