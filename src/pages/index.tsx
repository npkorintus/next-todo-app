import Header from "@/components/Header/Header";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <div>
        <h1>Todo App</h1>
        <p>Organize your life.</p>

        <Link href="/login">Login</Link>
        <br/>
        <Link href="/register">Register</Link>
      </div>
    </>
  );
}
