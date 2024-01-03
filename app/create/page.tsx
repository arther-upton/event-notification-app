import Link from 'next/link'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import EventifyLogo from '@/components/EventifyLogo'

export default function Create({
  searchParams,
}: {
  searchParams: { message: string }
}) {

  const createEvent = async (formData: FormData) => {
    'use server'

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/')
  }

  return (
    <>
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-orange-600 backdrop-blur-xl hover:bg-white/30 flex items-center group text-sm transition-colors duration-300 transform"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{' '}
        Back
      </Link>

      <div className="flex flex-col w-full py-8 px-8 sm:max-w-md justify-center gap-2 my-auto bg-gradient-to-b from-white/40 via-white/30 to-white/20 rounded-xl shadow-lg backdrop-blur-xl">

        <p className="text-3xl font-bold text-white">
          Create Event
        </p>
        <form
          className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground mt-3"
          action={createEvent}
        >
          {/* <label className="text-lg font-semibold text-orange-600" htmlFor="email">
            Email
          </label>
          <input
            className="text-black rounded-md px-4 py-2 bg-inherit border border-slate-600 mb-6 placeholder-black placeholder-opacity-50 focus:outline-black"
            name="email"
            placeholder="you@example.com"
            required
          /> */}

<label className="text-lg font-semibold" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border-2 mb-6 placeholder-white placeholder-opacity-50 focus:outline-purple-300"
            name="email"
            placeholder="you@example.com"
            required
          />
          {/* month
          <input
            type="month"
          />
          date
          <input
            type="date"
          />
          datetime-local
          <input
            type="datetime-local"
          />
          time
          <input
            type="time"
          />
          url
          <input
            type="url"
          />
          week
          <input
            type="week"
          />

          <label className="text-lg font-semibold" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border-2 mb-6 placeholder-white placeholder-opacity-50 focus:outline-purple-300"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          /> */}
          <button className="bg-orange-600 rounded-md px-4 py-2 text-foreground mb-2">
            Create
          </button>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/20 text-foreground text-center rounded-md">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </>
  )
}
