import { DateString } from "./date-model";

export function getDateParts(date: DateString): {
    year: number;
    month: number;
    day: number;
  } {
    const [year, month, day] = date.split("-").map(Number);
    return { year, month, day };
  }
  
export function getTimestamp(date: DateString): number {
  const { year, month, day } = getDateParts(date);
  const timestamp = new Date(year, month - 1, day).getTime();

  if (isNaN(timestamp)) {
    throw new Error(`Invalid date: ${date}`);
  }

  return timestamp;
}

export function getFormattedDate(timestamp: number): string {
  const date = new Date(timestamp);

  if (isNaN(date.getTime())) {
    throw new Error(`Invalid timestamp: ${timestamp}`);
  }

  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function getDateDetails(date: DateString): { timestamp: number, formattedDate: string } {
  const timestamp = getTimestamp(date);
  const formattedDate = getFormattedDate(timestamp);

  return { timestamp, formattedDate };
}
