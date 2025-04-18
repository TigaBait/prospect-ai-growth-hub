
export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface ICP {
  id: string;
  user_id: string;
  name: string;
  industry: string | null;
  location: string | null;
  company_size: string | null;
  job_titles: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface Prospect {
  id: string;
  user_id: string;
  name: string | null;
  job_title: string | null;
  company: string | null;
  email: string | null;
  linkedin_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface MessageTemplate {
  id: string;
  user_id: string;
  name: string;
  type: 'email' | 'linkedin';
  body: string;
  created_at: string;
  updated_at: string;
}

export interface Campaign {
  id: string;
  user_id: string;
  icp_id: string | null;
  name: string;
  steps: CampaignStep[];
  status: 'draft' | 'active' | 'paused' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface CampaignStep {
  type: 'email' | 'linkedin';
  templateId: string;
  delayDays: number;
}

export interface CampaignProspect {
  id: number;
  campaign_id: string;
  prospect_id: string;
  user_id: string;
  status: 'pending' | 'in_progress' | 'contacted' | 'replied' | 'completed';
  current_step_index: number;
  last_action_timestamp: string | null;
  next_action_timestamp: string | null;
  created_at: string;
  updated_at: string;
}
