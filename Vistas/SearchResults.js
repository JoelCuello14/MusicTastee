import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, searchVisible } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements'; // Agregar SearchBar y Icon
import Btn from "../componentes/Btn";


export default function Home({ navigation }) {
  const [data, setData] = useState({
    tracks: [],
    albums: [],
    rockTracks: [],
    popTracks: [],
    hipHopTracks: [],
    electronicTracks: [],
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false); // Controla si se muestra la barra de búsqueda
  const [searchQuery, setSearchQuery] = useState(''); // Almacena el valor del input de búsqueda

  // Función para crear la URL con un término de búsqueda
  const getSearchUrl = (query = '', genre) => {
    const searchTerm = query !== '' ? query : genre;
    return `https://spotify23.p.rapidapi.com/search/?q=${searchTerm}&type=multi&offset=0&limit=10&numberOfTopResults=5`;
  };

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'b14c6cced2mshb2450d86d8781d2p11d1e0jsnc6b2cec7ac91',
      'x-rapidapi-host': 'spotify23.p.rapidapi.com',
    },
  };

  const fetchData = async (query = '') => {
    setRefreshing(true);
    try {
      const genres = ['rock', 'pop', 'hip-hop', 'electronic'];

      const genrePromises = genres.map(async (genre) => {
        const url = getSearchUrl(query, genre);
        const response = await fetch(url, options);
        const result = await response.json();
        
        return {
          genre,
          tracks: result?.tracks?.items?.map(item => ({
            id: item?.data?.id ?? `unknown-${item?.data?.name}`,
            title: item?.data?.name ?? 'Sin título',
            artist: item?.data?.artists?.items[0]?.profile?.name ?? 'Desconocido',
            imageUrl: item?.data?.albumOfTrack?.coverArt?.sources[0]?.url ?? '',
          })) || [],
        };
      });

      const results = await Promise.all(genrePromises);

      const newData = results.reduce((acc, { genre, tracks }) => {
        acc[`${genre}Tracks`] = tracks;
        return acc;
      }, {});

      setData(prevData => ({
        ...prevData,
        ...newData,
      }));
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = () => {
    fetchData(searchQuery); // Llamar la función de búsqueda con el valor de la barra de búsqueda
  };

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
      <TouchableOpacity onPress={() => navigation.navigate('ResenasPage', { songId: item.id, songTitle: item.title, artist: item.artist })}>
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
      ) : (
        <View style={styles.noImage} />
      )}
    
      
    <Text style={styles.text}>{item.title}</Text>
    <Text style={styles.text}>{item.artist}</Text>
</TouchableOpacity>
    </View>
  );


  return (
    <>

      <SearchBar
      placeholder="Buscar música..."
      onChangeText={setSearchQuery}
      value={searchQuery}
      platform="default"
      onSubmitEditing={handleSearch}
      containerStyle={styles.searchBar}
      inputContainerStyle={{ backgroundColor: '#fff' }}
      />

      {/* Barra de búsqueda condicional */}
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        }
      >
        <Text style={styles.header}>Canciones</Text>
        <FlatList
          data={data.rockTracks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTrackItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carousel}
        />

        
      </ScrollView>
    </>
  );
};

// Estilos para el componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'black',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  searchBar: {
    marginVertical: 10,
    backgroundColor: '#B02499',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'white',
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
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  noImage: {
    width: 100,
    height: 100,
    backgroundColor: '#ccc',
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
    color: 'white',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

