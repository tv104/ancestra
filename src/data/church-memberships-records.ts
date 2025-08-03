import { ChurchMembershipRecord } from "@/entities";

export const churchMembershipsRecords: ChurchMembershipRecord[] = [
  {
    id: "church-membership-1635-08-maria-van-dijk-amsterdam",
    date: "1635-08-15",
    location: "Amsterdam",
    person: {
      firstName: "Maria",
      lastName: "van Dijk",
    },
    partner: {
      firstName: "Pieter",
      lastName: "de Vries",
    },
    organization: "Nederduitsch-gereformeerde kerk",
    archive: {
      accessNumber: "997",
      inventoryNumber: "AMS-22",
      source: "DTBL Amsterdam 22 (NG Lidmatenregister 1615-1638)",
    },
    notes:
      "J.d., belijdenis. Address: Westzijde. Register: K 485, folio 135 vs.",
  },
];
