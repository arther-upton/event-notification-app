import Link from 'next/link';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import EventCard from '@/components/EventCard';
import { Event } from '@/utils/types';
import { PostgrestError } from '@supabase/supabase-js';

export default async function Events() {

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data, error }: {data: Event[] | null; error: PostgrestError | null} = await supabase
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
          data?.map((event: Event, index: number) => {
            return (
              <EventCard key={index} event={event} deleteEvent={deleteEvent}/>
            )
          })
        }
      </div>
    </>
  )
}
