import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Place } from '../types/places';

interface PlaceListItemProps {
  place: Place;
  onPress: (place: Place) => void;
}

const PlaceListItem: React.FC<PlaceListItemProps> = ({ place, onPress }) => {

  const formattedDistance = `${(place.distance).toFixed(1)} km`;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(place)}
    >
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{place.name}</Text>
        <View style={styles.detailsRow}>
          <Text style={styles.type}>{place.type.replace('_', ' ')}</Text>
          <Text style={styles.distance}>{formattedDistance}</Text>
          <Text style={styles.rating}>★ {place.rating.toFixed(1)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  content: {
    gap: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  type: {
    fontSize: 14,
    color: '#757575',
    textTransform: 'capitalize',
  },
  distance: {
    fontSize: 14,
    color: '#757575',
  },
  rating: {
    fontSize: 14,
    color: '#FFA000',
  },
});

export default PlaceListItem;
