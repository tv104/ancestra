import { MilitaryRecord } from "@/entities";

export const militaryRecords: MilitaryRecord[] = [
  {
    id: "military-service-1833-pieter-van-dijk-rotterdam",
    type: "military_service",
    date: "1833-01-01",
    location: "Rotterdam",
    person: {
      firstName: "Pieter",
      lastName: "van Dijk",
      role: "Sniper",
    },
    organization: "Hollandse Mobiele Schutterij",
    archive: {
      accessNumber: "95",
      inventoryNumber:
        "110 sub. 235, 111 sub. 175, 112 sub. 150, 113 sub. 130, 114 sub. 105, 115 sub. 95, 116 sub. 80, 117 sub. 70, 175 sub. 235",
      source:
        "https://www.hollandsarchief.nl/onderzoek-het-zelf/archief/?mivast=240&mizig=865&miadt=240&miview=tbl&milang=nl&mif2=295&mizk_alle=van-dijk",
    },
    notes:
      "Militair Pieter van Dijk, Schutter. Geboortedatum: 12-08-1806. Geboorteplaats: Rotterdam. Jaar: 1833. Toegangsnummer: 95 Hollandse Mobiele Schutterij, 1830-1840.",
  },
];
