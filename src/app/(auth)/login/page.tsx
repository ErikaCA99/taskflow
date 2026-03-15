"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, LoginFormData } from "@/lib/validations/auth_validations";
import { loginAction } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

function LoginPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);
    try {
      await loginAction(data.email, data.password);
      router.push("/");
      router.refresh();
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Credenciales inválidas",
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-950 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-slate-100 font-bold text-3xl mb-2">
            Iniciar sesión
          </h1>
          <p className="text-slate-500 text-sm">
            Bienvenido de nuevo a TaskFlow
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-slate-900 border border-slate-800 rounded-xl p-8 space-y-5 shadow-xl"
        >
          {/* Email */}
          <div className="space-y-1">
            <label className="text-slate-400 text-sm font-medium block">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              disabled={isSubmitting}
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-50"
              placeholder="usuario@email.com"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-slate-400 text-sm font-medium block">
              Contraseña
            </label>
            <input
              type="password"
              {...register("password")}
              disabled={isSubmitting}
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-50"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Error del servidor */}
          {serverError && (
            <div className="bg-red-950 border border-red-800 text-red-400 px-4 py-3 rounded-lg text-sm">
              {serverError}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium p-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              "Iniciar sesión"
            )}
          </button>

          {/* Link a register */}
          <p className="text-center text-sm text-slate-500 pt-2">
            ¿No tienes cuenta?{" "}
            <Link
              href="/auth/register"
              className="text-blue-400 hover:text-blue-300 hover:underline transition"
            >
              Regístrate
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
