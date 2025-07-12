import {createBrowserClient} from '@supabase/ssr';
import {Database} from '../../lib/database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export type SupabaseClient = ReturnType<typeof createBrowserClient<Database>>;

export const createClient = () =>
  createBrowserClient<Database>(supabaseUrl!, supabaseKey!);
