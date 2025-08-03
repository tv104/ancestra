import { 
    baptismRecords, 
    baptismWitnessRecords, 
    birthRecords, 
    churchMembershipsRecords, 
    citizenshipRecords, 
    deathRecords, 
    incarcerationRecords, 
    maritimeRecords, 
    marriageRecords, 
    medicalRecords, 
    militaryRecords, 
    notaryRecords, 
    otherRecords, 
    shipMerchantRecords, 
    universityRecords 
} from "@/data"

import { 
    baptismTransformer, 
    baptismWitnessTransformer, 
    birthTransformer, 
    churchMembershipTransformer, 
    citizenshipTransformer, 
    deathTransformer, 
    incarcerationTransformer, 
    maritimeTransformer, 
    marriageTransformer, 
    medicalTransformer, 
    militaryTransformer, 
    notaryTransformer, 
    otherTransformer, 
    tollTransformer, 
    universityTransformer 
} from "./transformers";
import { EventTransformer } from "./map-events";

export const MAP_EVENTS_REGISTRY: { data: unknown[], transformer: EventTransformer<unknown> }[] = [
    {
        data: baptismRecords,
        transformer: baptismTransformer
    },
    {
        data: baptismWitnessRecords,
        transformer: baptismWitnessTransformer
    },
    {
        data: birthRecords,
        transformer: birthTransformer
    },
    {
        data: churchMembershipsRecords,
        transformer: churchMembershipTransformer
    },
    {
        data: citizenshipRecords,
        transformer: citizenshipTransformer
    },
    {
        data: deathRecords,
        transformer: deathTransformer
    },
    {
        data: incarcerationRecords,
        transformer: incarcerationTransformer
    },
    {
        data: maritimeRecords,
        transformer: maritimeTransformer
    },
    {
        data: marriageRecords,
        transformer: marriageTransformer
    },
    {
        data: medicalRecords,
        transformer: medicalTransformer
    },
    {
        data: militaryRecords,
        transformer: militaryTransformer
    },
    {
        data: notaryRecords,
        transformer: notaryTransformer
    },
    {
        data: otherRecords,
        transformer: otherTransformer
    },
    {
        data: shipMerchantRecords,
        transformer: tollTransformer
    },
    {
        data: universityRecords,
        transformer: universityTransformer
    }
]