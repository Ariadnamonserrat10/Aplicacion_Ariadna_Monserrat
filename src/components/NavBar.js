// components/FloatingNavbar.js - Versión Centrada
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const NavBar = ({ onNavigate }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedItem, setSelectedItem] = useState('home');
    const [animation] = useState(new Animated.Value(0));

    const navItems = [
        { id: 'home', icon: 'home', label: 'Inicio' },
        { id: 'search', icon: 'search', label: 'Buscar' },
        { id: 'user', icon: 'user', label: 'Perfil' },
        { id: 'gear', icon: 'gear', label: 'Configuración' },
    ];

    const toggleMenu = () => {
        const toValue = isExpanded ? 0 : 1;

        Animated.timing(animation, {
            toValue,
            duration: 200,
            useNativeDriver: false,
        }).start();

        setIsExpanded(!isExpanded);
    };

    const selectItem = (itemId) => {
        setSelectedItem(itemId);
        setIsExpanded(false);
        animation.setValue(0);

        // Llama la función de navegación 
        if (onNavigate) {
            onNavigate(itemId);
        }
    };

    const getSelectedItem = () => {
        return navItems.find(item => item.id === selectedItem) || navItems[0];
    };

    const renderExpandedItems = () => {
        if (!isExpanded) return null;

        return navItems.map((item, index) => {
            const translateY = animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -(50 * (index + 1))],
            });

            const opacity = animation.interpolate({
                inputRange: [0, 0.3, 1],
                outputRange: [0, 0, 1],
            });

            return (
                <Animated.View
                    key={item.id}
                    style={[
                        styles.expandedItem,
                        {
                            transform: [{ translateY }],
                            opacity,
                        }
                    ]}
                >
                    <TouchableOpacity
                        style={[
                            styles.navButton,
                            selectedItem === item.id && styles.selectedButton
                        ]}
                        onPress={() => selectItem(item.id)}
                    >
                        <FontAwesome
                            name={item.icon}
                            size={16}
                            color={selectedItem === item.id ? "#fff" : "#321158ff"}
                        />
                        <Text style={[
                            styles.navText,
                            selectedItem === item.id && styles.selectedText
                        ]}>
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
            );
        });
    };

    return (
        <View style={styles.container}>
            {/* Elementos expandidos */}
            {renderExpandedItems()}

            {/* Botón principal */}
            <TouchableOpacity
                style={[
                    styles.mainButton,
                    isExpanded && styles.expandedMainButton
                ]}
                onPress={toggleMenu}
            >
                <FontAwesome
                    name={isExpanded ? "times" : getSelectedItem().icon}
                    size={18}
                    color="#fff"
                />
                {!isExpanded && (
                    <Text style={styles.mainButtonText}>
                        {getSelectedItem().label}
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 15,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    mainButton: {
        backgroundColor: '#1c1158ff',
        width: 100,
        height: 40,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
    },
    expandedMainButton: {
        width: 40,
        backgroundColor: '#3045ffff',
    },
    mainButtonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
        marginLeft: 5,
    },
    expandedItem: {
        position: 'absolute',
        bottom: 0,
    },
    navButton: {
        backgroundColor: '#fff',
        width: 100,
        height: 40,
        borderRadius: 18,
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginBottom: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 4,
    },
    selectedButton: {
        backgroundColor: '#241158ff',
    },
    navText: {
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 5,
        color: '#4a50a5ff',
    },
    selectedText: {
        color: '#fff',
    },
});

export default NavBar;