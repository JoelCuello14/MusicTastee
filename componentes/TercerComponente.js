import { StyleSheet, Text, View } from 'react-native';
import Btn from './Btn';
export default function TercerComponente({navigation}) {
    return(
        <View>
        <Text>Tercer componente </Text>
        <Btn texto="Ir al home" presionado={() => navigation.navigate("Home")}></Btn>
        <Btn></Btn>
        </View>
       
    );
}