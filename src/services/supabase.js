import { createClient } from '@supabase/supabase-js'

const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'no-supabase-key';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'http://localhost:8000';
// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseKey,
  {auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true
              }}
);

export default supabase;