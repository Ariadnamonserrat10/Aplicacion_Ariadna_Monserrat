import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Cardinfo() {
    return (
        <View style={style.card}>
            <Image style={style.imagen} source={{ uri: 'https://i.pinimg.com/736x/6f/7d/46/6f7d46ab764a48a571d0a07b2d9491d4.jpg' }} />
            <View style={style.cardC}>
                <Text style={style.Titulo}>Card con imagen</Text>
                <Text style={style.cont}>Contenido del card</Text>
                <TouchableOpacity style={style.botonG}>
                    <Text style={style.textoBotonG}>Boton</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    card: {

        backgroundColor: '#ffffff',
        margin: 10,
        borderRadius: 10,
        shadowColor: '#3ddda0ff',
        elevation: 4,
        shadowOpacity: 0.5,
        shadowRadius: 4,
        overflow: 'hidden',
        shadowOffset: { width: 0, height: 3 },


    },
    cardC: {
        padding: 16,
        backgroundColor: '#f4d8ffff',

    },
    Titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    cont: {
        fontSize: 16,
        color: '#333333',
        marginBottom: 12,

    },
    imagen: {
        width: '100%',
        height: 180,
        // borderRadius:10,

    },
    botonG: {
        marginTop: 10,
        backgroundColor: '#6b1d5eff',
        paddingVertical: 14,
        paddingHorizontal:18,
        borderRadius: 10,
        alignSelf:'flex-start',
    },
    textoBotonG: {
        textAlign: 'center',
        color: '#f0f0f0ff',
        fontWeight:'bold',
        fontSize:12,

    },
});