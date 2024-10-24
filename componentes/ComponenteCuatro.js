import { View, Text } from 'react-native'
import React from 'react'
import PrimerComponente from './PrimerComponente'


const ComponenteCuatro = ({navigation}) => {
  return (
    <View>
      <Text>Este es un cuarto componente </Text>
      <PrimerComponente></PrimerComponente>
    </View>
  )
}

export default ComponenteCuatro