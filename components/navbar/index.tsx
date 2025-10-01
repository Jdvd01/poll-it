"use client";

import Link from "next/link";

import { AuthButton } from "./auth-button";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
              <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
            </svg>
            <span className="text-lg font-semibold">Encuestas App</span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/surveys"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Encuestas
            </Link>
            <Link
              href="/results"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Resultados
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Acerca de
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <AuthButton />
        </div>
      </div>
    </nav>
  );
}
