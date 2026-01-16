import type {
  BaptismRecord,
  BaptismWitnessRecord,
  BirthRecord,
  ChurchMembershipRecord,
  CitizenshipRecord,
  DeathRecord,
  IncarcerationRecord,
  MaritimeRecord,
  MarriageRecord,
  MedicalRecord,
  MilitaryRecord,
  NotaryRecord,
  OtherRecord,
  TollRecord,
  UniversityRecord,
} from "@/entities";
import { LOCATION_NAMES, type LocationName } from "@/entities/location/location-model";

const FIRST_NAMES_MALE = [
  "Jan", "Pieter", "Willem", "Cornelis", "Hendrik", "Johannes", "Jacobus",
  "Adriaan", "Anthonie",
];

const FIRST_NAMES_FEMALE = [
  "Maria", "Anna", "Elisabeth", "Catharina", "Johanna", "Cornelia",
  "Margaretha", "Helena"
];

const LAST_NAMES = [
  "van Dijk", "de Vries", "Jansen", 
];

const PATRONYMS = [
  "Pieterse", "Willems", "Janse", "Cornelisse", 
];

const CHURCH_NAMES = [
  "St. Pieterskerk", "Onze-Lieve-Vrouwekerk", "St. Bavokerk", "St. Janskerk",
  "Grote Kerk", "Nieuwe Kerk", "Oude Kerk", "Westerkerk", "Noorderkerk",
  "Zuiderkerk", "St. Laurenskerk", "Domkerk", "Martinikerk", "Stevenskerk",
];

const SHIP_NAMES = [
  "De Zwaluw", "Het Wapen van Amsterdam", "De Vergulde Draak", "De Eendracht",
  "De Hollandia", "Het Zeepaard", "De Windhond", "De Batavia", "De Duyfken",
  "De Liefde", "De Halve Maen", "De Amsterdam", "Het Wapen van Zeeland",
  "De Gelderland", "De Utrecht", "De Groningen", "De Friesland", "De Rotterdam",
];

const UNIVERSITY_NAMES = [
  "Universiteit Leiden", "Universiteit Utrecht", "Universiteit Leuven",
  "Universiteit Groningen", "Universiteit Franeker", "Universiteit Harderwijk",
];

const HOSPITAL_NAMES = [
  "St. Elisabethgasthuis", "Onze Lieve Vrouwe Gasthuis", "Binnengasthuis",
  "Buitengasthuis", "Pesthuis", "Leprozenhuis", "Dolhuis", "St. Jacobsgasthuis",
];

const CRIMES = [
  "theft", "public intoxication"
];

const SENTENCES = [
  "1 day in jail", "3 days in jail", "1 week of forced labor",
];

const NOTARY_TYPES = [
  "Property registration", "Litigation", "Testament", "Witness Testimony",
] as const;

const MILITARY_ROLES = [
  "Captain", "Colonel", "Commander", "Councilor of War", "Guard", "Knight",
  "Lieutenant General", "Militia", "Officer", "Sergeant Major", "Sniper",
  "Soldier", "Veteran",
] as const;

const MARITIME_FUNCTIONS = [
  "Opperstuurman", "Matroos", "Soldaat", "Jongen", "Hooploper", "Zwaardveger"
] as const;

const SERVICE_TYPES = [
  "Koninklijke Marine", "Admiraliteit van Amsterdam",
  "Admiraliteit van Zeeland", "WIC",
];

const UNIVERSITY_FACULTIES = [
  "Theologie", "Rechten", "Medicijnen", "Filosofie", "Letteren",
];

const PRODUCTS = [
  { product: "Wijn", modernName: "Wine" },
  { product: "Bier", modernName: "Beer" },
  { product: "Zout", modernName: "Salt" },
  { product: "Haring", modernName: "Herring" },
  { product: "Tarwe", modernName: "Wheat" },
  { product: "Wol", modernName: "Wool" },
  { product: "Laken", modernName: "Cloth" },
  { product: "Specerijen", modernName: "Spices" },
];

