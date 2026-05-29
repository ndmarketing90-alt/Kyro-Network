import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hvjirsmautgeaclnzxzr.supabase.co'
const supabaseKey = 'sb_publishable_WohunKhCyyRAUS4Q4PTpEg_EjIXb4gy'

export const supabase = createClient(supabaseUrl, supabaseKey);