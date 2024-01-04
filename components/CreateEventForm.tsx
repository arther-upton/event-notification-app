'use client'

import { useState } from 'react';

export default function CreateEventForm({ createEvent }: { createEvent: (participants: string[], formData: FormData) => Promise<void> }) {

    const [participants, setParticipants] = useState<string[]>([]);
    const [participantEmail, setParticipantEmail] = useState<string>("");
    const [remoteBool, setRemoteBool] = useState<boolean>(false);

    // this is probably being reinitialized on every re-render ??
    const createEventWithParticipants = createEvent.bind(null, participants);

    const participantChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setParticipantEmail(event.target.value);
    }

    const addParticipant = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log("added: " + participantEmail);
        setParticipants((prevParticipants) => [...prevParticipants, participantEmail]);
    }

    return (
        <form
            className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground mt-3"
            action={createEventWithParticipants}
        >

            <label className="text-lg font-semibold" htmlFor="title">
                Title
            </label>
            <input
                className="rounded-md px-4 py-2 bg-inherit border-2 border-white/25 mb-2 placeholder-white placeholder-opacity-50 focus:outline-purple-300"
                name="title"
                placeholder="Future Fest"
                required
                type="text"
            />

            <label className="text-lg font-semibold" htmlFor="venue">
                Venue
            </label>
            <input
                className="rounded-md px-4 py-2 bg-inherit border-2 border-white/25 mb-2 placeholder-white placeholder-opacity-50 focus:outline-purple-300"
                name="venue"
                placeholder="Expo Center, Lahore"
                required
                type="text"
            />

            <div className="grid grid-cols-2 gap-2 rounded-md bg-inherit border-2 border-white/25 mb-2 p-1">
                <div>
                    <input type="radio" name="venueType" id="onsite" value="onsite" className="peer hidden"
                        checked={remoteBool == false}
                        onChange={() => { setRemoteBool(false) }}
                    />
                    <label htmlFor="onsite" className="block cursor-pointer select-none rounded-md px-3 py-2 text-center peer-checked:bg-purple-500/75 peer-checked:font-bold peer-checked:text-white">Onsite</label>
                </div>
                <div>
                    <input type="radio" name="venueType" id="remote" value="remote" className="peer hidden"
                        checked={remoteBool == true}
                        onChange={() => { setRemoteBool(true) }}
                    />
                    <label htmlFor="remote" className="block cursor-pointer select-none rounded-md px-3 py-2 text-center peer-checked:bg-purple-500/75 peer-checked:font-bold peer-checked:text-white">Remote</label>
                </div>
            </div>

            <label className="text-lg font-semibold" htmlFor="link">
                Link
            </label>
            <input
                disabled={!remoteBool}
                className="disabled:bg-slate-600/20 rounded-md px-4 py-2 bg-inherit border-2 border-white/25 mb-2 placeholder-white placeholder-opacity-50 focus:outline-purple-300"
                name="link"
                placeholder="https://meet.google.com/abc-defg-hij"
                required
                type="url"
            />

            <label className="text-lg font-semibold" htmlFor="description">
                Description
            </label>
            <textarea
                className="rounded-md px-4 py-2 bg-inherit border-2 border-white/25 mb-2 placeholder-white placeholder-opacity-50 focus:outline-purple-300"
                name="description"
                placeholder="Describe the event"
            />

            <label className="text-lg font-semibold" htmlFor="date">
                Date
            </label>
            <input
                className="rounded-md px-4 py-2 bg-inherit border-2 border-white/25 mb-2 placeholder-white placeholder-opacity-50 focus:outline-purple-300"
                name="date"
                placeholder="..."
                required
                type="date"
            />

            <label className="text-lg font-semibold" htmlFor="time">
                Time
            </label>
            <input
                className="rounded-md px-4 py-2 bg-inherit border-2 border-white/25 mb-2 placeholder-white placeholder-opacity-50 focus:outline-purple-300"
                name="time"
                placeholder="..."
                required
                type="time"
            />

            <label className="text-lg font-semibold" htmlFor="participant">
                Participants
            </label>
            <div className="flex items-center w-full gap-2">
                <input
                    className="w-full rounded-md px-4 py-2 bg-inherit border-2 border-white/25 mb-2 placeholder-white placeholder-opacity-50 focus:outline-purple-300"
                    name="participant"
                    placeholder="Enter participant email"
                    type="email"
                    value={participantEmail}
                    onChange={participantChange}
                />
                <button
                    onClick={addParticipant}
                    className="text-xl rounded-md px-4 py-2 text-foreground mb-2 bg-orange-600 hover:bg-white/30 transition-colors duration-300 transform"
                    type="button"
                >+</button>
            </div>

            <div className="w-full grid grid-cols-2 gap-2">
                {
                    participants.map((p: string, index: number) => 
                        <p key={index}
                            className="bg-white/10 border border-white/25 text-center text-xs py-1 px-1 rounded-md"
                        >
                            {p}
                        </p>
                    )
                }
            </div>

            <button className="bg-orange-600 rounded-md px-4 py-2 text-foreground mb-2">
                Create
            </button>

            {/* {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/20 text-foreground text-center rounded-md">
              {searchParams.message}
            </p>
          )} */}
        </form>
    )
}