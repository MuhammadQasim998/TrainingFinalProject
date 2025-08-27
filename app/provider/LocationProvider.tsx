import React, { createContext, useContext, useState, useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Platform } from 'react-native';
import { Location, LocationContextType, DEFAULT_LOCATION } from '../types/location';

// Configure geolocation
Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'whenInUse',
  locationProvider: 'auto',
});

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<'granted' | 'denied' | 'unavailable' | 'requesting'>('requesting');

  const requestLocationPermission = async () => {
    try {
      setPermissionStatus('requesting');
      const permission = Platform.select({
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      });

      if (!permission) {
        setPermissionStatus('unavailable');
        return;
      }

      const result = await request(permission);
      
      switch (result) {
        case RESULTS.GRANTED:
          setPermissionStatus('granted');
          break;
        case RESULTS.DENIED:
        case RESULTS.BLOCKED:
          setPermissionStatus('denied');
          setLocation(DEFAULT_LOCATION);
          break;
        default:
          setPermissionStatus('unavailable');
          setLocation(DEFAULT_LOCATION);
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
      setPermissionStatus('unavailable');
      setLocation(DEFAULT_LOCATION);
    }
  };

  useEffect(() => {
    const checkPermission = async () => {
      const permission = Platform.select({
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      });

      if (!permission) {
        setPermissionStatus('unavailable');
        return;
      }

      const result = await check(permission);
      
      if (result === RESULTS.GRANTED) {
        setPermissionStatus('granted');
      } else {
        await requestLocationPermission();
      }
    };

    checkPermission();
  }, []);

  useEffect(() => {
    if (permissionStatus === 'denied' || permissionStatus === 'unavailable') {
      setLocation(DEFAULT_LOCATION);
      return;
    }
    
    if (permissionStatus === 'granted') {
      const watchId = Geolocation.watchPosition(
        position => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        error => {
          console.error('Error getting location:', error);
          setLocation(DEFAULT_LOCATION);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 10,
          interval: 5000,
          fastestInterval: 2000,
        }
      );

      return () => {
        Geolocation.clearWatch(watchId);
      };
    }
  }, [permissionStatus]);

  const value = {
    location,
    permissionStatus,
    requestLocationPermission,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
