// SongDetails.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function SongDetails({ route }) {
  const { song } = route.params; // Recibe la canción seleccionada

  return (
    <View style={styles.container}>
      <Image source={{ uri: song.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{song.title}</Text>
      <Text style={styles.artist}>{song.artist}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  artist: {
    fontSize: 18,
    color: 'gray',
  },
});
