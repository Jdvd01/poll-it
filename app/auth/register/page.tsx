import { AuthForm } from "@/components/auth/form";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <AuthForm mode="register" />
    </div>
  );
}
