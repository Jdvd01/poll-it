export const config = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  },
  app: {
    nodeEnv: process.env.NODE_ENV ?? "development",
    url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  },
};

export function verifyConfig() {
  if (!config.supabase.url || !config.supabase.anonKey || !config.app.url) {
    // Generar el error solo si la aplicación ya se está ejecutando,
    // garantizando que las variables han tenido la oportunidad de cargarse.
    throw new Error(`❌ Faltan variables de entorno esenciales.
    Asegúrate de que .env.local existe y contiene:
    - NEXT_PUBLIC_SUPABASE_URL
    - NEXT_PUBLIC_SUPABASE_ANON_KEY
    - NEXT_PUBLIC_APP_URL
    `);
  }
}
