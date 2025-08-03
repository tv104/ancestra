import { MedicalRecord } from "@/entities";

export const medicalRecords: MedicalRecord[] = [
  {
    id: "hospital-admission-1730-08-15-hendrik-van-der-berg-amsterdam",
    type: "historical_mention",
    date: "1730-08-15",
    location: "Amsterdam",
    person: {
      firstName: "Hendrik",
      lastName: "van der Berg",
      role: "Patient",
    },
    institution: "Gasthuis",
    admission: {
      admissionDate: "1730-08-15",
      dischargeDate: "1730-09-02",
      dischargeReason: "Vertrokken",
      outcome: "Discharged",
    },
    archive: {
      accessNumber: "25.2",
      inventoryNumber: "26",
      source: "Godshuizen Amsterdam 1350-1820",
      register: "Lootjesboek",
      folio: "register van personen die voor rekening van het gesticht ter verpleging zijn opgenomen, voornamelijk vreemdelingen en arme ingezetenen, 1720-1750",
    },
    notes: "Patiënt Hendrik van der Berg opgenomen in Gasthuis Amsterdam. Afkomstig van: Antwerpen. Datum binnenkomst: 15-08-1730, Datum ontslag: 02-09-1730. Soort einde: Vertrokken. Register: Lootjesboek, register van personen die voor rekening van het gesticht ter verpleging zijn opgenomen, voornamelijk vreemdelingen en arme ingezetenen, 1720-1750.",
  },
];