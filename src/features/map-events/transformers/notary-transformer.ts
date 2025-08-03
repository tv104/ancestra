import { NotaryRecord, NotaryRecordSchema, getLocation, getPersonFullname } from "@/entities";
import { getDateDetails, generateId } from "@/shared";
import { EventTransformer, MapEvent } from "../map-events";

export const notaryTransformer: EventTransformer<NotaryRecord> = {
    isTransformable(records: unknown): records is NotaryRecord[] {
        return (
            Array.isArray(records) &&
            records.every((record) => NotaryRecordSchema.safeParse(record).success)
        );
    },
    transform(records: NotaryRecord[]): MapEvent[] {
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
                    type: "notarial_entry",
                    title: `${fullName} - ${record.notaryType}`,
                    description: `${fullName} was involved in a ${record.notaryType.toLowerCase()} at ${record.location}. ${record.organization ? `Organization: ${record.organization}. ` : ''}${record.person.partner ? `Partner: ${getPersonFullname(record.person.partner)}. ` : ''}Archive: ${record.archive.source} (${record.archive.accessNumber}/${record.archive.inventoryNumber}).
                    
                    ${record.notes}`,
                }
            };
        });
    }
};
