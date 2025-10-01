import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient({
      cookies: () => cookies(),
    });

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("❌ Error al intercambiar el código:", error.message);
      return NextResponse.redirect(new URL("/auth/error", url.origin));
    }

    const user = data?.user;
    if (user) {
      const { error: upsertError } = await supabase.from("user").upsert(
        {
          id: user.id,
          email: user.email,
          display_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" },
      );

      if (upsertError) {
        console.error("❌ Error guardando en tabla user:", upsertError.message);
      }
    }
  }

  return NextResponse.redirect(new URL("/", url.origin));
}
