import type { BirthRecord } from "@/entities";

export const birthRecords: BirthRecord[] = [
  {
    id: "birth-jacob-van-der-berg-rotterdam",
    person: {
      firstName: "Jacob",
      lastName: "van der Berg",
    },
    date: "1852-03-15",
    location: "Rotterdam",
    metadata: {
      source: "inferred-from-marriage-certificate",
      notes:
        "Birth year calculated from a son's marriage certificate in 1872 where his age was listed as 20. Notes mention father Willem and mother Anna van Dijk.",
    },
  },
];
