import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ConfiguracionPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla de Configuración</Text>
      {/* Aquí el usuario podrá gestionar las configuraciones de la aplicación */}
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

export default ConfiguracionPage;
