import React from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { Place } from '../types/places';
import PlaceListItem from './PlaceListItem';

interface PlaceListProps {
  places: Place[];
  onPlacePress: (place: Place) => void;
  isLoading: boolean;
}

const PlaceList: React.FC<PlaceListProps> = ({ places, onPlacePress, isLoading }) => {

  const sortedPlaces = [...places].sort((a, b) => a.distance - b.distance);

  const renderItem = ({ item }: { item: Place }) => (
    <PlaceListItem place={item} onPress={onPlacePress} />
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {isLoading ? 'Loading places...' : 'No places found nearby'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedPlaces}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listContent: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
  },
});

export default PlaceList;
