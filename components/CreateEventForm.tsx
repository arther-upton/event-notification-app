'use client'

import { useState } from 'react';
import { useFormStatus } from 'react-dom';

export function CreateButton({ disabledCheck } : { disabledCheck: boolean }) {

    const { pending } = useFormStatus();

    return (
        <button type="submit" aria-disabled={disabledCheck || pending} disabled={disabledCheck || pending} className="bg-orange-600 rounded-md px-4 py-2 text-foreground mb-2 disabled:bg-orange-500/60">
            {pending ? "Creating..." : "Create"}
        </button>
    )
}

export default function CreateEventForm({ createEvent }: { createEvent: (participants: string[], clientTimestamp: string, formData: FormData) => Promise<void> }) {

    const [snackBarOpen, setSnackBarOpen] = useState<boolean>(false);
    const [snackBarMessage, setSnackBarMessage] = useState<string>("");
    const [participants, setParticipants] = useState<string[]>([]);
    const [participantEmail, setParticipantEmail] = useState<string>("");
    const [eventDate, setEventDate] = useState<string>("");
    const [remoteBool, setRemoteBool] = useState<boolean>(false);

    // this is probably being reinitialized on every re-render ??
    const createEventWithParams = createEvent.bind(null, participants, new Date().toISOString());

    const participantChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setParticipantEmail(event.target.value);
    }

    const dateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEventDate(event.target.value);
        console.log(event.target.value);
    }

    const addParticipant = (event: React.MouseEvent<HTMLButtonElement>) => {

        if (!(/\S+@\S+\.\S+/.test(participantEmail))) {
            setSnackBarOpen(true);
            setSnackBarMessage("Invalid Email!");
        }

        console.log("added: " + participantEmail);
        setParticipants((prevParticipants) => [...prevParticipants, participantEmail]);
        setParticipantEmail('');
    }

    const validateTime = (event: React.ChangeEvent<HTMLInputElement>) => {

        console.log("time changed:" + event.target.value);
    }

    return (
        <form
            className="animate-in flex-1 flex flex-row w-full gap-10 text-foreground mt-3"
            action={createEventWithParams}
        >
            <div className="flex flex-col gap-2 min-w-[20vw]">
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
                    className="min-h-[15vh] rounded-md px-4 py-2 bg-inherit border-2 border-white/25 mb-2 placeholder-white placeholder-opacity-50 focus:outline-purple-300"
                    name="description"
                    placeholder="Describe the event"
                />
            </div>

            <div className="flex flex-col gap-2 min-w-[20vw]">
                <label className="text-lg font-semibold" htmlFor="date">
                    Date
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border-2 border-white/25 mb-2 placeholder-white placeholder-opacity-50 focus:outline-purple-300"
                    name="date"
                    placeholder="..."
                    required
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    onChange={dateChange}
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
                    min={
                        eventDate === (new Date().toISOString().split('T')[0]) ?
                        new Date(Date.now() + 60 * 60 * 1000).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' }) :
                        undefined
                    }
                    onChange={validateTime}
                />

                <label className="text-lg font-semibold" htmlFor="participant">
                    Participants
                </label>
                <div className="flex items-center w-full gap-2">
                    <input
                        className="w-full rounded-md px-4 py-2 bg-inherit border-2 border-white/25 placeholder-white placeholder-opacity-50 focus:outline-purple-300"
                        name="participant"
                        placeholder="Enter participant email"
                        type="email"
                        value={participantEmail}
                        onChange={participantChange}
                    />
                    <button
                        onClick={addParticipant}
                        className="text-xl rounded-md px-4 py-2 text-foreground bg-orange-600 hover:bg-white/30 transition-colors duration-300 transform"
                        type="button"
                    >+</button>
                </div>

                <div className="w-full grid grid-cols-2 gap-2 mb-2">
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

                <CreateButton disabledCheck={participants.length === 0 ? false : false}/>

                <div className="flex flex-row justify-between ml-auto mt-auto animate-in gap-2 align-middle items-center bg-white/10 border border-white/25 rounded-xl px-2 py-2">
                    <p className="">
                        Snack Message!
                    </p>
                    <button
                        onClick={() => {setSnackBarOpen(false)}}
                        className="rounded-md px-2 py-2 text-foreground bg-orange-600 hover:bg-white/30 transition-colors duration-300 transform"
                        type="button"
                    >
                        <svg width="10px" height="10px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className="hover:scale-110 transition-all ease-in-out">
                            <path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="currentColor" />
                        </svg>
                    </button>
                </div>
            </div>
        </form>
    )
}