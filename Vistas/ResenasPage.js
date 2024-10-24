import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';

export default function ResenasPage({ route }) {
  const { song } = route.params; // Recibir los datos de la canción desde la navegación

  // Verificación para asegurarse de que song esté definido
  if (!song) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Error: La canción no está definida</Text>
      </View>
    );
  }

  const [puntuacion, setPuntuacion] = useState('');
  const [comentario, setComentario] = useState('');
  const [resenas, setResenas] = useState([]);

  // Función para agregar una nueva reseña
  const agregarResena = () => {
    if (puntuacion === '' || comentario === '') {
      Alert.alert('Error', 'Debes completar todos los campos');
      return;
    }

    const nuevaResena = {
      id: resenas.length + 1,
      id_usuario: 1, // ID del usuario logueado (simulado)
      id_cancion: song.id, // ID de la canción reseñada
      titulo_cancion: song.titulo || 'Título no disponible', // Título de la canción con valor por defecto
      puntuacion: puntuacion,
      comentario: comentario,
      fecha_resena: new Date().toLocaleString(),
    };

    // Agregar la nueva reseña a la lista
    setResenas([...resenas, nuevaResena]);

    // Limpiar los campos
    setPuntuacion('');
    setComentario('');
  };

  // Renderizar una reseña
  const renderResena = ({ item }) => (
    <View style={styles.resenaItem}>
      <Text style={styles.resenaUsuario}>Usuario ID: {item.id_usuario}</Text>
      <Text style={styles.resenaCancion}>Canción: {item.titulo_cancion}</Text>
      <Text style={styles.resenaPuntuacion}>Puntuación: {item.puntuacion}</Text>
      <Text style={styles.resenaComentario}>Comentario: {item.comentario}</Text>
      <Text style={styles.resenaFecha}>Fecha: {item.fecha_resena}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Agregar Reseña para {song.titulo || 'Título no disponible'}</Text>

      {/* Entrada de puntuación */}
      <TextInput
        style={styles.input}
        placeholder="Puntuación (1-5)"
        value={puntuacion}
        keyboardType="numeric"
        onChangeText={setPuntuacion}
      />

      {/* Entrada de comentario */}
      <TextInput
        style={styles.input}
        placeholder="Comentario"
        value={comentario}
        onChangeText={setComentario}
      />

      {/* Botón para agregar reseña */}
      <Button title="Agregar Reseña" onPress={agregarResena} />

      <Text style={styles.header}>Reseñas</Text>

      {/* Listado de reseñas */}
      <FlatList
        data={resenas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderResena}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  resenaItem: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
  },
  resenaUsuario: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  resenaCancion: {
    fontSize: 14,
  },
  resenaPuntuacion: {
    fontSize: 14,
  },
  resenaComentario: {
    fontSize: 12,
    color: '#666',
  },
  resenaFecha: {
    fontSize: 10,
    color: '#aaa',
  },
});
