"use client";
import { LoginForm } from "@/components/ui/login-form";

export default function Login() {
  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 min-h-screen w-full">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
