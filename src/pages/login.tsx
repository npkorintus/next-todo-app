import { SubmitEvent, useState } from "react";

import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    if (res.ok) {
      router.push("/dashboard");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />

        <button type="submit">Login</button>
      </form>
      <p>
        Need to create an account?{" "}
        <Link href="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
