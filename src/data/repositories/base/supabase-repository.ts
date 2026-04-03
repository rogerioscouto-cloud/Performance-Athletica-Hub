import { createClient } from "@/lib/supabase/server";

export abstract class SupabaseRepository {
  protected async db() {
    return createClient();
  }
}
