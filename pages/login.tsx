"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { FcGoogle } from "react-icons/fc";
import Button from "@/components/Button";

export default function Login() {
  const router = useRouter();
  const { data: session } = useSession();
  const { setUser } = useStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  if (session) {
    router.push("/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (response.error) {
        setError(response.error.message);
      } else {
        setUser(response.user);
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-24">
      <div className="bg-white p-10 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Welcome to FitTrack
        </h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <Button type="submit" variant="primary" disabled={!email || !password}>
            Login
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <a href="/signup" className="font-medium text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
        <div className="mt-4">
          <Button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="flex items-center gap-2"
            variant="outline"
          >
            <FcGoogle size={20} />
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
}