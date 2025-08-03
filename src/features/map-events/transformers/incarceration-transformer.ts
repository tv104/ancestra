import { IncarcerationRecord, IncarcerationRecordSchema, getLocation, getPersonFullname } from "@/entities";
import { getDateDetails, generateId } from "@/shared";
import { EventTransformer, MapEvent } from "../map-events";

export const incarcerationTransformer: EventTransformer<IncarcerationRecord> = {
    isTransformable(records: unknown): records is IncarcerationRecord[] {
        return (
            Array.isArray(records) &&
            records.every((record) => IncarcerationRecordSchema.safeParse(record).success)
        );
    },

    transform(records: IncarcerationRecord[]): MapEvent[] {
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
                    fullName
                },
                event: {
                    formattedDate,
                    type: "jail_entry",
                    title: `${fullName} Incarcerated`,
                    description: `${fullName} (${record.person.ageAtEvent}yo from ${record.person.birthplace}) was incarcerated for: ${record.details.crime} - ${record.details.sentence} - ${record.details.notes}`,
                }
            }
        })
    }
}