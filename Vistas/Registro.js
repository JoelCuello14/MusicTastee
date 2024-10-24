import React, { Component, useState } from 'react';
import { Text, StyleSheet, View, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import Ingreso from './Ingreso';


export default function Registro({navigation}) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Función para enviar los datos del formulario
  const handleSubmit = async () => {
    if (!nombre || !password || !email) {
      Alert.alert('Error', 'Por favor, completa todos los campos');
      return;
    }

    try {
      const response = await fetch('http://10.0.4.130:3000/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombre,
          password: password,
          email: email,
        }),
      });
      if (response.ok) {
        const result = await response.json();
        Alert.alert('Éxito', 'Usuario creado exitosamente');
        // limpiar los campos del formulario 
        setNombre('');
        setPassword('');
        setEmail('');
      } else {
        Alert.alert('Error', 'No se pudo crear el usuario');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al conectar con el servidor');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
          <Text style={styles.logo}>✨</Text>
        </View>
        
        <Text style={styles.title}>Registro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor="#999"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#999"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
          <Text style={styles.loginButtonText}>Iniciar sesión</Text>
        </TouchableOpacity>

        <View style={styles.separator}>
          <Text style={styles.separatorLine}></Text>
          <Text style={styles.separatorText}>o</Text>
          <Text style={styles.separatorLine}></Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.createAccountText}>
            ¿Ya tienes una cuenta? <Text style={styles.createAccountLink}>Inicia Sesion</Text>
          </Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    height: 300,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logo: {
    fontSize: 50,
    color: '#A52ACC', // Color morado
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 15,
    color: '#fff',
    marginBottom: 20,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#A52ACC',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  separatorLine: {
    height: 1,
    flex: 1,
    backgroundColor: '#666',
  },
  separatorText: {
    color: '#fff',
    marginHorizontal: 10,
  },
  googleButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#333',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
  createAccountText: {
    color: '#fff',
  },
  createAccountLink: {
    color: '#A52ACC',
    fontWeight: 'bold',
  },
});
