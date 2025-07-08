import {createServerClient} from '@supabase/ssr';
import {cookies} from 'next/headers';
import {Database} from '../../lib/database.types';
import {ReadonlyRequestCookies} from 'next/dist/server/web/spec-extension/adapters/request-cookies';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const createClient = (cookieStore: ReadonlyRequestCookies) => {
  return createServerClient<Database>(supabaseUrl!, supabaseKey!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({name, value, options}) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
};

export const getServerClient = async () => {
  const cookieStore = await cookies();
  return createClient(cookieStore);
};
