import { StyleSheet, Text, View, Image, Platform, StatusBar } from 'react-native'
import React from 'react'
import Botones from '../components/Botones'

export default function Principal() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome</Text>
            <Image style={styles.img} source={{ uri: 'https://images.freeimages.com/image/previews/8dc/blue-flax-blossom-watercolor-png-art-5702406.png' }} />
            <View style={styles.circuloSup} />
            <View style={styles.circuloInf} />
            <Botones />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffffff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 44,
        alignItems: 'center',
    },
    title: {
        fontFamily: 'cursive',
        color: '#000000ff',
        fontSize: 70,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '30%',
    },
    img: {
        width: 200,
        height: 180,
        marginBottom: 20,
        marginTop: '15%',
        opacity: 0.3,
    },
    circuloSup: {
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: '#1c2c5fff',
        position: 'absolute',
        top: -150,
        right: -150,
        zIndex: 10,
        elevation: 10,
    },
    circuloInf: {
        width: 300,
        height: 330,
        borderRadius: '80%',
        backgroundColor: '#1c2c5fff',
        position: 'absolute',
        bottom: -150,
        left: -150,
        zIndex: 10,
        elevation: 10,
    },
});
