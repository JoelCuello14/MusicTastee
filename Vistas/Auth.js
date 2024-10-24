/*import * as LocalAuthentication from 'expo-local-authentication';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Auth = () => {
    const navigation = useNavigation();
  const authenticate = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Autenticarse',
        fallbackLabel: 'Usar pin o patrón',
      });

      if (result.success) {
        navigation.navigate('Login');
        console.log('Autenticación exitosa');
      } else {
        console.log('Autenticación fallida');
      }
    } catch (error) {
      console.error('Error durante autenticación', error);
    }
  };

  return (
    <View>
      <Button title="Autenticarse" onPress={authenticate} />
    </View>
  );
};

export default Auth;*/

import React, { useEffect, useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import { Button, Text, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

const Auth = () => {
  const navigation = useNavigation();
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  useEffect(() => {
    // Verificar si el dispositivo admite autenticación biométrica
    const checkBiometricSupport = async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    };

    checkBiometricSupport();
  }, []);

  // Función para autenticar usando biometría
  const authenticate = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Autenticarse',
        fallbackLabel: 'Usar pin o patrón',
      });

      if (result.success) {
        // Si la autenticación es exitosa, recuperamos el correo guardado y navegamos
        const email = await SecureStore.getItemAsync('userEmail');

        if (email) {
          Alert.alert('Autenticación exitosa', `Bienvenido de nuevo, ${email}`);
          navigation.navigate('Home'); // Navega a la pantalla que desees
        } else {
          Alert.alert('Error', 'No se encontró ningún correo asociado.');
        }

        console.log('Autenticación biométrica exitosa');
      } else {
        console.log('Autenticación biométrica fallida');
      }
    } catch (error) {
      console.error('Error durante autenticación biométrica', error);
    }
  };

  // Función para guardar el correo electrónico después del inicio de sesión
  const saveEmail = async (email) => {
    try {
      await SecureStore.setItemAsync('userEmail', email);
      Alert.alert('Correo guardado', 'El correo ha sido guardado para futuras autenticaciones.');
    } catch (error) {
      console.error('Error al guardar el correo', error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      {isBiometricSupported ? (
        <>
          <Button title="Autenticarse con huella" onPress={authenticate} />
          <Button
            title="Guardar correo (simular login)"
            onPress={() => saveEmail('usuario@example.com')} // Cambia este correo por el del usuario autenticado
          />
        </>
      ) : (
        <Text>Tu dispositivo no soporta autenticación biométrica</Text>
      )}
    </View>
  );
};

export default Auth;
