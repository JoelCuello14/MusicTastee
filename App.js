import React, { useEffect, useState } from 'react';
import { StyleSheet, StatusBar, View, ActivityIndicator, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';

import Home from './Vistas/Home';
import Auth from './Vistas/Auth';
import Registro from './Vistas/Registro';
import Ingreso from './Vistas/Ingreso';
import VerUsuarios from './Vistas/VerUsuarios';
import UseStateNumber from './componentes/UseStateNumber';
import UseStateString from './componentes/UseStateString';
import UseStateArray from './componentes/UseStateArray';
import SongDetails from './Vistas/SongDetails';
import SearchResults from './Vistas/SearchResults';
import MenuDrawer from './componentes/MenuDrawer';  // Importa el componente del menú
import ResenasPage from './Vistas/ResenasPage';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const userLoggedIn = await AsyncStorage.getItem('userLoggedIn');
        if (userLoggedIn) {
          authenticateBiometric();
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    checkAuthentication();
  }, []);

  const authenticateBiometric = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) {
      Alert.alert('Dispositivo no compatible con autenticación biométrica');
      setLoading(false);
      return;
    }

    const { success } = await LocalAuthentication.authenticateAsync();
    if (success) {
      setIsAuthenticated(true);
    } else {
      Alert.alert('Falló la autenticación biométrica');
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      <NavigationContainer>
        {isAuthenticated ? (
          <Drawer.Navigator
            initialRouteName="MusicTaste"
            drawerContent={(props) => <MenuDrawer {...props} />}
            screenOptions={{ headerShown: false }} // Menú personalizado
          >
            <Drawer.Screen name="MusicTaste" component={Home} />
            <Drawer.Screen name="UseStateNumber" component={UseStateNumber} />
            <Drawer.Screen name="UseStateString" component={UseStateString} />
            <Drawer.Screen name="UseStateArray" component={UseStateArray} />
            <Drawer.Screen name="VerUsuarios" component={VerUsuarios} />
            <Drawer.Screen name="SongDetails" component={SongDetails} />
            <Drawer.Screen name="SearchResults" component={SearchResults} />
            <Drawer.Screen name="ResenasPage" component={ResenasPage} />
          </Drawer.Navigator>
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Ingreso} />
            <Stack.Screen name="Registro" component={Registro} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