const MAJOR_CITIES: LocationName[] = [
  "Amsterdam", "Rotterdam", "Antwerpen", "Brugge", "Gent", "Goes", "Utrecht"
];

const SECONDARY_CITIES: LocationName[] = [
  "Hulst", "Terneuzen", "Veere"
];

let seed = 12345;

function seededRandom(): number {
  seed = (seed * 1103515245 + 12345) & 0x7fffffff;
  return seed / 0x7fffffff;
}

function randomInt(min: number, max: number): number {
  return Math.floor(seededRandom() * (max - min + 1)) + min;
}

function randomElement<T>(arr: readonly T[]): T {
  return arr[randomInt(0, arr.length - 1)];
}

function generateYear(): number {
  const u = seededRandom();
  const linear = 1- (1 - u) * (1 - u);
  return Math.round(1000 + linear * 1000);
}

function generateDate(): `${number}-${string}-${string}` {
  const year = generateYear();
  const month = String(randomInt(1, 12)).padStart(2, "0");
  const day = String(randomInt(1, 28)).padStart(2, "0");
  return `${year}-${month}-${day}` as `${number}-${string}-${string}`;
}

function generateLocation(): LocationName {
  return seededRandom() < 0.70 ? randomElement(MAJOR_CITIES) : randomElement(SECONDARY_CITIES);
}

function generateMaleName() {
  return {
    firstName: randomElement(FIRST_NAMES_MALE),
    patronym: seededRandom() > 0.5 ? randomElement(PATRONYMS) : undefined,
    lastName: randomElement(LAST_NAMES),
  };
}

function generateFemaleName() {
  return {
    firstName: randomElement(FIRST_NAMES_FEMALE),
    patronym: seededRandom() > 0.5 ? randomElement(PATRONYMS) : undefined,
    lastName: randomElement(LAST_NAMES),
  };
}

function generatePerson() {
  return seededRandom() > 0.5 ? generateMaleName() : generateFemaleName();
}

function generateArchive() {
  return {
    accessNumber: `${randomInt(100, 999)}`,
    inventoryNumber: `${randomElement(["A", "B", "C", "D"])}-${randomInt(1, 500)}`,
    source: `Archive ${randomElement(["Municipality", "Province", "National", "Church"])} ${randomElement(LOCATION_NAMES)}`,
  };
}

function generateBirthRecord(index: number): BirthRecord {
  return {
    id: `gen-birth-${index}`,
    person: generatePerson(),
    date: generateDate(),
    location: generateLocation(),
    metadata: {
      source: randomElement([
        "doopregister", "geboorteakte", "inferred-from-marriage-certificate",
        "familieregister", "bevolkingsregister",
      ]),
      notes: seededRandom() > 0.7 ? `Generated record ${index}` : undefined,
    },
  };
}

function generateDeathRecord(index: number): DeathRecord {
  return {
    id: `gen-death-${index}`,
    person: generatePerson(),
    burialDate: generateDate(),
    burialPlace: generateLocation(),
    cemetery: seededRandom() > 0.5 ? `Kerkhof ${randomElement(CHURCH_NAMES)}` : undefined,
  };
}

function generateBaptismRecord(index: number): BaptismRecord {
  const child = generatePerson();
  const father = generateMaleName();
  const mother = generateFemaleName();
  
  return {
    id: `gen-baptism-${index}`,
    type: "baptism",
    date: generateDate(),
    location: generateLocation(),
    church: randomElement(CHURCH_NAMES),
    people: [
      { ...child, role: "Dopeling" },
      { ...father, role: "Vader" },
      { ...mother, role: "Moeder" },
      { ...generatePerson(), role: "Getuige" },
    ],
    archive: generateArchive(),
  };
}

