import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import CuartoComponente from './CuartoComponente'
import PrimerComponente from './PrimerComponente'
import SegundoComponente from './SegundoComponente'

const ScrollV = () => {
  return (
    <View>
      <ScrollView>

        <CuartoComponente></CuartoComponente>
        <Text style={{ width: 200, height: 100, backgroundColor: 'green' }}> Esto es un scrollView </Text>
        <Text style={{ width: 200, height: 200, backgroundColor: 'gray' }}>OTRO texto</Text>
        <Text style={{ width: 300, height: 150, backgroundColor: 'green' }}>OTRO texto</Text>
        <Text>OTRO texto</Text>
        <Text>OTRO texto</Text>
        <Text>OTRO texto</Text>
        <Text>OTRO texto</Text>
        <Text>OTRO texto</Text>
        <Text>OTRO texto</Text>
        <Text>OTRO texto</Text>
        <Text>OTRO texto</Text>
        <Text>OTRO texto</Text>
        <Text>OTRO texto</Text>
        <Text>OTRO texto</Text>
        <Text>OTRO texto</Text>
        <Text>OTRO texto</Text>
        <Text>OTRO texto</Text>
        <Text>OTRO texto</Text>
        <Text>OTRO texto</Text>
        <Text>OTRO texto</Text>
        <Text>OTRO texto</Text>
        <Text>OTRO texto</Text>
        <Text>OTRO texto</Text>
        <Text>OTRO texto</Text>
        <Text>OTRO texto</Text>
        



      </ScrollView>
    </View>
  )
}

export default ScrollV

const styles = StyleSheet.create({})