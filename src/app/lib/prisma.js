// lib/prisma.js หรือ utils/prisma.js

import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // ตรวจสอบว่ามี global.prisma อยู่แล้วหรือไม่ เพื่อป้องกันการสร้างหลาย instances
  // ในโหมด Development (ที่ Next.js hot-reloads)
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
