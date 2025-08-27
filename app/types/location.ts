export interface Location {
  latitude: number;
  longitude: number;
}

export interface LocationContextType {
  location: Location | null;
  permissionStatus: 'granted' | 'denied' | 'unavailable' | 'requesting';
  requestLocationPermission: () => Promise<void>;
}

export const DEFAULT_LOCATION: Location = {
  latitude: 37.7749,
  longitude: -122.4194,
};
