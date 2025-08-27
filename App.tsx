import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { LocationProvider } from './app/provider/LocationProvider';
import MapScreen from './app/screens/MapScreen';

const App = () => {
  return (
    <LocationProvider>
      <SafeAreaView style={styles.safeArea}>
        <MapScreen />
      </SafeAreaView>
    </LocationProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  coordinates: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'monospace',
    color: '#666',
  },
});

export default App;