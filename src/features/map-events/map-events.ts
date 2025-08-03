import { LocationName, LocationCoordinates, EventName, PersonWithFullName } from '@/entities';
import { MAP_EVENTS_REGISTRY } from './map-events-registry';

export interface MapEvent {
  id: string;
  timestamp: number;
  location: {
      name: LocationName;
      coordinates: LocationCoordinates;
  };
  event: {
      formattedDate: string;
      type: EventName;
      title: string;
      description: string;
  };
  person: PersonWithFullName;
}

export interface EventTransformer<T> {
  isTransformable(records: unknown): records is T[];
  transform(records: T[]): MapEvent[];
}

export function mapEvents(): MapEvent[] {
    return MAP_EVENTS_REGISTRY.reduce((allEvents, { transformer, data }) => {
        if (transformer.isTransformable(data)) {
            const transformedEvents = transformer.transform(data);
            return [...allEvents, ...transformedEvents];
        } 

        console.warn('Data source was not transformable by its configured transformer. First record:', data[0]);

        return allEvents; 
    }, [] as MapEvent[]).sort((a, b) => a.timestamp - b.timestamp);
}
