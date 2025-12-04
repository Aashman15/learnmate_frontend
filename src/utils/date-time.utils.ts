import { DateTime } from "luxon";

export function formatIso(isoString: string) {
  const dt = DateTime.fromISO(isoString, { zone: "utc" }).toLocal();

  return {
    date: dt.toFormat("MMM d, yyyy"),
    time: dt.toFormat("hh:mm a"),
  };
}
