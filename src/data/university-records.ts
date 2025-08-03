import { UniversityRecord } from "@/entities";

export const universityRecords: UniversityRecord[] = [
  {
    id: "university-enrollment-1558-06-15-willem-van-dijk-leuven",
    type: "university_enrollment",
    date: "1558-06-15",
    location: "Leuven",
    person: {
      firstName: "Willem",
      lastName: "van Dijk",
      role: "Unknown",
    },
    university: "Oude Universiteit Leuven",
    archive: {
      accessNumber: "MATRIKEL_00032363",
      inventoryNumber: "Enrolment register",
      source: "Matricules of the Old University Leuven - World",
    },
    notes: "University enrollment at Old University Leuven. Place of birth: Amsterdam. Description: Inschrijvingsregister Oude Universiteit Leuven",
  },
];