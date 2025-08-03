import { useState, useMemo } from "react";
import { EventName } from "./entities";
import { TimeSlider, Map, EventsFilter, useMapEvents } from "./features";

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
    return events.filter((event) => activeEventTypes.has(event.event.type));
  }, [activeEventTypes, events]);

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col overflow-hidden">
      <main className="flex-1 flex gap-3 p-3 overflow-hidden">
        <div className="grid grid-cols-5 gap-3 w-full h-full">
          <div className="col-span-1 space-y-3 flex flex-col h-full">
            <div className="flex-1">
              <EventsFilter
                activeEventTypes={activeEventTypes}
                onEventTypeToggle={handleEventTypeToggle}
                eventCounts={statistics.eventTypes}
                className="h-full"
              />
            </div>

            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-400 mb-1">
                    Speed: {playbackSpeed}
                  </div>
                  <input
                    type="range"
                    min={1000}
                    max={10000}
                    value={playbackSpeed}
                    onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                    className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <div className="text-xs text-gray-400 mb-1">
                    Window: {timeWindowDays}d
                  </div>
                  <input
                    type="range"
                    min={365}
                    max={3650}
                    value={timeWindowDays}
                    onChange={(e) => setTimeWindowDays(Number(e.target.value))}
                    className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-4 flex flex-col gap-3 h-full">
            <div className="flex-shrink-0">
              <TimeSlider
                minYear={statistics.timespan.earliest}
                maxYear={statistics.timespan.latest}
                currentDate={currentDate}
                onDateChange={setCurrentDate}
                isPlaying={isPlaying}
                onPlayToggle={handlePlayToggle}
                playbackSpeed={playbackSpeed}
                className="bg-gray-800 border border-gray-700"
              />
            </div>

            <div className="flex-1 bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
              <Map
                events={filteredEvents}
                currentDate={currentDate}
                timeWindowDays={timeWindowDays}
                className="h-full"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
