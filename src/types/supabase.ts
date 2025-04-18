
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      icps: {
        Row: {
          id: string
          user_id: string
          name: string
          industry: string | null
          location: string | null
          company_size: string | null
          job_titles: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          industry?: string | null
          location?: string | null
          company_size?: string | null
          job_titles?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          industry?: string | null
          location?: string | null
          company_size?: string | null
          job_titles?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      prospects: {
        Row: {
          id: string
          user_id: string
          name: string | null
          job_title: string | null
          company: string | null
          email: string | null
          linkedin_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name?: string | null
          job_title?: string | null
          company?: string | null
          email?: string | null
          linkedin_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string | null
          job_title?: string | null
          company?: string | null
          email?: string | null
          linkedin_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      message_templates: {
        Row: {
          id: string
          user_id: string
          name: string
          type: 'email' | 'linkedin'
          body: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          type: 'email' | 'linkedin'
          body: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          type?: 'email' | 'linkedin'
          body?: string
          created_at?: string
          updated_at?: string
        }
      }
      campaigns: {
        Row: {
          id: string
          user_id: string
          icp_id: string | null
          name: string
          steps: any
          status: 'draft' | 'active' | 'paused' | 'completed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          icp_id?: string | null
          name: string
          steps?: any
          status?: 'draft' | 'active' | 'paused' | 'completed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          icp_id?: string | null
          name?: string
          steps?: any
          status?: 'draft' | 'active' | 'paused' | 'completed'
          created_at?: string
          updated_at?: string
        }
      }
      campaign_prospects: {
        Row: {
          id: number
          campaign_id: string
          prospect_id: string
          user_id: string
          status: string
          current_step_index: number
          last_action_timestamp: string | null
          next_action_timestamp: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          campaign_id: string
          prospect_id: string
          user_id: string
          status?: string
          current_step_index?: number
          last_action_timestamp?: string | null
          next_action_timestamp?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          campaign_id?: string
          prospect_id?: string
          user_id?: string
          status?: string
          current_step_index?: number
          last_action_timestamp?: string | null
          next_action_timestamp?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
