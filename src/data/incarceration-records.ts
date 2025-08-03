import type { IncarcerationRecord } from "@/entities";

export const incarcerationRecords: IncarcerationRecord[] = [
  {
    id: "hendrik_van_dijk_1882_assault",
    person: {
      firstName: "Hendrik",
      lastName: "van Dijk",
      ageAtEvent: 45,
      birthplace: "Rotterdam",
    },
    date: "1882-07-20",
    location: "Amsterdam",
    details: {
      crime: "Mishandeling (Assault)",
      sentence: "Geldboete van 10 gulden, subs. 4 dagen gevangenisstraf",
      institution: "Arrondissementsrechtbank te Amsterdam",
      archiveReference: {
        accessNumber: "702",
        inventoryNumber: "190",
      },
      notes:
        "Defendant in assault case against Jan van der Berg. Crime occurred 15-06-1882 in Amsterdam. Both parties fought each other. Hendrik was a sjouwerman (stevedore) from Amsterdam.",
    },
  },
];
