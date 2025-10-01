import { createBrowserClient } from "@supabase/ssr";

import { config } from "./config";

function createClient() {
  return createBrowserClient(config.supabase.url!, config.supabase.anonKey!);
}

export const supabase = createClient();
