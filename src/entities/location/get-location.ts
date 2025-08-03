import { LOCATION_COORDINATES, LocationCoordinates, LocationName } from "./location-model";

export function getLocation(location: LocationName): { name: LocationName, coordinates: LocationCoordinates } {
    return {
        name: location,
        coordinates: LOCATION_COORDINATES[location],
    }
}