import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const ChatScreen = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (message.trim() !== "") {
      setMessages((prevMessages) => [...prevMessages, message]);
      setMessage("");
    }
  };

  return (
    <>
    <View style={styles.container}>
      
      {messages.map((msg, index) => (
        <View key={index}>
          {/* Renderizar el mensaje */}
        </View>
      ))}

    </View>
    <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      placeholder="Escribe un mensaje..."
      value={message}
      onChangeText={setMessage}
    />
    <TouchableOpacity
      style={styles.sendButton}
      onPress={sendMessage}
      disabled={message.trim() === ""}
    >
      <Ionicons name="send" size={24} color="#fff" />
    </TouchableOpacity>
  </View>
  </>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#101010",
      padding: 16,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      bottom: 0,
      padding: 10,
      backgroundColor: "#101010"
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 16,
      marginRight: 8,
    },
    sendButton: {
      backgroundColor: "#a565f2",
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    sendButtonText: {
      color: "#fff",
      fontSize: 16,
    },
  });
