import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ResenasPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla de Reseñas</Text>
      {/* Aquí se mostrará la información relacionada con las reseñas */}
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

export default ResenasPage;
