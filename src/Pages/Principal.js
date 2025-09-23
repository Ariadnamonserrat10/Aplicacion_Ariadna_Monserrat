import { StyleSheet, Text, View, Image, Platform, StatusBar } from 'react-native'
import React from 'react'
import Botones from '../components/Botones'

export default function Principal() {
    return (
        <View style={styles.container}>
            <Image style={styles.img} source={{ uri: 'https://cafeteriaestacion.es/wp-content/uploads/2024/10/cropped-logo_cafeteriaestacion_transp-01.png' }} />
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
    img: {
        width: 280,
        height: 290,
        marginBottom: 20,
        marginTop: '50%',
    },
    circuloSup: {
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: '#ffa947ff',
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
        backgroundColor: '#ffa947ff',
        position: 'absolute',
        bottom: -150,
        left: -150,
        zIndex: 10,
        elevation: 10,
    },
});
