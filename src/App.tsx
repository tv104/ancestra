import { useState, useMemo } from "react";
import { EventName } from "./entities";
import {
  TimeSlider,
  Map,
  EventsFilter,
  useMapEvents,
  PersonFilter,
} from "./features";

function App() {
  const { events, statistics } = useMapEvents();

  const [currentDate, setCurrentDate] = useState(
    new Date(statistics.timespan.earliest, 0, 1)
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(100000); // days per second
  const [activeEventTypes, setActiveEventTypes] = useState<Set<EventName>>(
    new Set(Object.keys(statistics.eventTypes) as EventName[])
  );
  const [timeWindowDays, setTimeWindowDays] = useState(3650);
  const [personFirstInput, setPersonFirstInput] = useState<string>("");
  const [personLastInput, setPersonLastInput] = useState<string>("");

  const handleEventTypeToggle = (eventType: EventName) => {
    setActiveEventTypes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(eventType)) {
        newSet.delete(eventType);
      } else {
        newSet.add(eventType);
      }
      return newSet;
    });
  };

  const filteredEvents = useMemo(() => {
    const parseNames = (input: string): string[] =>
      input
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

    const firstNames = parseNames(personFirstInput);
    const lastNames = parseNames(personLastInput);
    const hasFirstFilters = firstNames.length > 0;
    const hasLastFilters = lastNames.length > 0;

    const matchesFirst = (name: string) => {
      if (!hasFirstFilters) return true;
      const candidate = name.toLowerCase();
      return firstNames.some((f) => candidate.includes(f.toLowerCase()));
    };

    const matchesLast = (name: string) => {
      if (!hasLastFilters) return true;
      const candidate = name.toLowerCase();
      return lastNames.some((l) => candidate.includes(l.toLowerCase()));
    };

    return events.filter((event) => {
      if (!activeEventTypes.has(event.event.type)) return false;
      const firstOk = matchesFirst(event.person.firstName || "");
      const lastOk = matchesLast(event.person.lastName || "");
      return firstOk && lastOk;
    });
  }, [activeEventTypes, events, personFirstInput, personLastInput]);

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col overflow-hidden">
      <main className="flex-1 flex gap-3 p-3 overflow-hidden">
        <div className="grid grid-cols-5 gap-3 w-full h-full">
          <div className="col-span-1 space-y-3 flex flex-col h-full">
            <EventsFilter
              activeEventTypes={activeEventTypes}
              onEventTypeToggle={handleEventTypeToggle}
              eventCounts={statistics.eventTypes}
            />

            <PersonFilter
              firstInput={personFirstInput}
              lastInput={personLastInput}
              onFirstInputChange={setPersonFirstInput}
              onLastInputChange={setPersonLastInput}
              className="flex-1"
            />
          </div>

          <div className="col-span-4 flex flex-col gap-3 h-full">
            <div className="flex-1 bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
              <Map
                events={filteredEvents}
                currentDate={currentDate}
                timeWindowDays={timeWindowDays}
                className="h-full"
              />
            </div>
            <div className="flex-shrink-0">
              <TimeSlider
                minYear={statistics.timespan.earliest}
                maxYear={statistics.timespan.latest}
                currentDate={currentDate}
                onDateChange={setCurrentDate}
                isPlaying={isPlaying}
                onPlayToggle={handlePlayToggle}
                playbackSpeed={playbackSpeed}
                onPlaybackSpeedChange={(v) => setPlaybackSpeed(v)}
                timeWindowDays={timeWindowDays}
                onTimeWindowDaysChange={(v) => setTimeWindowDays(v)}
                className="bg-gray-800 border border-gray-700"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
