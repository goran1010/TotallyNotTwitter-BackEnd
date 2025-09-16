import { PrismaClient } from "@prisma/client";

let databaseUrl;

switch (process.env.NODE_ENV) {
  case "test":
    databaseUrl = process.env.TEST_DATABASE_URL;
    break;
  case "production":
    databaseUrl = process.env.PROD_DATABASE_URL;
    break;
  default:
    databaseUrl = process.env.DATABASE_URL;
}

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});

export default prisma;
