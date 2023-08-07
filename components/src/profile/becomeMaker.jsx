import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';

export const BecomeMakerForm = () => {
  const [nombre, setNombre] = useState('');
  const [numero, setNumero] = useState('');
  const [instagram, setInstagram] = useState('');

  const enviarFormulario = () => {
    // Aquí puedes realizar la lógica para enviar los datos del formulario
    // Por ejemplo, puedes hacer una solicitud HTTP para enviar los datos a un servidor
    console.log('Nombre:', nombre);
    console.log('Número:', numero);
    console.log('Instagram:', instagram);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Número"
        value={numero}
        onChangeText={setNumero}
      />
      <TextInput
        style={styles.input}
        placeholder="Instagram"
        value={instagram}
        onChangeText={setInstagram}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={enviarFormulario}
        >
            <Text style={{
                padding: 10,
                fontSize: 14, 
                fontStyle: 'italic', 
                fontWeight: '700'

            }}>
                REGISTER
            </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
    padding: 20,
  },
  input: {
    backgroundColor: '#151515',
    color: '#fff',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#a565f2',
    marginVertical: 30,
    borderRadius: 15,
    width: "80%",
    alignSelf: "center",
    shadowColor: "#00c1b9",
    shadowOffset: {
        width: 30,
        height: 15,
    },
    shadowOpacity: 0.90,
    shadowRadius: 24.00,

    elevation: 20,
}
});


