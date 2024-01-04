import Link from 'next/link';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import EventifyLogo from '@/components/EventifyLogo';
import CreateEventForm from '@/components/CreateEventForm';

export default function Create() {

  const createEvent = async (participants : string[], clientTimestamp: string, formData: FormData) => {
    'use server'

    const title = formData.get('title') as string;
    const venue = formData.get('venue') as string;
    const venueType = formData.get('venueType') as string;
    const link = formData.get('link') as string;
    const description = formData.get('description') as string;
    const dateString = formData.get('date') as string;
    const timeString = formData.get('time') as string;

    // having to do this as timestamp generation code runs on server and does not have the client's time zone
    const eventDate = new Date(clientTimestamp);
    const [eventYear, eventMonth, eventDay] = dateString.split('-');
    const [eventHour, eventMinutes] = timeString.split(':');
    eventDate.setFullYear(parseInt(eventYear), parseInt(eventMonth)-1, parseInt(eventDay));
    eventDate.setHours(parseInt(eventHour), parseInt(eventMinutes));

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { data, error } = await supabase
      .from('event')
      .insert({
        user_id: user.id,
        title: title,
        description: (description ? description : null),
        venue: venue,
        remote: (venueType === "remote" ? true : false),
        link: (link ? link : ""),
        date_time: eventDate.toISOString(),
        participants: participants,
      })
      .select();

      if (error) {
        console.log(error);
        return redirect('/create?message=Event creation failed');
      }

      console.log(data);
      return redirect('/');
    }

    return redirect('/create?message=Event creation failed');
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

      <div className="flex flex-col w-full py-8 px-8 max-w-lg justify-center gap-2 my-auto bg-gradient-to-b from-white/40 via-white/30 to-white/20 rounded-xl shadow-lg backdrop-blur-xl">
        <p className="text-3xl font-bold text-white">
          Create Event
        </p>
        <CreateEventForm createEvent={createEvent} />
      </div>
    </>
  )
}