import { PlacesResponse, PlacesQueryParams } from '../types/places';

const API_BASE_URL = 'https://nbp-production.up.railway.app/api';

export const fetchNearbyPlaces = async (params: PlacesQueryParams): Promise<PlacesResponse> => {
  const queryString = new URLSearchParams({
    lat: params.lat.toString(),
    lng: params.lng.toString(),
    radius: params.radius.toString(),
    type: params.type,
    limit: params.limit.toString(),
  }).toString();
 console.log(queryString);
  const response = await fetch(`${API_BASE_URL}/places/nearby?${queryString}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch nearby places');
  }

  return response.json();
};
