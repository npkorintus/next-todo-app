import bcrypt from "bcryptjs";
import { User } from "../types/User";

export const users: User[] = [
  {
    id: "001",
    email: "user@example.com",
    passwordHash: bcrypt.hashSync("password123", 10),
  },
];

export const JWT_SECRET = "your_jwt_secret_key";
