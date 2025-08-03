import { TollRecord, TollRecordSchema, getLocation, getPersonFullname } from "@/entities";
import { getDateDetails, generateId } from "@/shared";
import { EventTransformer, MapEvent } from "../map-events";

export const tollTransformer: EventTransformer<TollRecord> = {
    isTransformable(records: unknown): records is TollRecord[] {
        return (
            Array.isArray(records) &&
            records.every((record) => TollRecordSchema.safeParse(record).success)
        );
    },
    transform(records: TollRecord[]): MapEvent[] {
        return records
            .map((record) => {
                const { timestamp, formattedDate } = getDateDetails(record.date.startDate);
                const fullName = getPersonFullname(record.merchant);
                const id = generateId(record);
                const location = getLocation(record.location);

                // Get primary product for description
                const primaryProduct = record.products[0];
                const productDesc = primaryProduct
                    ? primaryProduct.modernName
                    : "various goods";

                let description = `${fullName} (${record.merchant.role}) paid tolls for ${productDesc} at ${location.name}`;
                
                if (record.products.length > 1) {
                    description += ` and ${record.products.length - 1} other products`;
                }

                // Add total fee information
                const totalFees = record.products.reduce((sum, product) => sum + product.fees.totalFee, 0);
                description += `. Total fees: ${totalFees} ${record.products[0]?.fees.currency || '(unknown currency)'}`;

                return {
                    id,
                    timestamp,
                    location,
                    person: {
                        ...record.merchant,
                        fullName,
                    },
                    event: {
                        formattedDate,
                        type: "toll",
                        title: `Trade by ${fullName}`,
                        description,
                    }
                };
            });
    }
};