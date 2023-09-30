// timeUtils.ts

import { format, addMinutes } from "date-fns";
import { utcToZonedTime, toDate, zonedTimeToUtc } from "date-fns-tz";

export function generateHourList(timezone: string): string[] {
  const startDate = toDate("2023-09-13T00:00:00", { timeZone: timezone });
  const endDate = toDate("2023-09-13T23:59:59", { timeZone: timezone });

  const startDateInTimezone = zonedTimeToUtc(startDate, timezone);
  const endDateInTimezone = zonedTimeToUtc(endDate, timezone);

  const hourList: string[] = [];
  const tz = timezone;

  let currentHour = startDateInTimezone;

  while (currentHour <= endDateInTimezone) {
    const zonedHour = utcToZonedTime(currentHour, tz);
    const formattedHour = format(zonedHour, "HH:mm");
    hourList.push(formattedHour);
    currentHour = addMinutes(currentHour, 30);
  }

  return hourList;
}

export function daysForLocale(localeName = "es-MX") {
  const { format } = new Intl.DateTimeFormat(localeName, { weekday: "long" });
  return [1, 2, 3, 4, 5, 6, 7].map((day) =>
    format(new Date(Date.UTC(2021, 5, day)))
  );
}

export function getNextDays(limit = 5) {
  const currentDate: Date = new Date();
  const nextDays: Date[] = [];

  for (let i: number = 1; i <= limit; i++) {
    const nextDate: Date = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + i);
    nextDays.push(nextDate);
  }

  return nextDays;
}

export function generateTimeSlots(
  start: string,
  end: string,
  intervalMinutes: number = 60
): string[] {
  const timeSlots: string[] = [];
  const startTime = new Date(`1970-01-01T${start}:00`);
  const endTime = new Date(`1970-01-01T${end}:00`);

  let currentTime = startTime;
  while (currentTime <= endTime) {
    const formattedTime = currentTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
    timeSlots.push(formattedTime);
    currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
  }

  return timeSlots;
}
export function generateHours(
  schedules: any[]
): { day: string; timeSlots: string[] }[] {
  if (!schedules) {
    console.log("no schedules provided");
    return [];
  }

  var data: { day: string; timeSlots: string[] }[] = [];
  for (let i = 0; i < schedules.length; i++) {
    const schedule = schedules[i];

    const intervalMinutes = 60;
    const days = schedule.days;
    const start = schedule.start;
    const end = schedule.end;

    const scheduleData = days.map((day: any) => {
      const timeSlots = generateTimeSlots(start, end, intervalMinutes);
      return {
        day,
        timeSlots,
      };
    });
    data = [...data, ...scheduleData];
  }
  return data;
}
