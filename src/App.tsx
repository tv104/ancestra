import { useState, useMemo, useRef, useEffect } from "react";
import { EventName } from "./entities";
import {
  TimeSlider,
  Map,
  EventsFilter,
  useMapEvents,
  PersonFilter,
} from "./features";
import { ArrowLeftToLine, ArrowRightToLine } from "lucide-react";

function App() {
  const { events, statistics } = useMapEvents();
  const containerRef = useRef(null)

  const [currentDate, setCurrentDate] = useState(
    new Date(statistics.timespan.earliest, 0, 1)
  );
  const [isSidebarVisible, setIsSidebarVisible] = useState(false)
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

  const handleToggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible)
  }

  const prevWidth = useRef(0);

  useEffect(() => {
    const obs = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      const crossedOver = prevWidth.current < 960 && width >= 960;
      const crossedUnder = prevWidth.current >= 960 && width < 960;

      if (crossedOver || crossedUnder) setIsSidebarVisible(width > 960);

      prevWidth.current = width;
    });

    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="h-[100dvh] bg-gray-900 flex flex-col" ref={containerRef}>
      <main className="flex-1 flex gap-0 p-0 lg:gap-3 lg:p-3 overflow-hidden">
        <div className="flex-1 flex gap-0 lg:gap-3 w-full h-full">
          <div className="flex-1 flex flex-col gap-0 lg:gap-3 h-full min-h-0">
            <div className="flex-1 flex-shrink-1 bg-gray-800 lg:rounded-lg overflow-hidden border border-gray-700 relative">
              <Map
                events={filteredEvents}
                currentDate={currentDate}
                timeWindowDays={timeWindowDays}
                className="isolate z-0"
              />
              <button
                onClick={handleToggleSidebar}
                className="absolute top-3 right-3 isolate z-1 flex items-center gap-1 px-2 py-1 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded transition-colors"
                title={isSidebarVisible ? 'Hide sidebar' : 'Show sidebar'}
              >
                {isSidebarVisible ? (
                  <ArrowRightToLine className="w-5 h-5" />
                ) : (
                  <ArrowLeftToLine className="w-5 h-5" />
                )}
              </button>
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
                events={filteredEvents}
              />
            </div>
          </div>
          <div className={`flex gap-3 flex-col h-full overflow-hidden relative ${isSidebarVisible ? 'w-[300px]' : 'w-0'}`}>
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
        </div>
      </main>
    </div>
  );
}

export default App;
