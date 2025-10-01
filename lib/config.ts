function getEnv(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (!value) {
    throw new Error(`❌ Missing environment variable: ${name}`);
  }
  return value;
}

export const config = {
  supabase: {
    url: getEnv("NEXT_PUBLIC_SUPABASE_URL"),
    anonKey: getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  },
  app: {
    nodeEnv: getEnv("NODE_ENV", "development"),
    url: getEnv("NEXT_PUBLIC_APP_URL", "http://localhost:3000"),
  },
};
