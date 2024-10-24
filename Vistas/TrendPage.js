import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TrendPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Canciones en Tendencia</Text>
      {/* Aquí se conectará la API de Spotify para mostrar las canciones de tendencia */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default TrendPage;
