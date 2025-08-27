export type PlaceType = 
  | 'restaurant'
  | 'cafe'
  | 'gas_station'
  | 'bank'
  | 'pharmacy'
  | 'lodging'
  | 'park'
  | 'gym'
  | 'hospital'
  | 'shopping_mall';

export interface Place {
  id: string;
  name: string;
  type: PlaceType;
  address: string;
  lat: number;
  lng: number;
  distance: number;
  rating: number;
  price_level: number;
  image_url: string;
}

export interface PlacesQueryParams {
  lat: number;
  lng: number;
  radius: number;
  type: PlaceType;
  limit: number;
}

export interface PlacesResponse {
  places: Place[];
  total: number;
  query: PlacesQueryParams;
}

export interface PlacesError {
  message: string;
  code?: string;
}