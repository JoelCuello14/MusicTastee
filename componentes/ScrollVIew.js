import React from 'react';
import { ScrollView, View, Text } from 'react-native';

const HorizontalScrollView = () => {
    return (
      <ScrollView horizontal={true}>
        {/* Agrega aquí tus elementos horizontales */}
        <View style={{ width: 200, height: 200, backgroundColor: 'red' }}>
          <Text>Elemento 1</Text>
        </View>
        <View style={{ width: 200, height: 200, backgroundColor: 'blue' }}>
          <Text>Elemento 2</Text>
        </View>
        <View style={{ width: 200, height: 200, backgroundColor: 'green' }}>
          <Text>Elemento 3</Text>
        </View>
        <View style={{ width: 200, height: 200, backgroundColor: 'gray' }}>
          <Text>Elemento 4</Text>
        </View>
        
      </ScrollView>
    );
  };
  
  export default HorizontalScrollView;