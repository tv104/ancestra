import { CitizenshipRecord, CitizenshipRecordSchema, getLocation, getPersonFullname } from "@/entities";
import { getDateDetails, generateId } from "@/shared";
import { EventTransformer, MapEvent } from "../map-events";

export const citizenshipTransformer: EventTransformer<CitizenshipRecord> = {
    isTransformable(records: unknown): records is CitizenshipRecord[] {
        return (
            Array.isArray(records) &&
            records.every((record) => CitizenshipRecordSchema.safeParse(record).success)
        );
    },
    transform(records: CitizenshipRecord[]): MapEvent[] {
        return records.map((record) => {
            const { timestamp, formattedDate } = getDateDetails(record.date);
            const fullName = getPersonFullname(record.person);
            const id = generateId(record);
            const location = getLocation(record.location);

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
                    type: "citizenship",
                    title: `${fullName} became citizen`,
                    description: `${fullName} became a citizen at ${record.location}. Archive: ${record.archive.source} (${record.archive.accessNumber}/${record.archive.inventoryNumber}).
                    
                    ${record.notes}`,
                }
            };
        });
    }
};