function generateBaptismWitnessRecord(index: number): BaptismWitnessRecord {
  const child = generatePerson();
  const witness = generatePerson();
  
  return {
    id: `gen-witness-${index}`,
    type: "church_event_witness",
    date: generateDate(),
    location: generateLocation(),
    church: randomElement(CHURCH_NAMES),
    people: [
      { ...child, role: "Dopeling" },
      { ...witness, role: "Getuige" },
    ],
    archive: generateArchive(),
  };
}

function generateMarriageRecord(index: number): MarriageRecord {
  const isBride = seededRandom() > 0.5;
  const person = isBride ? generateFemaleName() : generateMaleName();
  
  return {
    id: `gen-marriage-${index}`,
    date: generateDate(),
    location: generateLocation(),
    person: { ...person, role: isBride ? "Bruid" : "Bruidegom" },
    notes: `Huwelijk geregistreerd in ${randomElement(CHURCH_NAMES)}`,
  };
}

function generateChurchMembershipRecord(index: number): ChurchMembershipRecord {
  return {
    id: `gen-church-membership-${index}`,
    date: generateDate(),
    location: generateLocation(),
    person: generatePerson(),
    organization: randomElement(CHURCH_NAMES),
    archive: generateArchive(),
  };
}

function generateCitizenshipRecord(index: number): CitizenshipRecord {
  return {
    id: `gen-citizenship-${index}`,
    type: "citizenship",
    date: generateDate(),
    location: generateLocation(),
    person: generatePerson(),
    archive: generateArchive(),
    notes: `Poorterschap verleend`,
  };
}

function generateIncarcerationRecord(index: number): IncarcerationRecord {
  return {
    id: `gen-incarceration-${index}`,
    person: {
      ...generatePerson(),
      ageAtEvent: randomInt(18, 60),
      birthplace: generateLocation(),
    },
    date: generateDate(),
    location: generateLocation(),
    details: {
      crime: randomElement(CRIMES),
      sentence: randomElement(SENTENCES),
      institution: `Tuchthuis ${randomElement(LOCATION_NAMES)}`,
      physicalDescription: seededRandom() > 0.5 ? {
        stature: randomElement(["lang", "kort", "middel"]),
        hair: randomElement(["blond", "bruin", "zwart", "grijs"]),
        eyes: randomElement(["blauw", "bruin", "groen", "grijs"]),
      } : undefined,
    },
  };
}

function generateMaritimeRecord(index: number): MaritimeRecord {
  const enlistmentDate = generateDate();
  const location = generateLocation();
  
  return {
    id: `gen-maritime-${index}`,
    person: { ...generateMaleName(), origin: generateLocation() },
    service: {
      destination: [generateLocation()],
      type: randomElement(SERVICE_TYPES),
      administrativeLocation: location,
      departureLocation: generateLocation(),
      enlistmentDate,
      function: randomElement(MARITIME_FUNCTIONS),
      functionDescription: `Dienst aan boord van ${randomElement(SHIP_NAMES)}`,
      shipName: randomElement(SHIP_NAMES),
      transferDetails: {},
    },
    discharge: seededRandom() > 0.3 ? {
      date: generateDate(),
      location: generateLocation(),
      reason: randomElement(["Eervol ontslag", "Einde dienstverband", "Ziekte"]),
      reasonDescription: "Diensttijd voltooid",
    } : undefined,
    financial: {
      debtLetter: seededRandom() > 0.8,
      monthlyLetter: seededRandom() > 0.5,
    },
    archives: {
      scan: `http://example.com/scan/${index}`,
      reference: `Toegang: 1.04.02, inv.nr: ${randomInt(10000, 20000)}`,
    },
    narrative: `Zeeman in dienst van de ${randomElement(SERVICE_TYPES)}.`,
  };
}

function generateMedicalRecord(index: number): MedicalRecord {
  const isMale = seededRandom() > 0.5;
  const person = isMale ? generateMaleName() : generateFemaleName();
  
  return {
    id: `gen-medical-${index}`,
    type: "historical_mention",
    date: generateDate(),
    location: generateLocation(),
    person: { ...person, role: "Patient" },
    institution: randomElement(HOSPITAL_NAMES),
    admission: seededRandom() > 0.5 ? {
      admissionDate: generateDate(),
      dischargeDate: seededRandom() > 0.5 ? generateDate() : undefined,
      outcome: randomElement(["Recovered", "Discharged", "Deceased", "Unknown"]),
    } : undefined,
    archive: generateArchive(),
  };
}

