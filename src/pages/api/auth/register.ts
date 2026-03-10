import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { users } from "../../../lib/authStore";
import { User } from "../../../types/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body as {
    email?: string;
    password?: string;
  };

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    return res.status(409).json({ message: "User already exists." });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser: User = {
    id: String(Date.now()),
    email,
    passwordHash,
  };

  users.push(newUser);

  res.status(201).json({ message: "User registered successfully." });
}
