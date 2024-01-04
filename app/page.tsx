import DeployButton from '../components/DeployButton'
import ConnectSupabaseSteps from '@/components/ConnectSupabaseSteps'
import SignUpUserSteps from '@/components/SignUpUserSteps'
import Header from '@/components/Header'
import Link from 'next/link'
import NavItems from '../components/NavItems'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import GithubIcon from '@/components/GithubIcon'
import SupabaseLogo from '@/components/SupabaseLogo'
import EventifyLogo from '@/components/EventifyLogo'

export default async function Index() {
  const cookieStore = cookies()

  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient(cookieStore)
      return true
    } catch (e) {
      return false
    }
  }

  const isSupabaseConnected = canInitSupabaseClient()

  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <nav className="bg-gradient-to-r from-white/70 via-white/40 to-white/20  shadow-sm backdrop-blur-xl w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-[90vw] flex justify-between items-center p-3 text-sm">
          <div>
            <EventifyLogo />
          </div>
          {isSupabaseConnected && <NavItems />}
        </div>
      </nav>
      <div className="flex flex-row py-8 pl-16 w-[90vw] h-[75vh] justify-center my-auto bg-white/20 rounded-xl ring-1 ring-gray-600/5 backdrop-blur-xl">
        <div className="flex flex-col h-full justify-center w-[60%] gap-12">
          <div className="flex flex-col gap-7">
            <p className="text-4xl font-bold !leading-tight max-w-xl">
              Create Events and Invite Participants with Automated Notifications
            </p>
            <p className="text-lg font-light !leading-tight max-w-lg">
              With a few clicks, Eventify lets you effortlessly create custom events, specify details, and invite participants, while automated notifications ensure everyone stays informed.
            </p>
          </div>
          <Link
                href="/create"
          className="block font-semibold text-base text-center py-2 rounded-xl no-underline bg-gradient-to-r from-purple-600 to-orange-600 transition-colors duration-300 transform hover:from-purple-500 hover:to-orange-500 max-w-xs shadow-md">
          Get Started
        </Link>

        </div>

        <div className="flex flex-col h-full w-[50%] align-middle justify-center">

        <div className="bg-white/20 w-full h-[90%] rounded-l-3xl shadow-lg"></div>
        </div>
      </div>

      {/* <div className="my-auto flex-col">

        <p className="text-3xl lg:text-4xl font-bold !leading-tight max-w-xl text-center">
          Create Events and Invite Participants with Automated Notifications
        </p>
      </div> */}

      {/* <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <Header />
        <main className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-4xl mb-4">Next steps</h2>
          {isSupabaseConnected ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
        </main>
      </div> */}

      <footer className="mt-auto w-full border-t border-t-foreground/20 p-5 flex justify-center items-center text-center text-xs">
        <div className="flex items-center gap-1">

          <p>
            Powered by{' '}
            <a
              href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Supabase
            </a>
          </p>
          <SupabaseLogo />
        </div>

        <div className="flex items-center gap-1">
          <p>
            View on {' '}
            <a
              href="https://github.com/arther-upton/event-notification-app"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              GitHub
            </a>
          </p>
          <GithubIcon />
        </div>

      </footer>
    </div>
  )
}
