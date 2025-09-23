// components/NavBar.js - Con animación de selección elevada
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const NavBar = ({ onNavigate }) => {
    const [selectedItem, setSelectedItem] = useState('home');
    const animatedValues = useRef({});

    const navItems = [
        { id: 'home', icon: 'home', label: 'Home' },
        { id: 'search', icon: 'search', label: 'Search' },
        { id: 'gift', icon: 'gift', label: 'Gift' },
        { id: 'cart', icon: 'shopping-cart', label: 'Cart' },
        { id: 'user', icon: 'user', label: 'Profile' },
    ];

    // Inicializar valores animados para cada item
    useEffect(() => {
        navItems.forEach(item => {
            if (!animatedValues.current[item.id]) {
                animatedValues.current[item.id] = new Animated.Value(item.id === selectedItem ? 1 : 0);
            }
        });
    }, []);

    const selectItem = (itemId) => {
        if (selectedItem !== itemId) {
            // Animar el item anterior hacia abajo
            if (animatedValues.current[selectedItem]) {
                Animated.timing(animatedValues.current[selectedItem], {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false,
                }).start();
            }

            // Animar el nuevo item hacia arriba
            if (animatedValues.current[itemId]) {
                Animated.timing(animatedValues.current[itemId], {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: false,
                }).start();
            }

            setSelectedItem(itemId);
        }

        if (onNavigate) {
            onNavigate(itemId);
        }
    };

    const renderNavItems = () => {
        return navItems.map((item, index) => {
            const isSelected = selectedItem === item.id;
            const animatedValue = animatedValues.current[item.id] || new Animated.Value(0);

            // Interpolaciones para la animación
            const translateY = animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -25], // Se mueve hacia arriba
            });

            const circleScale = animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1], // El círculo aparece/desaparece
            });

            const circleOpacity = animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
            });

            return (
                <TouchableOpacity
                    key={item.id}
                    style={styles.navButton}
                    onPress={() => selectItem(item.id)}
                    activeOpacity={0.8}
                >
                    {/* Círculo elevado - solo visible cuando está seleccionado */}
                    <Animated.View
                        style={[
                            styles.elevatedCircle,
                            {
                                transform: [
                                    { translateY },
                                    { scale: circleScale }
                                ],
                                opacity: circleOpacity,
                            }
                        ]}
                    >
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
                    </Animated.View>

                    {/* Contenedor del ícono normal */}
                    <Animated.View
                        style={[
                            styles.iconContainer,
                            {
                                opacity: animatedValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1, 0], // Se desvanece cuando está seleccionado
                                })
                            }
                        ]}
                    >
                        <FontAwesome
                            name={item.icon}
                            size={16}
                            color="#8B4513"
                        />
                        <Text style={styles.navText}>
                            {item.label}
                        </Text>
                    </Animated.View>
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
        backgroundColor: '#8D6E63', // Marrón medio
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
        top: -30, // Posición elevada
        zIndex: 10,
    },
    purpleCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#6A4C93', // Color morado/café
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
        color: '#6A4C93',
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