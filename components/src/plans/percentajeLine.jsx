import React, { useState } from 'react';
import { View, StyleSheet, PanResponder, Text } from 'react-native';

const LineWithMovingBall = () => {
    const [ballPosition, setBallPosition] = useState({ x: 0, y: 0 });
    const [value, setValue] = useState(0);
  
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        const { moveX } = gesture;
        const containerWidth = StyleSheet.flatten(styles.container).width;
        const newPosition = (moveX / containerWidth) * 100;
        const clampedPosition = Math.min(Math.max(newPosition, 0), 100);
        setBallPosition({ x: clampedPosition, y: 0 }); // Actualizar ambas coordenadas
        setValue(Number(clampedPosition.toFixed(0)));
      },
    });
  
    return (
      <View style={styles.container} {...panResponder.panHandlers}>
        <View style={styles.line} />
        <View style={[styles.ball, { left: ballPosition.x }]} />
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{value}</Text>
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
  line: {
    width: '100%',
    height: 2,
    backgroundColor: 'gray',
  },
  ball: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'blue',
    position: 'absolute',
    top: -10,
  },
  valueContainer: {
    marginTop: 10,
  },
  value: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LineWithMovingBall;
