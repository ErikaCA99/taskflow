"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  registerSchema,
  RegisterFormData,
} from "@/lib/validations/auth_validations";
import { registerAction } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

function RegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setServerError(null);
    setSuccess(false);
    try {
      await registerAction(data.full_name, data.email, data.password);
      setSuccess(true);
      router.push("/");
      router.refresh();
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Error al registrarse",
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-950 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-slate-100 font-bold text-3xl mb-2">
            Crear cuenta
          </h1>
          <p className="text-slate-500 text-sm">
            Completa los datos para registrarte en TaskFlow
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-slate-900 border border-slate-800 rounded-xl p-8 space-y-5 shadow-xl"
        >
          <div className="space-y-1">
            <label className="text-slate-400 text-sm font-medium block">
              Nombre completo
            </label>
            <input
              type="text"
              {...register("full_name")}
              disabled={isSubmitting}
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-50"
              placeholder="Juan Pérez"
            />
            {errors.full_name && (
              <p className="text-red-400 text-xs mt-1">
                {errors.full_name.message}
              </p>
            )}
          </div>

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

          <div className="space-y-1">
            <label className="text-slate-400 text-sm font-medium block">
              Contraseña
            </label>
            <input
              type="password"
              {...register("password")}
              disabled={isSubmitting}
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-50"
              placeholder="Mínimo 8 caracteres"
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 text-sm font-medium block">
              Confirmar contraseña
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              disabled={isSubmitting}
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-50"
              placeholder="Repite tu contraseña"
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {serverError && (
            <div className="bg-red-950 border border-red-800 text-red-400 px-4 py-3 rounded-lg text-sm">
              {serverError}
            </div>
          )}

          {success && (
            <div className="bg-green-950 border border-green-800 text-green-400 px-4 py-3 rounded-lg text-sm">
              Cuenta creada. Redirigiendo...
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium p-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creando cuenta...
              </>
            ) : (
              "Crear cuenta"
            )}
          </button>

          <p className="text-center text-sm text-slate-500 pt-2">
            ¿Ya tienes cuenta?{" "}
            <Link
              href="/login"
              className="text-blue-400 hover:text-blue-300 hover:underline transition"
            >
              Inicia sesión
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
