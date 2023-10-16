import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const BackButton = ({ navigation }) => {
  
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.goBack()}>
      <Ionicons
        name="arrow-back"
        size={34}
        color="white"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // Añade otros estilos según lo necesites, como dimensiones o margen.
  }
});
