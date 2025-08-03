import { BaptismWitnessRecord } from "@/entities";

export const baptismWitnessRecords: BaptismWitnessRecord[] = [
  {
    id: "baptism-1789-07-18-anna-de-vries",
    type: "church_event_witness",
    date: "1789-07-18",
    birthDate: "1789-07-15",
    location: "Rotterdam",
    church: "Nederduits Gereformeerd",
    people: [
      {
        firstName: "Anna",
        lastName: "de Vries",
        role: "Dopeling",
      },
      {
        firstName: "Hendrik",
        lastName: "de Vries",
        role: "Vader",
      },
      {
        firstName: "M[?]",
        lastName: "van der Berg",
        role: "Moeder",
      },
      {
        firstName: "Willem",
        lastName: "van Dijk",
        role: "Getuige",
      },
      {
        firstName: "Elisabeth",
        lastName: "van der Berg",
        role: "Getuige",
      },
    ],
    archive: {
      accessNumber: "7120",
      inventoryNumber: "4550",
      source: "Utrecht, opgave van gedoopten, 1780-1810 (c. 1825)",
    },
    notes: "Naam moeder onduidelijk",
  },
];
