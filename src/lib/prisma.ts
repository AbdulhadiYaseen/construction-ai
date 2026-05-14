import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const databaseUrl = process.env.DATABASE_URL || "mysql://root:@localhost:3306/construction_ai";

let host = "localhost";
let port = 3306;
let user = "root";
let password = "";
let database = "construction_ai";

try {
  // Clean up schema representation for general URL parsing fallback
  const urlString = databaseUrl.includes("://") ? databaseUrl : `mysql://${databaseUrl}`;
  const parsedUrl = new URL(urlString);
  
  host = parsedUrl.hostname || host;
  port = parsedUrl.port ? parseInt(parsedUrl.port, 10) : port;
  user = decodeURIComponent(parsedUrl.username) || user;
  password = decodeURIComponent(parsedUrl.password) || password;
  database = parsedUrl.pathname.replace(/^\//, "") || database;
} catch (err) {
  console.warn("Prisma Client Initialization: database URL parsing fallback activated.", err);
}

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const createPrismaClient = () => {
  const adapter = new PrismaMariaDb({
    host,
    port,
    user,
    password,
    database,
    connectionLimit: 5,
  });
  return new PrismaClient({ adapter });
};

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
