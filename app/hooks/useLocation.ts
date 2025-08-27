import { useState, useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform } from 'react-native';

interface Location {
  latitude: number;
  longitude: number;
}

const DEFAULT_LOCATION = {
  latitude: 37.7749,
  longitude: -122.4194,
};

export const useLocation = () => {
  const [location, setLocation] = useState<Location>(DEFAULT_LOCATION);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const requestAndroidPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "This app needs access to your location to show nearby places.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.warn(err);
        setError('Unable to get current location');
        setLocation(DEFAULT_LOCATION);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    const setupLocation = async () => {
      if (Platform.OS === 'android') {
        const hasPermission = await requestAndroidPermission();
        if (hasPermission) {
          getCurrentLocation();
        } else {
          setError('Location permission denied');
          setLoading(false);
        }
      } else {
        
        Geolocation.requestAuthorization();
        getCurrentLocation();
      }
    };

    setupLocation();

 
    const watchId = Geolocation.watchPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setError(null);
      },
      (err) => {
        console.warn(err);
        setError('Unable to watch location');
      },
      { enableHighAccuracy: true, distanceFilter: 100 }
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  return { location, error, loading, DEFAULT_LOCATION };
};
