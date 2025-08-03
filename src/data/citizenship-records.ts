import { CitizenshipRecord } from "@/entities";

export const citizenshipRecords: CitizenshipRecord[] = [
  {
    id: "citizenship-1552-06-15-willem-van-der-berg",
    type: "citizenship",
    date: "1552-06-15",
    location: "Amsterdam",
    person: {
      firstName: "Willem",
      lastName: "van der Berg",
      prefix: "van",
    },
    archive: {
      accessNumber: "7388",
      inventoryNumber: "5675",
      source: "Amsterdam alfabetische indices op de poorterboeken 1500-1599",
    },
    notes: "poorter te Amsterdam, eed afgelegd",
  },
];
