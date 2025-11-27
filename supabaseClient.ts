import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Test connection function
export async function testSupabaseConnection() {
  const { data, error } = await supabase.from('tasks').select('*');
  if (error) {
    console.error('Supabase connection error:', error);
  } else {
    console.log('Supabase connection successful! Data:', data);
  }
}