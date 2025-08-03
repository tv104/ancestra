import { MaritimeRecord, MaritimeRecordSchema, getLocation, getPersonFullname } from "@/entities";
import { getDateDetails, generateId } from "@/shared";
import { EventTransformer, MapEvent } from "../map-events";

export const maritimeTransformer: EventTransformer<MaritimeRecord> = {
    isTransformable(records: unknown): records is MaritimeRecord[] {
        return (
            Array.isArray(records) &&
            records.every((record) => MaritimeRecordSchema.safeParse(record).success)
        );
    },
    transform(records: MaritimeRecord[]): MapEvent[] {
        const events: MapEvent[] = [];
        
        records.forEach((record) => {
            const fullName = getPersonFullname(record.person);
            const location = getLocation(record.person.origin);

            // Enlistment event
            const { timestamp: enlistmentTimestamp, formattedDate: enlistmentDate } = getDateDetails(record.service.enlistmentDate);
            const id = generateId(record);
            
            events.push({
                id,
                timestamp: enlistmentTimestamp,
                location,
                person: {
                    ...record.person,
                    fullName,
                },
                event: {
                    formattedDate: enlistmentDate,
                    type: "maritime_enlistment",
                    title: `${fullName} enlisted in ${record.service.type}`,
                    description: `${fullName} from ${record.person.origin} enlisted as ${record.service.function} on ship "${record.service.shipName}" to ${record.service.destination.join(", ")}.
                    
                    ${record.narrative}`,
                }
            });

            // Discharge event
            if (record.discharge) {
                const { timestamp: dischargeTimestamp, formattedDate: dischargeDate } = getDateDetails(record.discharge.date);
                
                events.push({
                    id: `discharge-${id}`,
                    timestamp: dischargeTimestamp,
                    location: getLocation(record.discharge.location),
                    person: {
                        ...record.person,
                        fullName,
                    },
                    event: {
                        formattedDate: dischargeDate,
                        type: record.discharge.reason === "Overleden" ? "maritime_death" : "maritime_discharge",
                        title: `${fullName} ${record.discharge.reason === "Overleden" ? "died" : "discharged"} from ${record.service.type}`,
                        description: `${fullName} was discharged from ${record.service.type} service as ${record.service.function} on ship "${record.service.shipName}" at ${record.discharge.location}. Reason: ${record.discharge.reason}${record.discharge.reasonDescription ? ` - ${record.discharge.reasonDescription}` : ''}.
                        
                        ${record.narrative}`,
                    }
                });
            }
        });
        
        return events;
    }
}