"use client";

import Link from "next/link";

import { useAuth } from "@/hooks/useAuth";

import { Button } from "../ui/button";

export function AuthButton() {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return <Button disabled>Cargando...</Button>;
  }

  if (!user) {
    return <Link href="/auth/login">Iniciar sesión</Link>;
  }

  return <Button onClick={logout}>Cerrar sesión</Button>;
}
