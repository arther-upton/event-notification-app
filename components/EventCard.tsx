'use client'

import { useState } from 'react';
import { Event } from '@/utils/types';

export default function EventCard({ event, deleteEvent }: { event: Event; deleteEvent: (eventId: string, formData: FormData) => Promise<void> }) {

    // this is probably being reinitialized on every re-render ??
    const deleteEventWithId = deleteEvent.bind(null, event.event_id);

    return (
        <div className="text-base font-light flex flex-col py-3 px-5 bg-gradient-to-b from-white/40 via-white/30 to-white/20 rounded-xl backdrop-blur-xlrounded-xl shadow-lg backdrop-blur-xl">
            <div className="flex flex-row justify-between align-middle items-center mb-2">
                <p className="text-xl font-bold">{event.title}</p>
                <p className="text-sm font-light">{(new Date(event.date_time)).toDateString()}{' '}{(new Date(event.date_time)).toLocaleString([], { hour: '2-digit', minute: '2-digit' })}</p>
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
            <form action={deleteEventWithId} className="mt-auto">
                <button className="w-full font-normal rounded-md px-4 py-2 text-foreground bg-purple-500/75">
                    Cancel Event
                </button>
            </form>
        </div>
    )
}