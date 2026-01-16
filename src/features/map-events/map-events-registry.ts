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
    universityRecords,
    generatedBaptismRecords,
    generatedBaptismWitnessRecords,
    generatedBirthRecords,
    generatedChurchMembershipRecords,
    generatedCitizenshipRecords,
    generatedDeathRecords,
    generatedIncarcerationRecords,
    generatedMaritimeRecords,
    generatedMarriageRecords,
    generatedMedicalRecords,
    generatedMilitaryRecords,
    generatedNotaryRecords,
    generatedOtherRecords,
    generatedTollRecords,
    generatedUniversityRecords,
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

const MAP_EVENTS_REGISTRY_GENERATED: { data: unknown[], transformer: EventTransformer<unknown> }[] = [
    {
        data: generatedBaptismRecords,
        transformer: baptismTransformer
    },
    {
        data: generatedBaptismWitnessRecords,
        transformer: baptismWitnessTransformer
    },
    {
        data: generatedBirthRecords,
        transformer: birthTransformer
    },
    {
        data: generatedChurchMembershipRecords,
        transformer: churchMembershipTransformer
    },
    {
        data: generatedCitizenshipRecords,
        transformer: citizenshipTransformer
    },
    {
        data: generatedDeathRecords,
        transformer: deathTransformer
    },
    {
        data: generatedIncarcerationRecords,
        transformer: incarcerationTransformer
    },
    {
        data: generatedMaritimeRecords,
        transformer: maritimeTransformer
    },
    {
        data: generatedMarriageRecords,
        transformer: marriageTransformer
    },
    {
        data: generatedMedicalRecords,
        transformer: medicalTransformer
    },
    {
        data: generatedMilitaryRecords,
        transformer: militaryTransformer
    },
    {
        data: generatedNotaryRecords,
        transformer: notaryTransformer
    },
    {
        data: generatedOtherRecords,
        transformer: otherTransformer
    },
    {
        data: generatedTollRecords,
        transformer: tollTransformer
    },
    {
        data: generatedUniversityRecords,
        transformer: universityTransformer
    }
]

export const MAP_EVENTS_REGISTRY: { data: unknown[], transformer: EventTransformer<unknown> }[] = [
    ...MAP_EVENTS_REGISTRY_GENERATED,
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
    },
   
]