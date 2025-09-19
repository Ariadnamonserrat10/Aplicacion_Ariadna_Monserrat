import { StyleSheet, Text, View, Image, Platform, StatusBar} from 'react-native'
import React from 'react'
import Botones from '../components/Botones'

export default function Principal() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Principal</Text>
            <Image style={styles.img} source={{ uri: 'https://images.vexels.com/media/users/3/156809/isolated/preview/ffa01a3f7ab1ae183d8820fe7c09fe04-simbolo-del-logotipo-de-la-flor-de-loto.png' }} />
            <Botones />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#864c70ff',
        padding: Platform.OS === 'android' ? StatusBar.currentHeight : 44,
        padding: 16,
        alignItems: 'center',
    },
    title: {
        fontFamily: 'cursive',
        color: '#ffffffff',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 40,
    },
    img: {
        width: 150,
        height: 150,
        marginBottom: 20,
        marginTop:'50%',
    },
})