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

  const data = [
    {
      event_id: '864acb58-af0b-45bb-9a51-ea8aac358de8',
      user_id: 'f47dc834-88d9-4f28-83af-181f5b5fb05c',
      title: 'Future Fest',
      description: 'good ok ',
      venue: 'Expo Center, Lahore',
      remote: false,
      link: '',
      date_time: '2024-01-26T12:00:50.897+00:00',
      created_at: '2024-01-04T12:01:34.189472+00:00',
      participants: [
        'abdullahumer575@gmail.com',
        'anyotheremail@emailserver.com',
        'yetanotheremail@abc.com'
      ]
    },
    {
      event_id: '4685bc52-1433-4d3c-b9f9-6ce13d9a7dfe',
      user_id: 'f47dc834-88d9-4f28-83af-181f5b5fb05c',
      title: 'Another Event',
      description: 'good event',
      venue: 'test venue',
      remote: false,
      link: '',
      date_time: '2024-01-17T13:24:44.819+00:00',
      created_at: '2024-01-04T13:21:47.433394+00:00',
      participants: [ 'testemail@test.com', 'another@test.com' ]
    }
  ]
  // const { data, error } = await supabase
  //   .from('event')
  //   .select()
  //   .eq('user_id', user.id);

  // if (error) {
  //   console.log(error);
  // }

  // console.log(data);

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

      <div className="w-[80vw] mt-28 h-full grid grid-cols-3 gap-2 border border-red-500">
        
        <p className="border border-red-600">abc</p>
        <p className="border border-red-600">123</p>
        <p className="border border-red-600">abc</p>
        <p className="border border-red-600">123</p>
        <p className="border border-red-600">abc</p>
        <p className="border border-red-600">123</p>

        {/* <div className="py-3 bg-gradient-to-b from-white/40 via-white/30 to-white/20 rounded-xl shadow-lg backdrop-blur-xlrounded-xl shadow-lg backdrop-blur-xl">

        </div> */}
        {/* <div className="text-3xl font-bold text-white">
        {
          data?.map((event, index: number) => {
            return <p key={index}
              className="py-3 border-b border-white bg-gradient-to-b from-white/40 via-white/30 to-white/20 rounded-xl shadow-lg backdrop-blur-xlrounded-xl shadow-lg backdrop-blur-xl"
            >
              {event.title}
            </p>
          })
        }
        </div> */}
      </div>
    </>
  )
}
