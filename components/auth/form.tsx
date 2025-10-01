"use client";

import { CircleCheckIcon } from "lucide-react";
import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";

import { Alert } from "../ui/alert";

type AuthMode = "login" | "register";

interface AuthFormProps {
  mode: AuthMode;
}

export function AuthForm({ mode }: AuthFormProps) {
  const { user, loginWithEmail, signupWithEmail, loginWithProvider } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
    displayName: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (user) {
    redirect("/", RedirectType.push);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (mode === "login") {
        await loginWithEmail(form.email, form.password);
      } else {
        await signupWithEmail(form);
        setMessage("📩 Revisa tu correo, te enviamos un link de verificacion.");
      }
      setForm({ email: "", password: "", displayName: "" });
    } catch (err: any) {
      setMessage(`❌ Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          {mode === "login" ? "Iniciar sesión" : "Registro"}
        </CardTitle>
        <CardDescription className="text-center">
          {mode === "login" ? "Ingresa a tu cuenta de Poll It" : "Bienvenido a Poll It"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>
          {mode === "register" && (
            <div className="space-y-2">
              <Label htmlFor="displayName">Usuario</Label>
              <Input
                id="displayName"
                name="displayName"
                type="text"
                value={form.displayName}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
          )}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading
              ? mode === "login"
                ? "Iniciando..."
                : "Registrando..."
              : mode === "login"
                ? "Iniciar sesión"
                : "Registrarse"}
          </Button>
        </form>

        {message && (
          <Alert>
            <CircleCheckIcon />
            {message}
          </Alert>
        )}

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">O continuar con</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => loginWithProvider("google")}
            disabled={isLoading}
            className="w-full bg-transparent"
          >
            Google
          </Button>
          <Button
            variant="outline"
            onClick={() => loginWithProvider("github")}
            disabled={isLoading}
            className="w-full bg-transparent"
          >
            Github
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          {mode === "login" ? (
            <>
              ¿No tienes una cuenta?{" "}
              <Link
                href="/auth/register"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Regístrate
              </Link>
            </>
          ) : (
            <>
              ¿Ya tienes una cuenta?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Inicia sesión
              </Link>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