function generateMilitaryRecord(index: number): MilitaryRecord {
  const role = randomElement(MILITARY_ROLES);
  const location = generateLocation();
  
  return {
    id: `gen-military-${index}`,
    type: "military_service",
    date: generateDate(),
    location,
    person: { ...generateMaleName(), role },
    service: {
      rank: role,
      unit: `Regiment ${randomElement(LOCATION_NAMES)}`,
      enlistmentDate: generateDate(),
      serviceLocation: location,
      campaigns: seededRandom() > 0.5 ? [`Veldtocht ${randomInt(1400, 1800)}`] : undefined,
    },
    discharge: seededRandom() > 0.5 ? {
      date: generateDate(),
      location: generateLocation(),
      reason: randomElement(["Eervol ontslag", "Verwonding", "Einde dienstverband"]),
    } : undefined,
    organization: `Leger van ${randomElement(["Holland", "Zeeland", "Brabant", "Gelderland"])}`,
    archive: generateArchive(),
  };
}

function generateNotaryRecord(index: number): NotaryRecord {
  return {
    id: `gen-notary-${index}`,
    notaryType: randomElement(NOTARY_TYPES),
    date: generateDate(),
    location: generateLocation(),
    person: {
      ...generatePerson(),
      partner: seededRandom() > 0.5 ? {
        firstName: randomElement([...FIRST_NAMES_MALE, ...FIRST_NAMES_FEMALE]),
        lastName: randomElement(LAST_NAMES),
      } : undefined,
    },
    archive: generateArchive(),
    notes: `Notariële akte opgemaakt`,
  };
}

function generateOtherRecord(index: number): OtherRecord {
  return {
    id: `gen-other-${index}`,
    date: generateDate(),
    location: generateLocation(),
    person: {
      ...generatePerson(),
      partner: seededRandom() > 0.5 ? {
        firstName: randomElement([...FIRST_NAMES_MALE, ...FIRST_NAMES_FEMALE]),
        lastName: randomElement(LAST_NAMES),
      } : undefined,
    },
    archive: generateArchive(),
    notes: `Historische vermelding`,
  };
}

function generateTollRecord(index: number): TollRecord {
  const year = generateYear();
  const date = `${year}-${String(randomInt(1, 12)).padStart(2, "0")}-${String(randomInt(1, 28)).padStart(2, "0")}` as `${number}-${string}-${string}`;
  
  return {
    id: `gen-toll-${index}`,
    referenceNumber: `TOL-${randomInt(1000, 9999)}`,
    merchant: {
      firstName: randomElement(FIRST_NAMES_MALE),
      lastName: randomElement(LAST_NAMES),
      role: randomElement(["Koopman", "Schipper", "Handelaar"]),
      residence: randomElement(LOCATION_NAMES),
    },
    ship: {
      name: seededRandom() > 0.3 ? randomElement(SHIP_NAMES) : undefined,
      isUnknown: seededRandom() > 0.7,
    },
    date: {
      original: `${year}`,
      startDate: date,
      endDate: seededRandom() > 0.5 ? date : undefined,
    },
    location: generateLocation(),
    products: [
      {
        product: PRODUCTS[randomInt(0, PRODUCTS.length - 1)].product,
        modernName: PRODUCTS[randomInt(0, PRODUCTS.length - 1)].modernName,
        quantity: {
          amount: randomInt(1, 100),
          unit: randomElement(["vat", "last", "ton", "pond", "stuk"]),
        },
        fees: {
          totalFee: randomInt(1, 50),
          currency: "gulden",
        },
      },
    ],
    metadata: {
      source: {
        file: `Tolregister-${randomInt(1, 100)}.pdf`,
        merchant: `Merchant-${index}`,
      },
      accounting: {
        rekening: `REK-${randomInt(100, 999)}`,
        year: `${year}`,
      },
    },
  };
}

