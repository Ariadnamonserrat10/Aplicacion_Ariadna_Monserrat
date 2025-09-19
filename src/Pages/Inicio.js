import React from 'react';
import { StyleSheet, View, Text, Platform, StatusBar } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Cambio para Expo

const Inicio = () => {
    return (
        <View style={styles.main}>
            {/* Inicio del AppBar */}
            <View style={styles.appBar}>
                <FontAwesome name="arrow-left" size={20} color="#000"/>
                <Text style={styles.title}>Ariadna</Text>
                <View style={{ width: 20 }} />
            </View>
            {/* Fin del AppBar */}

            {/* navbar */}
            <View style={styles.navbar}>
                <View style={styles.navItem}>
                    <FontAwesome name="home" size={20} color="#000"/>
                    <Text style={styles.navText}>Inicio</Text>
                </View>
                <View style={styles.navItem}>
                    <FontAwesome name="search" size={20} />
                    <Text style={styles.navText}>Buscar</Text>
                </View>
                <View style={styles.navItem}>
                    <FontAwesome name="user" size={20} />
                    <Text style={styles.navText}>Perfil</Text>
                </View>
                <View style={styles.navItem}>
                    <FontAwesome name="gear" size={20} />
                    <Text style={styles.navText}>Configuración</Text>
                </View>
            </View>
            {/* fin del navbar */}
        </View>
    );
}

export default Inicio;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#cfaecfff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 44,
    },
    appBar: {
        height: 50,
        width: '100%',
        backgroundColor: '#ffffffff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    title: {
        fontFamily: 'cursive',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
    },
    navbar: {
        height: 70,
        backgroundColor: '#ffffffff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderTopWidth: 0.3,
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        fontSize: 12,
        color: '#000000',
        marginTop: 4,
    },
});
