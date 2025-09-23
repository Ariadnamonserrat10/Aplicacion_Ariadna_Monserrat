// components/NavBar.js - Versión optimizada para mejor rendimiento
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const NavBar = ({ onNavigate }) => {
    const [selectedItem, setSelectedItem] = useState('home');
    const [animating, setAnimating] = useState(false);

    const navItems = [
        { id: 'menu', icon: 'cutlery', label: 'Menu' },
        { id: 'inventory', icon: 'archive', label: 'Inventario' },
        { id: 'home', icon: 'home', label: 'Home' },
        { id: 'categories', icon: 'sitemap', label: 'Categorias' },
        { id: 'settings', icon: 'cog', label: 'Configuracion' },
    ];

    const selectItem = (itemId) => {
        if (selectedItem !== itemId && !animating) {
            setAnimating(true);
            setSelectedItem(itemId);
            
            // Resetear el flag después de la animación
            setTimeout(() => {
                setAnimating(false);
            }, 200);

            if (onNavigate) {
                onNavigate(itemId);
            }
        }
    };

    const renderNavItems = () => {
        return navItems.map((item, index) => {
            const isSelected = selectedItem === item.id;

            return (
                <TouchableOpacity 
                    key={item.id} 
                    style={styles.navButton} 
                    onPress={() => selectItem(item.id)} 
                    activeOpacity={0.8}
                >
                    {/* Círculo elevado - solo visible cuando está seleccionado */}
                    {isSelected && (
                        <View style={styles.elevatedCircle}>
                            <View style={styles.purpleCircle}>
                                <FontAwesome
                                    name={item.icon}
                                    size={18}
                                    color="#fff"
                                />
                            </View>
                            <Text style={styles.elevatedText}>
                                {item.label}
                            </Text>
                        </View>
                    )}

                    {/* Contenedor del ícono normal - solo visible cuando NO está seleccionado */}
                    {!isSelected && (
                        <View style={styles.iconContainer}>
                            <FontAwesome
                                name={item.icon}
                                size={16}
                                color="#8B4513"
                            />
                            <Text style={styles.navText}>
                                {item.label}
                            </Text>
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
        shadowOffset: {
            width: 0,
            height: 4,
        },
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
        shadowOffset: {
            width: 0,
            height: 3,
        },
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