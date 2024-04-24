declare global { namespace Efesto {type Stats = {"_id":{createdAt: string;
updatedAt: string} ;available: number;adopted: number;"in_custody": number}
type Dog = {id: string;name: string;breed: string;age: number;status: string}
type DogRegistration = {name: string;breed: string;age: number}
type Registration = {email: string;password: string}
}} export {}