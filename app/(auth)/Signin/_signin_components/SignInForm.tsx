"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

export default function SigninForm() {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    // вызываем NextAuth
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      // преобразуем коды ошибок в осмысленные сообщения
      const errorMap: Record<string, string> = {
        CredentialsSignin: "Invalid email or password",
        Configuration: "Auth configuration error, please contact admin",
        default: "Unknown error, please try again",
      };
      const message = errorMap[res.error] ?? errorMap.default;
      toast.error(message);
    } else if (res?.ok) {
      toast.success("Logged in!");
      router.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <h2 className="text-4xl font-semibold pb-6 self-center">Sign in</h2>

      <div className="flex flex-col gap-1 pb-2">
        <label htmlFor="email" className="text-sm w-fit">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="border rounded-sm shadow-lg focus:outline-0 py-1 px-3"
        />
      </div>

      <div className="flex flex-col gap-1 pb-2">
        <label htmlFor="password" className="text-sm w-fit">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="border rounded-sm shadow-lg focus:outline-0 py-1 px-3"
        />
      </div>

      <button
        type="submit"
        className="border rounded-md w-2/3 self-center mt-5 hover:cursor-pointer mb-3"
      >
        Sign in
      </button>
    </form>
  );
}
