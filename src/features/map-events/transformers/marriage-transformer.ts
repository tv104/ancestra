import { MarriageRecord, MarriageRecordSchema, getLocation, getPersonFullname } from "@/entities";
import { getDateDetails, generateId } from "@/shared";
import { EventTransformer, MapEvent } from "../map-events";

export const marriageTransformer: EventTransformer<MarriageRecord> = {
  isTransformable(records: unknown): records is MarriageRecord[] {
    return (
      Array.isArray(records) &&
      records.every((record) => MarriageRecordSchema.safeParse(record).success)
    );
  },
  transform(records: MarriageRecord[]): MapEvent[] {
    return records.map((record) => {
      const { timestamp, formattedDate } = getDateDetails(record.date);
      const fullName = getPersonFullname(record.person);
      const id = generateId(record);
      const location = getLocation(record.location);
      const isWitnessEvent = record.type === "witness_event";

      let description = "";

      if (record.notes) {
        description += record.notes;
      } 
      
      if (record.otherPeople && record.otherPeople.length > 0) {
        description += `\n\n${record.otherPeople
          .map((person) => `${getPersonFullname(person)} (${person.relation})`)
          .join(", ")}`;
      }

      return {
        id: isWitnessEvent ? `marriage-witness-${id}` : id,
        timestamp,
        location,
        person: {
          ...record.person,
          fullName,
        },
        event: {
          formattedDate,
          type: isWitnessEvent ? "church_event_witness" : "marriage",
          title: `Marriage of ${fullName} as ${record.person.role}`,
          description,
        },
      };
    });
  },
};
