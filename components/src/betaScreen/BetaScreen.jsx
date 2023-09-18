import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const WalkingAnimationScreen = () => {
  const [instagram, setInstagram] = useState('');

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../../assets/data.json')} // Cambia por la ruta de tu animación Lottie
        autoPlay
        loop
        style={styles.animation}
      />
      <TextInput
        style={styles.input}
        value={instagram}
        onChangeText={setInstagram}
        placeholder="Deja tu Instagram aquí"
        placeholderTextColor="#888"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 200,
    height: 200,
  },
  input: {
    marginTop: 20,
    width: '80%',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    color: 'white',
    textAlign: 'center',
  },
});

export default WalkingAnimationScreen;