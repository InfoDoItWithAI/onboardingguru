import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface BetaSignup {
  id?: string;
  email: string;
  company_name?: string;
  employee_count?: string;
  referral_source?: string;
  founding_member: boolean;
  created_at?: string;
}

export async function insertBetaSignup(data: Omit<BetaSignup, 'id' | 'created_at'>) {
  const { data: result, error } = await supabase
    .from('beta_signups')
    .insert([data])
    .select()
    .single();

  if (error) {
    console.error('Error inserting beta signup:', error);
    throw error;
  }

  return result;
}