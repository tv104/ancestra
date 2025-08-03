import { UniversityRecord, UniversityRecordSchema, getPersonFullname, getLocation } from "@/entities";
import { getDateDetails, generateId } from "@/shared";
import { EventTransformer, MapEvent } from "../map-events";

export const universityTransformer: EventTransformer<UniversityRecord> = {
    isTransformable(records: unknown): records is UniversityRecord[] {
        return (
            Array.isArray(records) &&
            records.every((record) => UniversityRecordSchema.safeParse(record).success)
        );
    },
    transform(records: UniversityRecord[]): MapEvent[] {
        return records.map((record) => {
            const { timestamp, formattedDate } = getDateDetails(record.date);
            const fullName = getPersonFullname(record.person);
            const id = generateId(record);
            const location = getLocation(record.location);

            let description = `${fullName} (${record.person.role}) at ${record.university} in ${record.location}`;
            
            if (record.faculty) {
                description += `, Faculty of ${record.faculty}`;
            }
            
            if (record.degree) {
                description += `, ${record.degree}`;
            }
            
            if (record.enrollmentType) {
                description += ` (${record.enrollmentType})`;
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
                    type: "university",
                    title: `${fullName} enrolled at university`,
                    description,
                }
            };
        });
    }
};
