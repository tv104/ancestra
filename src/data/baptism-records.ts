import { BaptismRecord } from '@/entities'

export const baptismRecords: BaptismRecord[] = [
  {
    id: "baptism-1790-05-12-willem",
    type: "baptism",
    date: "1790-05-12",
    birthDate: "1790-05-06",
    location: "Leiden",
    church: "Nederduits Gereformeerd",
    people: [
      {
        firstName: "Willem",
        lastName: "van der Berg",
        role: "Dopeling",
      },
      {
        firstName: "Hendrik",
        lastName: "van der Berg",
        role: "Vader",
      },
      {
        firstName: "Maria",
        lastName: "de Vries",
        role: "Moeder",
      },
      {
        firstName: "Anna",
        lastName: "van Dijk",
        role: "Getuige",
      },
    ],
    archive: {
      accessNumber: "7120",
      inventoryNumber: "4550",
      source: "Leiden, opgave van gedoopten, 1780-1810 (c. 1825)",
    },
  },
];