function generateUniversityRecord(index: number): UniversityRecord {
  const isMale = seededRandom() > 0.3;
  const person = isMale ? generateMaleName() : generateFemaleName();
  
  return {
    id: `gen-university-${index}`,
    type: "university_enrollment",
    date: generateDate(),
    location: generateLocation(),
    person: { ...person, role: randomElement(["Student", "Professor", "Graduate", "Unknown"]) },
    university: randomElement(UNIVERSITY_NAMES),
    faculty: seededRandom() > 0.3 ? randomElement(UNIVERSITY_FACULTIES) : undefined,
    degree: seededRandom() > 0.5 ? randomElement(["Baccalaureus", "Magister", "Doctor"]) : undefined,
    enrollmentType: randomElement(["Matriculation", "Graduation", "Administrative", "Teaching"]),
    archive: generateArchive(),
  };
}

const COUNTS = {
  birth: 67,
  death: 67,
  baptism: 67,
  baptismWitness: 66,
  marriage: 67,
  churchMembership: 66,
  citizenship: 66,
  incarceration: 66,
  maritimeEnlistment: 67,
  medical: 66,
  militaryEnlistment: 67,
  notary: 66,
  other: 68,
  toll: 67,
  university: 67,
};

export const generatedBirthRecords: BirthRecord[] = Array.from(
  { length: COUNTS.birth }, (_, i) => generateBirthRecord(i)
);

export const generatedDeathRecords: DeathRecord[] = Array.from(
  { length: COUNTS.death }, (_, i) => generateDeathRecord(i)
);

export const generatedBaptismRecords: BaptismRecord[] = Array.from(
  { length: COUNTS.baptism }, (_, i) => generateBaptismRecord(i)
);

export const generatedBaptismWitnessRecords: BaptismWitnessRecord[] = Array.from(
  { length: COUNTS.baptismWitness }, (_, i) => generateBaptismWitnessRecord(i)
);

export const generatedMarriageRecords: MarriageRecord[] = Array.from(
  { length: COUNTS.marriage }, (_, i) => generateMarriageRecord(i)
);

export const generatedChurchMembershipRecords: ChurchMembershipRecord[] = Array.from(
  { length: COUNTS.churchMembership }, (_, i) => generateChurchMembershipRecord(i)
);

export const generatedCitizenshipRecords: CitizenshipRecord[] = Array.from(
  { length: COUNTS.citizenship }, (_, i) => generateCitizenshipRecord(i)
);

export const generatedIncarcerationRecords: IncarcerationRecord[] = Array.from(
  { length: COUNTS.incarceration }, (_, i) => generateIncarcerationRecord(i)
);

export const generatedMaritimeRecords: MaritimeRecord[] = Array.from(
  { length: COUNTS.maritimeEnlistment }, (_, i) => generateMaritimeRecord(i)
);

export const generatedMedicalRecords: MedicalRecord[] = Array.from(
  { length: COUNTS.medical }, (_, i) => generateMedicalRecord(i)
);

export const generatedMilitaryRecords: MilitaryRecord[] = Array.from(
  { length: COUNTS.militaryEnlistment }, (_, i) => generateMilitaryRecord(i)
);

export const generatedNotaryRecords: NotaryRecord[] = Array.from(
  { length: COUNTS.notary }, (_, i) => generateNotaryRecord(i)
);

export const generatedOtherRecords: OtherRecord[] = Array.from(
  { length: COUNTS.other }, (_, i) => generateOtherRecord(i)
);

export const generatedTollRecords: TollRecord[] = Array.from(
  { length: COUNTS.toll }, (_, i) => generateTollRecord(i)
);

export const generatedUniversityRecords: UniversityRecord[] = Array.from(
  { length: COUNTS.university }, (_, i) => generateUniversityRecord(i)
);
