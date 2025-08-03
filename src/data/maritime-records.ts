import { MaritimeRecord } from "@/entities";

export const maritimeRecords: MaritimeRecord[] = [
  {
    id: "willem_van_der_berg",
    person: {
      firstName: "Willem",
      patronym: "",
      lastName: "van der Berg",
      origin: "Amsterdam",
    },
    service: {
      destination: ["North Sea"],
      type: "Koninklijke Marine",
      administrativeLocation: "Amsterdam",
      departureLocation: "Texel",
      enlistmentDate: "1768-03-15",
      function: "Opperstuurman",
      functionDescription:
        "Officier aan boord, verantwoordelijk voor navigatie en patrouille van de Noordzee kustlijn.",
      shipName: "Zeeland",
      transferDetails: {},
    },
    discharge: {
      date: "1770-06-10",
      location: "Amsterdam",
      reason: "Eervol ontslag",
      reasonDescription: "Succesvol voltooide diensttijd",
    },
    financial: {
      debtLetter: false,
      monthlyLetter: true,
    },
    archives: {
      scan: "http://hdl.handle.net/10648/cc2311f4-307f-1d48-675e-2b0e417b7078",
      reference:
        "Nummer toegang: 1.04.03, inventarisnummer: 13155, folionummer: 48",
    },
    narrative:
      "Willem van der Berg from Amsterdam was a naval officer for the Koninklijke Marine, serving as opperstuurman (first mate). His service began on March 15, 1768, aboard the patrol vessel 'Zeeland.' The pay ledger shows regular monthly payments and a final bonus of 200 guilders for exemplary service. His career was marked by successful patrols of the North Sea coastline, protecting Dutch merchant vessels from piracy. He was honorably discharged on June 10, 1770, after completing his service term successfully.",

  },
];
