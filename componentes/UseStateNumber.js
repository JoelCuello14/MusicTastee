import { View, Text, Button, StyleSheet } from 'react-native';
import React, {useState} from 'react'  ; 

const UseStateNumber = () => {
    const [numero, setNumero] = useState(0);

  return (
 <View style={styles.container}>
      <Text style={styles.text}>Número: {numero}</Text>
      <Button title="Incrementar " onPress={() => setNumero(numero + 1)} />
      <Button title="Decrementar" onPress={() => setNumero(numero - 1)} />
    </View> 
  )
}

export default UseStateNumber

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      text: {
        fontSize: 24,
        marginBottom: 20,
      },
})