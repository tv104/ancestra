import { TollRecord } from "@/entities";

export const shipMerchantRecords: TollRecord[] = [
  {
    id: "van-dijk-pieter-1665-08-15",
    referenceNumber: "506-6442",
    merchant: {
      firstName: "Pieter",
      lastName: "van Dijk",
      role: "schipper/handelaar",
    },
    ship: {
      isUnknown: true,
    },
    date: {
      original: "1665-08-15",
      startDate: "1665-08-15"
    },
    location: "Amsterdam",
    products: [
      {
        product: "wit sout",
        modernName: "wit zout",
        quantity: {
          amount: 400,
          unit: "vat",
        },
        fees: {
          heffing2: 8,
          heffing3: 7,
          totalFee: 2400,
          currency: "£ Vls - Vlaamsche ponden",
        },
      },
    ],
    metadata: {
      source: {
        file: "https://www.hollandsarchief.nl/onderzoek-het-zelf/archief/?mivast=240&mizig=865&miadt=240&miview=tbl&milang=nl&mif2=295&mizk_alle=van-dijk&mizk_hele=pieter",
        merchant: "pieter-van-dijk",
      },
      accounting: {
        rekening: "10e rekening over 1665",
        year: "1665",
      },
    },
  },
];
