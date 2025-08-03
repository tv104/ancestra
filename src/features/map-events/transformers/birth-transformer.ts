import { BirthRecord, BirthRecordSchema, getLocation, getPersonFullname } from "@/entities";
import { getDateDetails, generateId } from "@/shared";
import { EventTransformer, MapEvent } from "../map-events";

export const birthTransformer: EventTransformer<BirthRecord> = {
  isTransformable(records: unknown): records is BirthRecord[] {
    return (
      Array.isArray(records) &&
      records.every((record) => BirthRecordSchema.safeParse(record).success)
    );
  },

  transform(records: BirthRecord[]): MapEvent[] {
    return records.map((record) => {
      const { timestamp, formattedDate } = getDateDetails(record.date);
      const fullName = getPersonFullname(record.person);
      const id = generateId(record);
      const location = getLocation(record.location);

      const event: MapEvent = {
        id,
        timestamp,
        location,
        event: {
          formattedDate,
          type: "birth",
          title: `Birth of ${fullName}`,
          description:
            record.metadata.notes ||
            `${fullName} was born in ${record.location}`,
        },
        person: {
          ...record.person,
          fullName,
        },
      };

      return event;
    });
  },
};
