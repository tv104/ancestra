import { NotaryRecord } from "@/entities";

export const notaryRecords: NotaryRecord[] = [
  {
    id: "notarial-testament-1769-08-15-amsterdam-van-dijk-family",
    date: "1769-08-15",
    location: "Amsterdam",
    notaryType: "Notariële akte",
    person: {
      firstName: "Willem",
      lastName: "van Dijk",
    },
    archive: {
      accessNumber: "5026",
      inventoryNumber: "4239",
      source: "Akten van notaris Pieter van der Berg te Amsterdam, 1769-1770",
    },
    notes:
      "Testament te Amsterdam, 15-08-1769, Aktenummer: 602. Notaris: Pieter van der Berg. van Dijk family members mentioned: Hendrik van Dijk (Genoemde), Anna van Dijk (Genoemde), Pieter van Dijk (Genoemde), Maria van Dijk (Genoemde), Willem van Dijk (Genoemde). Other parties: Jan van der Berg (Comparant), Elisabeth de Vries (Overledene), Hendrik van der Berg (Genoemde), Pieter de Vries (Getuige), Willem van der Berg (Getuige).",
  },
];
