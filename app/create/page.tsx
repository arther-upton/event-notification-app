import Link from 'next/link'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import EventifyLogo from '@/components/EventifyLogo'
import CreateEventForm from '@/components/CreateEventForm'

export default function Create() {

  const createEvent = async (participants : string[], formData: FormData) => {
    'use server'

    console.log(formData);
    // const email = formData.get('email') as string
    // const password = formData.get('password') as string
    // const cookieStore = cookies()
    // const supabase = createClient(cookieStore)

    // const { error } = await supabase.auth.signInWithPassword({
    //   email,
    //   password,
    // })

    // if (error) {
    //   return redirect('/login?message=Could not authenticate user')
    // }

    // return redirect('/')
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
        <CreateEventForm createEvent={createEvent} />
      </div>
    </>
  )
}
