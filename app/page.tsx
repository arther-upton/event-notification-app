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
      <div className="max-xl:gap-5 flex flex-row py-8 pl-16 w-[90vw] h-[90vh] my-5 justify-center bg-white/20 rounded-xl ring-1 ring-gray-600/5 backdrop-blur-xl">
        <div className="flex flex-col h-full justify-center w-[60%] gap-12 pb-32">
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

        <div className="relative bg-white/20 h-[90%] rounded-l-3xl shadow-lg w-[50%] align-middle justify-center">

          <div className="px-8 pt-6 overflow-clip">
            <p className="text-2xl font-bold text-white">
              Create Event
            </p>
            <div
              className="animate-in flex-1 flex flex-row w-full gap-8 text-foreground mt-3"
            >
              <div className="flex flex-col gap-1 min-w-[15vw]">
                <label className="text-base font-semibold" htmlFor="title">
                  Title
                </label>
                <input
                  className="rounded-md px-4 py-2 bg-inherit border-2 border-white/25 mb-1 placeholder-white placeholder-opacity-50 focus:outline-purple-300"
                  name="title"
                  placeholder="Future Fest"
                  required
                  type="text"
                />

                <label className="text-base font-semibold" htmlFor="venue">
                  Venue
                </label>
                <input
                  className="rounded-md px-4 py-2 bg-inherit border-2 border-white/25 mb-1 placeholder-white placeholder-opacity-50 focus:outline-purple-300"
                  name="venue"
                  placeholder="Expo Center, Lahore"
                  required
                  type="text"
                />

                <div className="grid grid-cols-2 gap-1 rounded-md bg-inherit border-2 border-white/25 mb-1 p-1">
                  <div>
                    <input type="radio" name="venueType" id="onsite" value="onsite" className="peer hidden"
                      defaultChecked={true}
                    />
                    <label htmlFor="onsite" className="block cursor-pointer select-none rounded-md px-2 py-1 text-center peer-checked:bg-purple-500/75 peer-checked:font-bold peer-checked:text-white">Onsite</label>
                  </div>
                  <div>
                    <input type="radio" name="venueType" id="remote" value="remote" className="peer hidden"
                      defaultChecked={false}
                    />
                    <label htmlFor="remote" className="block cursor-pointer select-none rounded-md px-2 py-1 text-center peer-checked:bg-purple-500/75 peer-checked:font-bold peer-checked:text-white">Remote</label>
                  </div>
                </div>

                <label className="text-base font-semibold" htmlFor="link">
                  Link
                </label>
                <input
                  disabled={true}
                  className="disabled:bg-slate-600/20 rounded-md px-3 py-1 bg-inherit border-2 border-white/25 mb-1 placeholder-white placeholder-opacity-50 focus:outline-purple-300"
                  name="link"
                  placeholder="https://meet.google.com/abc-defg-hij"
                  required
                  type="url"
                />
              </div>

              <div className="max-lg:hidden flex flex-col gap-1 min-w-[20vw]">
                <label className="text-base font-semibold" htmlFor="date">
                  Date
                </label>
                <input
                  className="rounded-md px-3 py-1 bg-inherit border-2 border-white/25 mb-1 placeholder-white placeholder-opacity-50 focus:outline-purple-300"
                  name="date"
                  placeholder="..."
                  required
                  type="date"
                />

                <label className="text-base font-semibold" htmlFor="time">
                  Time
                </label>
                <input
                  className="rounded-md px-3 py-1 bg-inherit border-2 border-white/25 mb-1 placeholder-white placeholder-opacity-50 focus:outline-purple-300"
                  name="time"
                  placeholder="..."
                  required
                  type="time"
                />

                <label className="text-base font-semibold" htmlFor="participant">
                  Participants
                </label>
                <div className="flex items-center w-full gap-1">
                  <input
                    className="w-full rounded-md px-3 py-1 bg-inherit border-2 border-white/25 placeholder-white placeholder-opacity-50 focus:outline-purple-300"
                    name="participant"
                    placeholder="Enter participant email"
                    type="email"
                  />
                  <button
                    className="text-lg rounded-md px-3 py-1 text-foreground bg-orange-600 hover:bg-white/30 transition-colors duration-300 transform"
                    type="button"
                  >+</button>
                </div>

                <button className="bg-orange-600 rounded-md px-3 py-1 text-foreground mb-1">
                  Create
                </button>
              </div>
            </div>
          </div>

          <div className="max-xl:hidden absolute right-[75%] top-[65%] w-[65%] text-base font-light flex flex-col py-3 px-5 bg-gradient-to-b from-white/20 via-white/10 to-white/10 rounded-xl shadow-lg">
            <div className="flex flex-row justify-between align-middle items-center mb-2">
              <p className="text-xl font-bold">Git Workshop</p>
              <p className="text-sm font-light">Wed Jan 10 2024 07:00 PM</p>
            </div>
            <p className="align-middle items-center"><span className="font-semibold">About:</span> Hands-on git practice</p>
            <p className="align-middle items-center mb-2"><span className="font-semibold">Venue:</span> My Place (Remote)</p>

            <p>Link: https://test.my.place.com</p>

            <p className="font-semibold mb-1">Invitees:</p>
            <div className="w-full grid grid-cols-2 gap-2 mb-6">
              {
                ['some.user@mail.com', 'another.user@mail.com'].map((p: string, index: number) =>
                  <p key={index}
                    className="bg-white/10 border border-white/25 text-center text-xs py-1 px-1 rounded-md"
                  >
                    {p}
                  </p>
                )
              }
            </div>
            <div className="text-center mt-auto w-full font-normal rounded-md px-4 py-2 text-foreground bg-purple-500/75">
              Cancel Event
            </div>
          </div>

          <div className="max-xl:w-[80%] max-xl:right-[10%] absolute right-[2%] top-[75%] w-[65%] text-base font-light flex flex-col py-3 px-5 bg-gradient-to-b from-white/20 via-white/10 to-white/10 rounded-xl shadow-lg">
            <div className="flex flex-row justify-between align-middle items-center mb-2">
              <p className="text-xl font-bold">Cricket 5v5</p>
              <p className="text-sm font-light">Thu Feb 01 2024 04:00 PM</p>
            </div>
            <p className="align-middle items-center"><span className="font-semibold">About:</span> 5v5 Cricket Tourney</p>
            <p className="align-middle items-center mb-2"><span className="font-semibold">Venue:</span> Striker's Box (Onsite)</p>

            <p className="font-semibold mb-1">Invitees:</p>
            <div className="w-full lg:grid lg:grid-cols-2 lg:gap-2 mb-6">
              {
                ['some.person@mail.com'].map((p: string, index: number) =>
                  <p key={index}
                    className="bg-white/10 border border-white/25 text-center text-xs py-1 px-1 rounded-md"
                  >
                    {p}
                  </p>
                )
              }
            </div>
            <div className="text-center mt-auto w-full font-normal rounded-md px-4 py-2 text-foreground bg-purple-500/75">
              Cancel Event
            </div>
          </div>

        </div>
      </div>

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
