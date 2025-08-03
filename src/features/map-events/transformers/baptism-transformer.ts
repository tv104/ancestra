import { BaptismRecord, BaptismRecordSchema, getLocation, getPersonFullname } from "@/entities";
import { getDateDetails, generateId } from "@/shared";
import { EventTransformer, MapEvent } from "../map-events";

export const baptismTransformer: EventTransformer<BaptismRecord> = {
    isTransformable(records: unknown): records is BaptismRecord[] {
        return (
            Array.isArray(records) &&
            records.every((record) => BaptismRecordSchema.safeParse(record).success)
        );
    },
    transform(records: BaptismRecord[]): MapEvent[] {
        return records.map((record) => {
            const { timestamp, formattedDate } = getDateDetails(record.date);
            const id = generateId(record);
            const location = getLocation(record.location);

            const baptizedPerson = record.people.find(person => person.role === "Dopeling");
            if (!baptizedPerson) {
                throw new Error(`No baptized person found in record ${record.id}`);
            }
            const fullName = getPersonFullname(baptizedPerson);

            return {
                id,
                timestamp,
                location,
                person: {
                    ...baptizedPerson,
                    fullName,
                },
                event: {
                    formattedDate,
                    type: "baptism",
                    title: `${fullName} was baptized`,
                    description: record.people
                    .map(
                      (person) =>
                        `${getPersonFullname(person)} (${person.role})`
                    )
                    .join(", "),
                }
            };
        });
    }
};
