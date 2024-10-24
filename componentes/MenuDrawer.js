import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function MenuDrawer({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Imagen del perfil del usuario */}
      <View style={styles.profileSection}>
        <Image 
          source={{ uri: 's' }} // Reemplaza con la imagen de perfil del usuario
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Nombre</Text>
        <Text style={styles.profileUsername}>@usuario</Text>
      </View>

      {/* Opciones del menú */}
      <View style={styles.menuOptions}>
        <TouchableOpacity onPress={() => navigation.navigate('MusicTaste')}>
          <Text style={styles.menuItem}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SearchResults')}>
          <Text style={styles.menuItem}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
          <Text style={styles.menuItem}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ResenasPage')}>
          <Text style={styles.menuItem}>Reseñas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Configuración')}>
          <Text style={styles.menuItem}>Configuración</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Sign Out')}>
          <Text style={styles.menuItem}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
  },
  profileName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileUsername: {
    fontSize: 14,
    color: '#aaa',
  },
  menuOptions: {
    marginTop: 20,
  },
  menuItem: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 15,
  },
});
