import { BaptismWitnessRecord, BaptismWitnessRecordSchema, getLocation, getPersonFullname } from "@/entities";
import { getDateDetails, generateId } from "@/shared";
import { EventTransformer, MapEvent } from "../map-events";

export const baptismWitnessTransformer: EventTransformer<BaptismWitnessRecord> = {
    isTransformable(records: unknown): records is BaptismWitnessRecord[] {
        return (
            Array.isArray(records) &&
            records.every((record) => BaptismWitnessRecordSchema.safeParse(record).success)
        );
    },
    transform(records: BaptismWitnessRecord[]): MapEvent[] {
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
                id: `baptism-witness-${id}`,
                timestamp,
                location,
                person: {
                    ...baptizedPerson,
                    fullName,
                },
                event: {
                    formattedDate,
                    type: "church_event_witness",
                    title: `Baptism of ${fullName}`,
                    description: record.people
                        .map((person) => `${getPersonFullname(person)} (${person.role})`)
                        .join(", "),
                }
            };
        });
    }
};