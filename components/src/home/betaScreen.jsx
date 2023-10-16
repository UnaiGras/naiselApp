import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import LottieView from 'lottie-react-native';

const InstagramInputScreen = () => {
    const [instagramName, setInstagramName] = useState('');

    return (
        <View style={styles.container}>
            {/* Animación Lottie */}
            <LottieView
                source={require('../../../assets/walking.json')} // Reemplaza esto con la ruta a tu animación
                autoPlay
                loop
                style={styles.lottieContainer}
            />

            {/* TextInput para el nombre de Instagram */}
            <TextInput
                style={styles.input}
                placeholder="Introduce tu Instagram"
                value={instagramName}
                onChangeText={setInstagramName}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lottieContainer: {
        width: 200,  // Puedes ajustar estos valores según la dimensión de tu animación
        height: 200,
    },
    input: {
        marginTop: 20,
        width: '80%',
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 10,
    },
});

export default InstagramInputScreen;
