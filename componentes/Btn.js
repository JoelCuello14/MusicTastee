import { Text, TouchableOpacity, StyleSheet } from "react-native"

export default function Btn({ presionado, texto = "Boton por defecto" }) {
    return (
        <>
            <TouchableOpacity style={styles.boton}>
                <Text style={styles.teto} onPress={presionado}>
                    {texto}
                </Text>
            </TouchableOpacity>
        </>
    )
}


const styles = StyleSheet.create({
    boton: {
        padding: 10,
        backgroundColor: '#B02499',
        width: 100,
        margin: 40,
    },
    teto:{
        color: 'white',
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        fontSize: 16
    }
}
)