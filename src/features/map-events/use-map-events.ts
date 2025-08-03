import { EVENT_NAMES, EventName } from "@/entities";
import { MapEvent, mapEvents } from "./map-events";
import { useMemo } from "react";

type MapEvents = { 
    events: MapEvent[], 
    statistics: {
        totalEvents: number;
        timespan: {
            earliest: number;
            latest: number;
        };
        eventTypes: Record<EventName, number>;
        locations: number;
        people: number;
    }
}

export function useMapEvents(): MapEvents {
    const { events, statistics } = useMemo(() => {
        const events = mapEvents();
        
        const statistics = {
            totalEvents: events.length,
            timespan: {
                earliest: new Date(events[0].timestamp).getFullYear(),
                latest: new Date(events[events.length - 1].timestamp).getFullYear(),
            },
            eventTypes: EVENT_NAMES.reduce((acc, event) => {
                acc[event] = events.filter((e) => e.event.type === event).length;
                return acc;
            }, {} as Record<EventName, number>),
            locations: new Set(events.map((e) => e.location.name)).size,
            people: new Set(events.map((e) => e.person.fullName)).size,
        };
        
        return { events, statistics };
    }, []);
    
    return { events, statistics };
}