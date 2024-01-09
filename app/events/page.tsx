import Link from 'next/link';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Events() {

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data, error } = await supabase
    .from('event')
    .select()
    .eq('user_id', user.id);

  if (error) {
    console.log(error);
  }

  console.log(data);

  const deleteEvent = async (eventId: string, formData: FormData) => {
    'use server'

    console.log(eventId);

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase
      .from('event')
      .delete()
      .eq('event_id', eventId);

    if (error) {
      console.log(error);
      return redirect('/events?message=Event deletion failed');
    }

    return redirect('events');
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

      <div className="w-[90vw] my-28 h-full grid grid-cols-3 gap-4">
        {
          data?.map((event, index: number) => {
            return (
              <div key={index} className="text-base font-light flex flex-col py-3 px-5 bg-gradient-to-b from-white/40 via-white/30 to-white/20 rounded-xl backdrop-blur-xlrounded-xl shadow-lg backdrop-blur-xl">
                <div className="flex flex-row justify-between align-middle items-center mb-2">
                  <p className="text-xl font-bold">{event.title}</p>
                  <p className="text-sm font-light">{(new Date(event.date_time)).toDateString()}{' '}{(new Date(event.date_time)).toLocaleString([], {hour: '2-digit', minute: '2-digit'})}</p>
                </div>
                {
                  event.description.length > 0 ?
                    <p className="align-middle items-center"><span className="font-semibold">About:</span> {event.description}</p>
                    : <></>
                }
                <p className="align-middle items-center mb-2"><span className="font-semibold">Venue:</span> {event.venue}</p>
                {
                  event.link.length > 0 ?
                    <p>Link: {event.link}</p>
                    : <></>
                }
                <p className="font-semibold mb-1">Invitees:</p>
                <div className="w-full grid grid-cols-2 gap-2 mb-6">
                  {
                    event.participants.map((p: string, index: number) =>
                      <p key={index}
                        className="bg-white/10 border border-white/25 text-center text-xs py-1 px-1 rounded-md"
                      >
                        {p}
                      </p>
                    )
                  }
                </div>
                <form action={deleteEvent.bind(null, event.event_id)} className="mt-auto">
                  <button className="w-full font-normal rounded-md px-4 py-2 text-foreground bg-purple-500/75">
                    Cancel Event
                  </button>
                </form>
              </div>
            )
          })
        }
      </div>
    </>
  )
}
