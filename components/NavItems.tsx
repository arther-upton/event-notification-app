import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function NavItems() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const signOut = async () => {
    'use server'

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    await supabase.auth.signOut()
    return redirect('/login')
  }

  return user ? (
    <div className="flex items-center gap-4">
      <p className="text-white">
        Hey, {user.email}!
      </p>
      <Link
      href="/create"
      className="py-2 px-3 flex rounded-md no-underline bg-orange-600 hover:bg-white/30 transition-colors duration-300 transform"
    >
      Create Event
    </Link>
    <Link
      href="/events"
      className="py-2 px-3 flex rounded-md no-underline bg-orange-600 hover:bg-white/30 transition-colors duration-300 transform"
    >
      My Events
    </Link>
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-orange-600 hover:bg-white/30 transition-colors duration-300 transform">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-orange-600 hover:bg-white/30 transition-colors duration-300 transform"
    >
      Login
    </Link>
  )
}
