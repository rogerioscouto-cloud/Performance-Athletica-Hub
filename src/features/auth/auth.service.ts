"use client";

import { createClient } from "@/lib/supabase/client";

export class AuthService {
  private supabase = createClient();

  async login(email: string, password: string) {
    const { error } = await this.supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
  }

  async signup(email: string, password: string) {
    const { error } = await this.supabase.auth.signUp({ email, password });
    if (error) throw new Error(error.message);
  }

  async logout() {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw new Error(error.message);
  }
}
