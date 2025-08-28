import React, { useMemo } from "react";
import { EVENT_TYPE_CONFIG, EVENT_NAMES, EventName } from "@/entities";
import { MapEvent } from "../../map-events";

interface RangeIndicatorsProps {
  minYear: number;
  currentYear: number;
  maxYear: number;
  events: MapEvent[];
  className?: string;
}

type YearBin = {
  year: number;
  total: number;
  typeCounts: Partial<Record<EventName, number>>;
};

export const RangeIndicators: React.FC<RangeIndicatorsProps> = ({
  minYear,
  currentYear,
  maxYear,
  events,
  className = "",
}) => {
  const { bins, maxTotal } = useMemo(() => {
    const safeMinYear = Math.min(minYear, maxYear);
    const safeMaxYear = Math.max(minYear, maxYear);
    const numYears = safeMaxYear - safeMinYear + 1;
    const years: YearBin[] = Array.from({ length: numYears }, (_, i) => ({
      year: safeMinYear + i,
      total: 0,
      typeCounts: {},
    }));

    for (const ev of events) {
      const eventYear = new Date(ev.timestamp).getFullYear();
      if (eventYear < safeMinYear || eventYear > safeMaxYear) continue;
      const idx = eventYear - safeMinYear;
      const bin = years[idx];
      bin.total += 1;
      bin.typeCounts[ev.event.type] = (bin.typeCounts[ev.event.type] || 0) + 1;
    }

    let globalMax = 0;
    for (const bin of years) {
      if (bin.total > globalMax) globalMax = bin.total;
    }

    return { bins: years, maxTotal: globalMax };
  }, [events, minYear, maxYear]);

  const nonEmptyBins = useMemo(() => {
    return bins
      .filter((b) => b.total > 0)
      .map((b) => {
        let bestType: EventName = EVENT_NAMES[0];
        let bestCount = -1;
        for (const type of EVENT_NAMES) {
          const count = b.typeCounts[type] ?? 0;
          if (count > bestCount) {
            bestType = type;
            bestCount = count;
          }
        }
        return { year: b.year, total: b.total, dominantType: bestType };
      });
  }, [bins]);

  const minRadiusPx = 2;
  const maxRadiusPx = 24;
  const positionDenominator = Math.max(1, maxYear - minYear);

  return (
    <div className={`relative w-full h-[80px] ${className}`}>
      <div className="absolute inset-0">
        {nonEmptyBins.map((bin) => {
          const xPercent = ((bin.year - minYear) / positionDenominator) * 100;
          const normalized = maxTotal > 0 ? Math.sqrt(bin.total / maxTotal) : 0;
          const radius = minRadiusPx + normalized * (maxRadiusPx - minRadiusPx);
          const color = EVENT_TYPE_CONFIG[bin.dominantType].color;

          return (
            <div
              key={bin.year}
              style={{
                position: "absolute",
                left: `${xPercent}%`,
                bottom: "0%",
                width: `${radius * 2}px`,
                height: `${radius * 2}px`,
                marginLeft: `-${radius}px`,
                marginTop: `-${radius}px`,
                borderRadius: "9999px",
                backgroundColor: color,
                opacity: 0.5,
                boxShadow: "0 0 0 1px rgba(0,0,0,0.25)",
              }}
            />
          );
        })}
      </div>

      <div className="relative z-10 flex w-full justify-between text-lg text-zinc-200 h-full items-top pointer-events-none pt-1">
        <span className="">{minYear}</span>
        <span className=" font-semibold text-historical-400">
          {currentYear}
        </span>
        <span className="">{maxYear}</span>
      </div>
    </div>
  );
};
