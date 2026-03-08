import { createBrowserClient} from '@supabase/ssr'
import {createServerClient} from '@supabase/ssr'
import {cookies} from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export function createClient() {
    return createBrowserClient(supabaseUrl, supabaseAnon)
}

export async function createServerSupabaseClient() {
    const cookieStore = await cookies()

    return createServerClient(supabaseUrl, supabaseAnon, {
   cookies: {
    getAll() {
      return cookieStore.getAll()
    },
    setAll(cookiesToSet) {
      try {
        cookiesToSet.forEach(({ name, value, options }) =>
          cookieStore.set(name, value, options)
        )
      } catch {}
    },
  },
})
}