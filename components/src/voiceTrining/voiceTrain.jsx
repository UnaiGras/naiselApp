import React, { useState } from "react";
import { View, Button, TextInput, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";

export const VoiceTrainingScreen = () => {
  const [voiceName, setVoiceName] = useState("");
  const [filesArray, setFilesArray] = useState([]);
  const [description, setDescription] = useState("");
  const [training, setTraining] = useState(false)

  const handleFileSelection = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({ type: "audio/*" });
      if (res.type === "success") {
        setFilesArray((prevFilesArray) => [...prevFilesArray, res.uri]);
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
      <TouchableOpacity
        style={styles.button}
        onPress={handleFileSelection}
      >
        <Ionicons name="md-add" size={24} color="#fff" />
        <Text style={styles.buttonText}>Seleccionar audio</Text>
      </TouchableOpacity>

      {filesArray.map((uri, index) => (
        <View key={index}>
        </View>
      ))}

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
      <TouchableOpacity style={styles.button} onPress={handleVoiceTraining}>
        <Text style={styles.buttonText}>Entrenar voz</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#101010",
      padding: 16,
    },
    button: {
      marginVertical: 100,
      backgroundColor: "#a565f2",
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      marginLeft: 8,
    },
    voiceNameInput: {
      backgroundColor: "#151515",
      borderRadius: 8,
      padding: 10,
      marginBottom: 10,
      color: "#fff",
    },
  });

