import { MedicalRecord, MedicalRecordSchema, getLocation, getPersonFullname } from "@/entities";
import { getDateDetails, generateId } from "@/shared";
import { EventTransformer, MapEvent } from "../map-events";

export const medicalTransformer: EventTransformer<MedicalRecord> = {
    isTransformable(records: unknown): records is MedicalRecord[] {
        return (
            Array.isArray(records) &&
            records.every((record) => MedicalRecordSchema.safeParse(record).success)
        );
    },
    transform(records: MedicalRecord[]): MapEvent[] {
        const events: MapEvent[] = [];
        
        records.forEach((record) => {
            const fullName = getPersonFullname(record.person);
            const location = getLocation(record.location);

            // Admission event
            const { timestamp: admissionTimestamp, formattedDate: admissionDate } = getDateDetails(record.date);
            const id = generateId(record);
            
            let admissionDescription = `${fullName} (${record.person.role}) was admitted to ${record.institution} in ${record.location}`;
            
            if (record.admission) {
                if (record.admission.diagnosis) {
                    admissionDescription += ` with diagnosis: ${record.admission.diagnosis}`;
                }
                if (record.admission.treatment) {
                    admissionDescription += `. Treatment: ${record.admission.treatment}`;
                }
            }
            
            admissionDescription += `. Archive: ${record.archive.source} (${record.archive.accessNumber}/${record.archive.inventoryNumber})`;
            
            if (record.notes) {
                admissionDescription += `\n\n${record.notes}`;
            }
            
            events.push({
                id,
                timestamp: admissionTimestamp,
                location,
                person: {
                    ...record.person,
                    fullName,
                },
                event: {
                    formattedDate: admissionDate,
                    type: "medical",
                    title: `${fullName} admitted to hospital`,
                    description: admissionDescription,
                }
            });

            // Discharge event (if exists)
            if (record.admission?.dischargeDate) {
                const { timestamp: dischargeTimestamp, formattedDate: dischargeDate } = getDateDetails(record.admission.dischargeDate);
                
                let dischargeDescription = `${fullName} was discharged from ${record.institution} in ${record.location}`;
                
                if (record.admission.dischargeReason) {
                    dischargeDescription += `. Reason: ${record.admission.dischargeReason}`;
                }
                
                if (record.admission.outcome) {
                    dischargeDescription += `. Outcome: ${record.admission.outcome}`;
                }
                
                dischargeDescription += `. Archive: ${record.archive.source} (${record.archive.accessNumber}/${record.archive.inventoryNumber})`;
                
                if (record.notes) {
                    dischargeDescription += `\n\n${record.notes}`;
                }
                
                events.push({
                    id: `discharge-${id}`,
                    timestamp: dischargeTimestamp,
                    location,
                    person: {
                        ...record.person,
                        fullName,
                    },
                    event: {
                        formattedDate: dischargeDate,
                        type: "medical",
                        title: `${fullName} discharged from hospital`,
                        description: dischargeDescription,
                    }
                });
            }
        });
        
        return events;
    }
};
