import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import Btn from "../componentes/Btn";
import { openDrawer } from '../App';

export default function Home({ navigation }) {
  const [data, setData] = useState({
    rockTracks: [],
    popTracks: [],
    hipHopTracks: [],
    electronicTracks: [],
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState("canciones"); // Nueva variable para controlar la pestaña seleccionada

  const getRandomRecommendedTracks = async (genre) => {
    const url = `https://spotify23.p.rapidapi.com/search/?q=${genre}&type=track&offset=0&limit=50&numberOfTopResults=5`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'b14c6cced2mshb2450d86d8781d2p11d1e0jsnc6b2cec7ac91',
        'x-rapidapi-host': 'spotify23.p.rapidapi.com',
      },
    };
  
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      const tracks = result.tracks.items;
      const randomTracks = tracks.sort(() => 0.5 - Math.random()).slice(0, 10);
  
      return randomTracks.map(item => ({
        id: item.data.id ?? `unknown-${item.data.name}`,
        title: item.data.name ?? 'Sin título',
        artist: item.data.artists.items[0]?.profile.name ?? 'Desconocido',
        imageUrl: item.data.albumOfTrack.coverArt.sources[0]?.url ?? '',
      }));
    } catch (error) {
      console.error('Error al obtener las canciones recomendadas:', error);
      return [];
    }
  };
  

  const fetchData = async () => {
    setRefreshing(true);
    try {
      const genres = ['rock', 'pop', 'hip-hop', 'electronic'];
      const genrePromises = genres.map(genre => getRandomRecommendedTracks(genre));
      const randomRecommendedTracksPromise = getRandomRecommendedTracks();
  
      const [results, randomRecommendedTracks] = await Promise.all([
        Promise.all(genrePromises),
        randomRecommendedTracksPromise,
      ]);
      
      const newData = results.reduce((acc, tracks, index) => {
        acc[`${genres[index]}Tracks`] = tracks;
        return acc;
      }, {});
  
      setData(prevData => ({
        ...prevData,
        ...newData,
        recommendedTracks: randomRecommendedTracks,
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
      <View style={styles.headerContainer}>
        {/* Aquí utilizamos navigation.openDrawer() */}
        <TouchableOpacity onPress={() => navigation.openDrawer("MenuDrawer")}>
          <Icon name="menu" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Musictaste</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SearchResults")}>
          <Icon name="search" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={[styles.footerItem, selectedTab === "canciones" && styles.footerItemSelected]}>canciones</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ResenasPage")}>
          <Text style={[styles.footerItem, selectedTab === "reseñas" && styles.footerItemSelected]}>reseñas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ListasPage")}>
          <Text style={[styles.footerItem, selectedTab === "listas" && styles.footerItemSelected]}>listas</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        }
      >
        <Text style={styles.header}>Recomendados</Text>
        <FlatList
          data={data.recommendedTracks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTrackItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carousel}
        />

        <Text style={styles.header}></Text>
        <FlatList
          data={data.popTracks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTrackItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carousel}
        />

        <Text style={styles.header}></Text>
        <FlatList
          data={data.electronicTracks}
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
    padding: 15,
    backgroundColor: '#B02499',
  },
  headerTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
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
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  noImage: {
    width: 100,
    height: 100,
    backgroundColor: '#ccc',
    borderRadius: 10,
  },
  text: {
    fontSize: 13,
    marginTop: 5,
    textAlign: 'center',
    color: 'white',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#B02499',
  },
  footerItem: {
    color: 'white',
    fontSize: 16,
  },
  footerItemSelected: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});
