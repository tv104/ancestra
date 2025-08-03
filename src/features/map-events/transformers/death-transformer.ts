import { DeathRecord, DeathRecordSchema, getLocation, getPersonFullname } from "@/entities";
import { getDateDetails, generateId } from "@/shared";
import { EventTransformer, MapEvent } from "../map-events";

export const deathTransformer: EventTransformer<DeathRecord> = {
    isTransformable(records: unknown): records is DeathRecord[] {
        return (
            Array.isArray(records) &&
            records.every((record) => DeathRecordSchema.safeParse(record).success)
        );
    },
    transform(records: DeathRecord[]): MapEvent[] {
        return records.map((record) => {
            const { timestamp, formattedDate } = getDateDetails(record.burialDate);
            const fullName = getPersonFullname(record.person);
            const id = generateId(record);
            const location = getLocation(record.burialPlace);

            let description = `Died in ${record.burialPlace}`;
            
            if (record.cemetery) {
                description += ` at ${record.cemetery}`;
            }
            
            if (record.deathDate && record.deathDate !== record.burialDate) {
                description += ` (died ${record.deathDate})`;
            }
            
            if (record.relatedPerson?.relationship) {
                description += `. (${record.relatedPerson.relationship}: ${getPersonFullname(record.relatedPerson)})`;
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
                    type: "death",
                    title: `${fullName} Died`,
                    description,
                }
            };
        });
    }
};