import { OtherRecord, OtherRecordSchema, getLocation, getPersonFullname } from "@/entities";
import { getDateDetails, generateId } from "@/shared";
import { EventTransformer, MapEvent } from "../map-events";

export const otherTransformer: EventTransformer<OtherRecord> = {
    isTransformable(records: unknown): records is OtherRecord[] {
        return (
            Array.isArray(records) &&
            records.every((record) => OtherRecordSchema.safeParse(record).success)
        );
    },
    transform(records: OtherRecord[]): MapEvent[] {
        return records.map((record) => {
            const { timestamp, formattedDate } = getDateDetails(record.date);
            const fullName = getPersonFullname(record.person);
            const id = generateId(record);
            const location = getLocation(record.location);

            let description = `${fullName} mentioned in ${record.location}`;
            
            if (record.organization) {
                description += ` in ${record.organization}`;
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
                    type: "other",
                    title: `${fullName} mentioned`,
                    description,
                }
            };
        });
    }
};
