import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, ActivityIndicator, Alert, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Region } from 'react-native-maps';
import { fetchNearbyPlaces } from '../services/placesService';
import { Place, PlaceType } from '../types/places';
import { useLocation } from '../hooks/useLocation';
import { colors, palette } from '../theme/colors';
import { spacing } from '../styles/spacing';

const MARKER_COLORS: Record<PlaceType, string> = {
  restaurant: palette.markerRestaurant,
  cafe: palette.markerCafe,
  gas_station: palette.markerGasStation,
  bank: palette.markerBank,
  pharmacy: palette.markerPharmacy,
  lodging: palette.markerLodging,
  park: palette.markerPark,
  gym: palette.markerGym,
  hospital: palette.markerHospital,
  shopping_mall: palette.markerShoppingMall
};


const PLACE_TYPES: PlaceType[] = [
  'restaurant',
  'cafe',
  'gas_station',
  'bank',
  'pharmacy',
  'lodging',
  'park',
  'gym',
  'hospital',
  'shopping_mall'
];

import PlaceList from '../components/PlaceList';

const MAP_HEIGHT_RATIO = 0.6; 

const MapScreen: React.FC = () => {
  const mapRef = useRef<MapView>(null);
  const { location, error: locationError, loading: locationLoading, DEFAULT_LOCATION } = useLocation();
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadNearbyPlaces = async (latitude: number, longitude: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
    
      const allPlacesPromises = PLACE_TYPES.map(type =>
        fetchNearbyPlaces({
          lat: latitude,
          lng: longitude,
          radius: 5, 
          type: type,
          limit: 20
        })
      );

      const results = await Promise.all(allPlacesPromises);
      
    
      const allPlaces = results.flatMap(result => result.places);
      
      setPlaces(allPlaces);
    } catch (err) {
      setError('Failed to load nearby places');
      Alert.alert(
        'Error',
        'Failed to load nearby places. Would you like to try again?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Try Again', onPress: () => loadNearbyPlaces(latitude, longitude) }
        ]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getMarkerColor = (type: PlaceType): string => {
    return MARKER_COLORS[type];
  };

  useEffect(() => {
    
    if (!locationLoading) {
      loadNearbyPlaces(location.latitude, location.longitude);
    }
  }, [location, locationLoading]);


  if (locationLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.status.info} />
      </View>
    );
  }

  const handlePlacePress = (place: Place) => {
    const region: Region = {
      latitude: place.lat,
      longitude: place.lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    
    mapRef.current?.animateToRegion(region, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.mapContainer, { height: Dimensions.get('window').height * MAP_HEIGHT_RATIO }]}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          onRegionChangeComplete={(region) => {
            loadNearbyPlaces(region.latitude, region.longitude);
          }}
        >
          {places.map((place) => (
            <Marker
              key={place.id}
              coordinate={{
                latitude: place.lat,
                longitude: place.lng
              }}
              title={place.name}
              description={`${place.type} • ${place.address}`}
              pinColor={getMarkerColor(place.type as PlaceType)}
            />
          ))}
        </MapView>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.status.info} />
          </View>
        )}
        {locationError && (
          <View style={styles.errorContainer}>
            <ActivityIndicator size="small" color={colors.status.error} />
          </View>
        )}
      </View>
      <View style={styles.listContainer}>
        <PlaceList
          places={places}
          onPlacePress={handlePlacePress}
          isLoading={isLoading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  mapContainer: {
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  listContainer: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  loadingContainer: {
    position: 'absolute',
    top: spacing.md,
    alignSelf: 'center',
    backgroundColor: `${colors.background.primary}CC`, // CC for 80% opacity
    padding: spacing.sm,
    borderRadius: spacing.sm,
  },
  errorContainer: {
    position: 'absolute',
    top: spacing.md,
    alignSelf: 'center',
    backgroundColor: `${colors.status.error}1A`, // 1A for 10% opacity
    padding: spacing.sm,
    borderRadius: spacing.sm,
  }
});

export default MapScreen;