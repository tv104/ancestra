import { ChurchMembershipRecord, ChurchMembershipRecordSchema, getLocation, getPersonFullname } from "@/entities";
import { getDateDetails, generateId } from "@/shared";
import { EventTransformer, MapEvent } from "../map-events";

export const churchMembershipTransformer: EventTransformer<ChurchMembershipRecord> =
  {
    isTransformable(records: unknown): records is ChurchMembershipRecord[] {
      return (
        Array.isArray(records) &&
        records.every(
          (record) => ChurchMembershipRecordSchema.safeParse(record).success
        )
      );
    },
    transform(records: ChurchMembershipRecord[]): MapEvent[] {
      return records.map((record) => {
        const { timestamp, formattedDate } = getDateDetails(record.date);
        const fullName = getPersonFullname(record.person);
        const id = generateId(record);
        const location = getLocation(record.location);

        let description = `${fullName} joined ${record.organization} in ${record.location}`;

        if (record.partner) {
          description += ` with partner ${getPersonFullname(record.partner)}`;
        }

        description += `. Archive: ${record.archive.source} (${record.archive.accessNumber}/${record.archive.inventoryNumber})`;

        if (record.notes) {
          description += `\n\n${record.notes}`;
        }

        return {
          id,
          timestamp,
          location,
          person: {
            ...record.person,
            fullName,
          },
          event: {
            formattedDate,
            type: "church_membership",
            title: `${fullName} joined church`,
            description,
          },
        };
      });
    },
  };
