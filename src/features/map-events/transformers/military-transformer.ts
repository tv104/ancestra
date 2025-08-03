import { MilitaryRecord, MilitaryRecordSchema, getLocation, getPersonFullname } from "@/entities";
import { getDateDetails, generateId } from "@/shared";
import { EventTransformer, MapEvent } from "../map-events";

export const militaryTransformer: EventTransformer<MilitaryRecord> = {
    isTransformable(records: unknown): records is MilitaryRecord[] {
        return (
            Array.isArray(records) &&
            records.every((record) => MilitaryRecordSchema.safeParse(record).success)
        );
    },
    transform(records: MilitaryRecord[]): MapEvent[] {
        const events: MapEvent[] = [];
        
        records.forEach((record) => {
            const fullName = getPersonFullname(record.person);
            const location = getLocation(record.location);

            // Enlistment event
            const { timestamp: enlistmentTimestamp, formattedDate: enlistmentDate } = getDateDetails(record.date);
            const id = generateId(record);
            
            let enlistmentDescription = `${fullName} (${record.person.role}) enlisted in ${record.organization} at ${record.location}`;
            
            if (record.service) {
                enlistmentDescription += ` as ${record.service.rank}`;
                if (record.service.unit) {
                    enlistmentDescription += ` in ${record.service.unit}`;
                }
                if (record.service.campaigns && record.service.campaigns.length > 0) {
                    enlistmentDescription += `. Campaigns: ${record.service.campaigns.join(", ")}`;
                }
            }
            
            enlistmentDescription += `. Archive: ${record.archive.source} (${record.archive.accessNumber}/${record.archive.inventoryNumber})`;
            
            if (record.notes) {
                enlistmentDescription += `\n\n${record.notes}`;
            }
            
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
                    type: "military_enlistment",
                    title: `${fullName} enlisted in military`,
                    description: enlistmentDescription,
                }
            });

            // Discharge event (if exists)
            if (record.discharge) {
                const { timestamp: dischargeTimestamp, formattedDate: dischargeDate } = getDateDetails(record.discharge.date);
                
                let dischargeDescription = `${fullName} was discharged from ${record.organization} at ${record.discharge.location}. Reason: ${record.discharge.reason}`;
                
                if (record.discharge.reasonDescription) {
                    dischargeDescription += ` - ${record.discharge.reasonDescription}`;
                }
                
                dischargeDescription += `. Archive: ${record.archive.source} (${record.archive.accessNumber}/${record.archive.inventoryNumber})`;
                
                if (record.notes) {
                    dischargeDescription += `\n\n${record.notes}`;
                }
                
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
                        type: "military_discharge",
                        title: `${fullName} discharged from military`,
                        description: dischargeDescription,
                    }
                });
            }
        });
        
        return events;
    }
};
