// components/NavBar.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const NavBar = () => {
    const navigation = useNavigation();
    const [selectedItem, setSelectedItem] = useState('home');

    const navItems = [
        { id: 'menu', icon: 'cutlery', label: 'Menu', route: 'Menu' },
        { id: 'inventory', icon: 'archive', label: 'Inventario', route: 'Inventario' },
        { id: 'home', icon: 'home', label: 'Home', route: 'Pantalla2' },
        { id: 'categories', icon: 'sitemap', label: 'Categorias', route: 'Categoria' },
        { id: 'settings', icon: 'cog', label: 'Configuracion', route: 'Configuracion' },
    ];

    // Función para seleccionar el item y navegar
    const selectItem = (item) => {
        setSelectedItem(item.id);       // Actualiza el icono seleccionado
        navigation.navigate(item.route); // Navega a la pantalla correspondiente
    };

    const renderNavItems = () => {
        return navItems.map((item) => {
            const isSelected = selectedItem === item.id;

            return (
                <TouchableOpacity
                    key={item.id}
                    style={styles.navButton}
                    onPress={() => selectItem(item)}
                    activeOpacity={0.8}
                >
                    {isSelected ? (
                        <View style={styles.elevatedCircle}>
                            <View style={styles.purpleCircle}>
                                <FontAwesome name={item.icon} size={18} color="#fff" />
                            </View>
                            <Text style={styles.elevatedText}>{item.label}</Text>
                        </View>
                    ) : (
                        <View style={styles.iconContainer}>
                            <FontAwesome name={item.icon} size={16} color="#8B4513" />
                            <Text style={styles.navText}>{item.label}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            );
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.navContainer}>
                {renderNavItems()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    navContainer: {
        flexDirection: 'row',
        backgroundColor: '#ffffffff',
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        minWidth: 320,
        height: 60,
    },
    navButton: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: 60,
        position: 'relative',
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
    },
    elevatedCircle: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        top: -30,
        zIndex: 10,
    },
    purpleCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#583506ff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
    },
    elevatedText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#553725ff',
        textAlign: 'center',
    },
    navText: {
        fontSize: 10,
        fontWeight: '500',
        color: '#4E342E',
        textAlign: 'center',
        marginTop: 2,
    },
});

export default NavBar;
