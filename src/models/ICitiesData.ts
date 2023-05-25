import type { TIndexedObject } from '../models/TIndexedObject'

export interface ICitiesData extends TIndexedObject  {
    city: string, 
    lat: string, 
    lng: string, 
    country: string, 
    iso2: string, 
    admin_name: string, 
    capital: string, 
    population: string, 
    population_proper: string
}

