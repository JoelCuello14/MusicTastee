import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CuartoComponente = ({Nombre, Apellido, Edad=20, Domicilio}) => {
  return (
    <View>
      <Text> El nombre es: {Nombre} y el apellido es {Apellido}</Text>
      <Text> La edad es: {Edad}  y El domicilio es: {Domicilio}</Text>
    </View>
  )
}

export default CuartoComponente

const styles = StyleSheet.create({})

