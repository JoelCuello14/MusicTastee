import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, ScrollView, RefreshControl } from 'react-native';

const HomePage = () => {
  const [data, setData] = useState({ tracks: [], albums: [] });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // Estado para controlar el refresco

  // Función para generar un término de búsqueda aleatorio
  const getRandomSearchTerm = () => {
    const randomTerms = ['love', 'life', 'music', 'happy', 'sad', 'dream', 'night', 'day', 'dance', 'party', 'hyperpop', 'phonk', 'argentina', 'Rock Nacional'];
    return randomTerms[Math.floor(Math.random() * randomTerms.length)];
  };

  // Función para crear la URL con un término de búsqueda aleatorio
  const getSearchUrl = () => {
    const searchTerm = getRandomSearchTerm();
    return `https://spotify23.p.rapidapi.com/search/?q=${searchTerm}&type=multi&offset=0&limit=10&numberOfTopResults=5`;
  };

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'ec21bd33d9mshf71456310db0d9fp1b3a18jsn9a2998443424',
      'x-rapidapi-host': 'spotify23.p.rapidapi.com',
    },
  };

  const fetchData = async () => {
    setRefreshing(true); // Establece refreshing a true antes de cargar datos
    try {
      const url = getSearchUrl(); // Llama a la función para obtener una URL con término aleatorio
      const response = await fetch(url, options);
      const result = await response.json();

      const tracks = result?.tracks?.items?.map(item => ({
        id: item?.data?.id ?? 'unknown',
        title: item?.data?.name ?? 'Sin título',
        artist: item?.data?.artists?.items[0]?.profile?.name ?? 'Desconocido',
        imageUrl: item?.data?.albumOfTrack?.coverArt?.sources[0]?.url ?? '',
      })) || [];

      const albums = result?.albums?.items?.map(item => ({
        id: item?.data?.id ?? 'unknown',
        title: item?.data?.name ?? 'Sin título',
        imageUrl: item?.data?.coverArt?.sources[0]?.url ?? '',
      })) || [];

      setData({ tracks, albums });
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    } finally {
      setLoading(false);
      setRefreshing(false); // Establece refreshing a false después de cargar datos
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Solo se ejecuta al montar el componente

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando datos...</Text>
      </View>
    );
  }

  const renderTrackItem = ({ item }) => (
    <View style={styles.carouselItem}>
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
      ) : (
        <View style={styles.noImage} />
      )}
      <Text style={styles.text}>{item.title}</Text>
      <Text style={styles.text}>{item.artist}</Text>
    </View>
  );

  const renderAlbumItem = ({ item }) => (
    <View style={styles.carouselItem}>
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
      ) : (
        <View style={styles.noImage} />
      )}
      <Text style={styles.text}>{item.title}</Text>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fetchData} /> // Control de refresco
      }
    >
      <Text style={styles.header}>Pistas</Text>
      <FlatList
        data={data.tracks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTrackItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
      />

      <Text style={styles.header}>Álbumes</Text>
      <FlatList
        data={data.albums}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderAlbumItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
      />
    </ScrollView>
  );
};

// Estilos para el componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  carousel: {
    paddingVertical: 10,
  },
  carouselItem: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200, // Ajusta el tamaño de la imagen
    height: 200, // Ajusta el tamaño de la imagen
    borderRadius: 10, // Opcional: para bordes redondeados
  },
  noImage: {
    width: 100, // Ajusta el tamaño de la imagen de 'no disponible'
    height: 100, // Ajusta el tamaño de la imagen de 'no disponible'
    backgroundColor: '#ccc',
    borderRadius: 10, // Opcional: para bordes redondeados
  },
  text: {
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center', // Centra el texto debajo de la imagen
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomePage;
