export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      athlete_profiles: {
        Row: {
          id: string;
          user_id: string;
          full_name: string | null;
          birth_date: string | null;
          sex: "MALE" | "FEMALE" | "OTHER" | null;
          height_cm: number | null;
          weight_kg: number | null;
          resting_hr: number | null;
          max_hr: number | null;
          threshold_pace_sec_per_km: number | null;
          easy_pace_sec_per_km: number | null;
          weekly_goal_km: number | null;
          training_goal: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          full_name?: string | null;
          birth_date?: string | null;
          sex?: "MALE" | "FEMALE" | "OTHER" | null;
          height_cm?: number | null;
          weight_kg?: number | null;
          resting_hr?: number | null;
          max_hr?: number | null;
          threshold_pace_sec_per_km?: number | null;
          easy_pace_sec_per_km?: number | null;
          weekly_goal_km?: number | null;
          training_goal?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          full_name?: string | null;
          birth_date?: string | null;
          sex?: "MALE" | "FEMALE" | "OTHER" | null;
          height_cm?: number | null;
          weight_kg?: number | null;
          resting_hr?: number | null;
          max_hr?: number | null;
          threshold_pace_sec_per_km?: number | null;
          easy_pace_sec_per_km?: number | null;
          weekly_goal_km?: number | null;
          training_goal?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      readiness_logs: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          resting_hr: number;
          sleep_hours: number;
          fatigue_score: number;
          soreness_score: number | null;
          readiness_score: number;
          status: "GREEN" | "YELLOW" | "RED";
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          resting_hr: number;
          sleep_hours: number;
          fatigue_score: number;
          soreness_score?: number | null;
          readiness_score: number;
          status: "GREEN" | "YELLOW" | "RED";
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          resting_hr?: number;
          sleep_hours?: number;
          fatigue_score?: number;
          soreness_score?: number | null;
          readiness_score?: number;
          status?: "GREEN" | "YELLOW" | "RED";
          created_at?: string;
        };
        Relationships: [];
      };

      workout_logs: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          type: string;
          distance_km: number | null;
          duration_sec: number | null;
          avg_pace_sec_per_km: number | null;
          avg_hr: number | null;
          training_load: number | null;
          efficiency: number | null;
          cardiac_drift: number | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          type: string;
          distance_km?: number | null;
          duration_sec?: number | null;
          avg_pace_sec_per_km?: number | null;
          avg_hr?: number | null;
          training_load?: number | null;
          efficiency?: number | null;
          cardiac_drift?: number | null;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          type?: string;
          distance_km?: number | null;
          duration_sec?: number | null;
          avg_pace_sec_per_km?: number | null;
          avg_hr?: number | null;
          training_load?: number | null;
          efficiency?: number | null;
          cardiac_drift?: number | null;
          notes?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };

      strength_sessions: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          total_volume: number | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          total_volume?: number | null;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          total_volume?: number | null;
          notes?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };

      strength_exercises: {
        Row: {
          id: string;
          session_id: string;
          name: string;
          sets: number;
          reps: number;
          load_kg: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          name: string;
          sets: number;
          reps: number;
          load_kg?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          session_id?: string;
          name?: string;
          sets?: number;
          reps?: number;
          load_kg?: number | null;
          created_at?: string;
        };
        Relationships: [];
      };

      weekly_summaries: {
        Row: {
          id: string;
          user_id: string;
          week_start: string;
          total_distance_km: number | null;
          total_load: number | null;
          adherence: number | null;
          efficiency: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          week_start: string;
          total_distance_km?: number | null;
          total_load?: number | null;
          adherence?: number | null;
          efficiency?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          week_start?: string;
          total_distance_km?: number | null;
          total_load?: number | null;
          adherence?: number | null;
          efficiency?: number | null;
          created_at?: string;
        };
        Relationships: [];
      };

      prediction_tests: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          distance_km: number;
          time_sec: number;
          predicted_10k_sec: number | null;
          predicted_half_sec: number | null;
          predicted_marathon_sec: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          distance_km: number;
          time_sec: number;
          predicted_10k_sec?: number | null;
          predicted_half_sec?: number | null;
          predicted_marathon_sec?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          distance_km?: number;
          time_sec?: number;
          predicted_10k_sec?: number | null;
          predicted_half_sec?: number | null;
          predicted_marathon_sec?: number | null;
          created_at?: string;
        };
        Relationships: [];
      };

      alerts: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          type: string;
          severity: "LOW" | "MEDIUM" | "HIGH";
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          type: string;
          severity: "LOW" | "MEDIUM" | "HIGH";
          message: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          type?: string;
          severity?: "LOW" | "MEDIUM" | "HIGH";
          message?: string;
          created_at?: string;
        };
        Relationships: [];
      };

      recommendations: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          message: string;
          applied: boolean | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          message: string;
          applied?: boolean | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          message?: string;
          applied?: boolean | null;
          created_at?: string;
        };
        Relationships: [];
      };

      imports: {
        Row: {
          id: string;
          user_id: string;
          file_name: string;
          status: "PENDING" | "PROCESSED" | "FAILED";
          rows_count: number | null;
          error: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          file_name: string;
          status: "PENDING" | "PROCESSED" | "FAILED";
          rows_count?: number | null;
          error?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          file_name?: string;
          status?: "PENDING" | "PROCESSED" | "FAILED";
          rows_count?: number | null;
          error?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };

    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      athlete_sex: "MALE" | "FEMALE" | "OTHER";
    };
    CompositeTypes: Record<string, never>;
  };
};
