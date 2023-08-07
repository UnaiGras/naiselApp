import React, { useState } from 'react';
import { View, StyleSheet, PanResponder, Animated, Text } from 'react-native';

const SliderComponent = () => {
  const [value, setValue] = useState(50); // Valor inicial

  // Configuración del deslizador
  const pan = useState(new Animated.Value(150))[0];

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      // Calcula la nueva posición de la bola dentro de los límites de la barra
      const newValue = Math.round((gestureState.moveX / 3));
      pan.setValue(gestureState.moveX);
      setValue(newValue);
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.bar} />
      <Animated.View
        style={[
          styles.ball,
          { transform: [{ translateX: pan }] },
        ]}
        {...panResponder.panHandlers}
      />
      <View style={styles.valueContainer}>
        <Text style={styles.valueText}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bar: {
    width: '80%',
    height: 4,
    backgroundColor: '#ccc',
  },
  ball: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'red',
    position: 'absolute',
    top: -13,
    zIndex: 1,
  },
  valueContainer: {
    marginTop: 20,
  },
  valueText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SliderComponent;


