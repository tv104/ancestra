import { DeathRecord } from "@/entities";

export const deathRecords: DeathRecord[] = [
  {
    id: "996-AMS-20-1672",
    person: {
      firstName: "[?]",
      lastName: "van Dijk"
    },
    burialDate: "1672-05-12",
    burialPlace: "Amsterdam",
    relatedPerson: {
      firstName: "Willem Pieterse",
      lastName: "van Dijk",
      relationship: "Child of",
    },
    archiveInfo: {
      accessNumber: "996",
      inventoryNumber: "AMS-20",
      source:
        "DTBL Amsterdam 20 (Rekeningen van de kerkmeesters van inkomsten en uitgaven van begravingen, 1640-1680)",
    },
    notes: "Child of Willem Pieterse van Dijk",
  },
];
