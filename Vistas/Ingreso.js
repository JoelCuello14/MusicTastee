import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Button, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import Registro from './Registro';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Ingreso({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const saveLogin = async () => {

    await AsyncStorage.setItem('userLoggedIn', 'true');

  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, completa todos los campos');
      return;
    }

    try {
        //Este fetch es a mi IPV4 (la sacan con ip config y se debe modificar si cambian de wifi) :3000 (el puerto donde escucha el backend)
      const response = await fetch(`http://10.0.4.130:3000/api/usuarios?email=${email}`);
      
      if (response.ok) {
        const usuarios = await response.json();
        const usuario= usuarios.find(user => user.email === email);
        
        if (usuario) {
          Alert.alert('Éxito', `Bienvenido, ${email}`);
          saveLogin();  
        } else {
          Alert.alert('Error', 'El usuario no existe');
        }
      } else {
        Alert.alert('Error', 'No se pudo verificar el usuario');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al conectar con el servidor');
    }
  };

  return (
    <>
    {/* <ImageBackground
      source={require('./assets/iconn.png')} // Cambia a la ruta de tu imagen
      style={styles.background}
    ></ImageBackground> */}
    
    
    <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>✨</Text>
        </View>
        
        <Text style={styles.title}>Iniciar sesión</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Iniciar sesión</Text>
        </TouchableOpacity>

        <View style={styles.separator}>
          <Text style={styles.separatorLine}></Text>
          <Text style={styles.separatorText}>o</Text>
          <Text style={styles.separatorLine}></Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
          <Text style={styles.createAccountText}>
            ¿No tienes una cuenta? <Text style={styles.createAccountLink}>Crea una cuenta</Text>
          </Text>
        </TouchableOpacity>
      </View>
      </>
    );
  };

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

  // import React, { useState } from 'react';
  // import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

  // // Importa los iconos y cualquier dependencia para iniciar sesión con Google
  // // Ejemplo: import { FontAwesome } from '@expo/vector-icons';

  // const LoginScreen = () => {
  //   const [email, setEmail] = useState('');
  //   const [password, setPassword] = useState('');


  //   return (
  //     <View style={styles.container}>
  //       <View style={styles.logoContainer}>
  //         <Text style={styles.logo}>✨</Text>
  //       </View>
        
  //       <Text style={styles.title}>Iniciar sesión</Text>
        
  //       <TextInput
  //         style={styles.input}
  //         placeholder="Correo Electrónico"
  //         placeholderTextColor="#999"
  //         value={email}
  //         onChangeText={setEmail}
  //         keyboardType="email-address"
  //       />
        
  //       <TextInput
  //         style={styles.input}
  //         placeholder="Contraseña"
  //         placeholderTextColor="#999"
  //         value={password}
  //         onChangeText={setPassword}
  //         secureTextEntry
  //       />
        
  //       <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
  //         <Text style={styles.loginButtonText}>Iniciar sesión</Text>
  //       </TouchableOpacity>

  //       <View style={styles.separator}>
  //         <Text style={styles.separatorLine}></Text>
  //         <Text style={styles.separatorText}>o</Text>
  //         <Text style={styles.separatorLine}></Text>
  //       </View>

  //       <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
  //         {/* Icono de Google */}
  //         <Text style={styles.googleButtonText}>Iniciar sesión con Google</Text>
  //       </TouchableOpacity>

  //       <TouchableOpacity>
  //         <Text style={styles.createAccountText}>
  //           ¿No tienes una cuenta? <Text style={styles.createAccountLink}>Crea una cuenta</Text>
  //         </Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };

  // const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     backgroundColor: '#000',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     padding: 20,
  //   },
  //   logoContainer: {
  //     marginBottom: 40,
  //   },
  //   logo: {
  //     fontSize: 50,
  //     color: '#A52ACC', // Color morado
  //   },
  //   title: {
  //     fontSize: 24,
  //     fontWeight: 'bold',
  //     color: '#fff',
  //     marginBottom: 20,
  //   },
  //   input: {
  //     width: '100%',
  //     height: 50,
  //     backgroundColor: '#333',
  //     borderRadius: 8,
  //     paddingHorizontal: 15,
  //     color: '#fff',
  //     marginBottom: 20,
  //   },
  //   loginButton: {
  //     width: '100%',
  //     height: 50,
  //     backgroundColor: '#A52ACC',
  //     borderRadius: 8,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     marginBottom: 20,
  //   },
  //   loginButtonText: {
  //     color: '#fff',
  //     fontSize: 18,
  //     fontWeight: 'bold',
  //   },
  //   separator: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     marginBottom: 20,
  //   },
  //   separatorLine: {
  //     height: 1,
  //     flex: 1,
  //     backgroundColor: '#666',
  //   },
  //   separatorText: {
  //     color: '#fff',
  //     marginHorizontal: 10,
  //   },
  //   googleButton: {
  //     width: '100%',
  //     height: 50,
  //     backgroundColor: '#333',
  //     borderRadius: 8,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     flexDirection: 'row',
  //     marginBottom: 20,
  //   },
  //   googleButtonText: {
  //     color: '#fff',
  //     fontSize: 18,
  //     marginLeft: 10,
  //   },
  //   createAccountText: {
  //     color: '#fff',
  //   },
  //   createAccountLink: {
  //     color: '#A52ACC',
  //     fontWeight: 'bold',
  //   },
  // });

  // export default LoginScreen;