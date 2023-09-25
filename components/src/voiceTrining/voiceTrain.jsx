import React, { useState } from "react";
import { View, Button, TextInput, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { AddNewVoice } from "../../../helpers";
import { Audio } from 'expo-av';


export const VoiceTrainingScreen = () => {
  const [voiceName, setVoiceName] = useState("");
  const [filesArray, setFilesArray] = useState([]);
  const [description, setDescription] = useState("");
  const [training, setTraining] = useState(false)

  const getAudioDuration = async (uri) => {
    const { sound } = await Audio.Sound.createAsync({ uri });
    const { durationMillis } = await sound.getStatusAsync();
    await sound.unloadAsync();
    return durationMillis;
  };
  

  const handleFileSelection = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({ type: "audio/*" });
      if (res.type === "success") {
        const duration = await getAudioDuration(res.uri);
        const audioInfo = {
          uri: res.uri,
          name: res.name,
          size: res.size,
          duration,
        };
        setFilesArray((prevFilesArray) => [...prevFilesArray, audioInfo]);
      }
    } catch (error) {
      console.log("Error al seleccionar el archivo:", error);
    }
  };


  const handleVoiceTraining = async() => {
    setTraining(true)
    await AddNewVoice(voiceName, filesArray, description);
    setTraining(false)
  };

  return (
    <View style={styles.container}>

      <TextInput
        placeholder="Nombre de la voz"
        value={voiceName}
        onChangeText={setVoiceName}
        style={styles.voiceNameInput}
        placeholderTextColor="#151515"
      />
      <TextInput
        placeholder="Descripcion de la voz"
        value={description}
        onChangeText={setDescription}
        style={styles.voiceNameInput}
        placeholderTextColor="#151515"
      />

    <View style={{margin: 5, borderWidth: 1, borderColor: "gray", borderRadius: 20}}>
      {filesArray.map((audio, index) => (
          <View key={index} style={styles.audioContainer}>
              <Ionicons name="md-document" size={24} color="#fff" />
              <Text style={[styles.audioInfo, { flex: 2 }]}>{audio.name}</Text>
              <Text style={[styles.audioInfo, { flex: 1 }]}>{(audio.duration / 1000).toFixed(2)} s</Text>
              <Text style={[styles.audioInfo, { flex: 1 }]}>{(audio.size / (1024 * 1024)).toFixed(2)} MB</Text>
          </View>
      ))}
      <TouchableOpacity
        style={styles.button}
        onPress={handleFileSelection}
      >
        <Ionicons name="md-add" size={24} color="#fff" />
        <Text style={styles.buttonText}>Seleccionar audio</Text>
      </TouchableOpacity>
      </View>
      

      <TouchableOpacity style={styles.button} onPress={handleVoiceTraining}>
        <Text style={styles.buttonText}>Entrenar voz</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C1E", // Color de fondo similar al modo oscuro de iOS
    padding: 20,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#3A3A3C', // Botón con un gris ligeramente más claro
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  buttonText: {
    color: "#FFF", // Texto blanco
    fontSize: 18,
    fontWeight: "500", // Añadido peso para el texto
    marginLeft: 10,
  },
  voiceNameInput: {
    height: 45,
    backgroundColor: "#2C2C2E", // Un gris más claro para los campos de texto
    borderRadius: 12,
    paddingLeft: 15, // Espaciado adicional al principio para el texto
    marginBottom: 20,
    color: "#FFF", // Texto blanco
    fontSize: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  audioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
    marginBottom: 10
},
audioInfo: {
    color: '#fff',
    marginLeft: 10,
    fontWeight: "800",
    maxWidth: 200,
    maxHeight: 20
}
});
