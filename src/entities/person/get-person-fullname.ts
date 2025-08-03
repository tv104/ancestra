import { Person } from "./person-model";

export function getPersonFullname(person: Person): string {
    const patronym = person.patronym ? person.patronym + " " : "";
    const prefix = person.prefix ? person.prefix + " " : "";
    const lastName = person.lastName;
  
    return `${person.firstName} ${patronym}${prefix}${lastName}`;
  }
  