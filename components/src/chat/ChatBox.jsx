import React, { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MESSAGE_RESPONSE, AUTHOR_INFO_BY_PLANID } from "./chatQuerys";
import { useLazyQuery, useQuery } from "@apollo/client";
import { FetchVoice } from "../../../helpers";
import { Audio } from "expo-av";

export const ChatScreen = ({navigation, route}) => {

  const {planId} = route.params

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([])

  const [isQuerying, setIsQuerying] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const [selectedAmount, setSelectedAmount] = useState(0);

  const {data: authorInfo} = useQuery(AUTHOR_INFO_BY_PLANID, {
    variables: {
      planId: planId
    }
  })

  

  const [request, {data, loading}] = useLazyQuery(MESSAGE_RESPONSE, {
    onError: err => {
      console.log(err)
    }
  })

  const openModal = () => {
    setIsModalVisible(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleBuyTokens = () => {
    if (selectedAmount > 0) {
      // Realiza la consulta GraphQL con selectedAmount y authorInfo.id
      // Utiliza la misma lógica que mostré en la respuesta anterior para realizar la consulta
    }
    // Cierra el modal después de realizar la compra
    closeModal();
  };

  const addAudioMessage = (audioURI, message) => {
    const newMessage = {
      text: message,
      sender: false,
      mediaFile: audioURI,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    console.log(messages, "Este es el estado despues de el segundo set")
  };
  

  const playAudio = async (audioURI) => {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync({ uri: audioURI });
      await soundObject.playAsync();
    } catch (error) {
      console.error("Error al reproducir el audio:", error);
    }
  };
  

  const getVoices = async (message) => {
    try {

      console.log(
        authorInfo.userInfoByPlanId.clarity,
        authorInfo.userInfoByPlanId.stability
      )

      const voiceResponse = await FetchVoice(
        authorInfo.userInfoByPlanId.voiceId,
        message,
        authorInfo.userInfoByPlanId.stability,
        authorInfo.userInfoByPlanId.clarity
      );
      console.log(messages, "Este es el estado despues de devolver fetchVoices")
      // Extraer el archivo de audio de la respuesta
      const blob = await voiceResponse.blob();
  
      if (blob) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const audioDataURL = reader.result;
          addAudioMessage(audioDataURL, message);
        };
        reader.readAsDataURL(blob);
        setIsQuerying(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  
  

  const sendMessage = () => {
    if (message.trim() !== "") {
      const newMessage = {
        text: message,
        sender: true,
        mediaFile: "",
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("")
      if (!isQuerying) {
        
        setIsQuerying(true);
        request({
          variables: {
            planId: planId,
            prompt: message
          }
        });
      }
    }
  };

  const handleQueryResponse = (data) => {
  if (isQuerying && data) {
    console.log(data, "<<<----DataResponse")
    const response = data?.generateMessageResponse.value;
    if (response) {
      getVoices(response)
    }
    setIsQuerying(false); // Establecer isQuerying en false después de agregar el mensaje de audio
  }
};

  

  useEffect(() => {
    if (data) {
      console.log(messages, "Este es el estado despues data in useeffect")
      handleQueryResponse(data);
    }
  }, [data]);




  return (
    <>
    <View style={styles.container}>
      { authorInfo &&
        <TouchableOpacity
        onPress={() => {
            navigation.navigate("NotProfileScreen", {userId: authorInfo.userInfoByPlanId.id})
          }
        }
          style={styles.profileBox}
        >
          <View style={{
            flexDirection: "row",
            alignItems: "center"
          }}>
            <Image 
            source={{
              uri: authorInfo.userInfoByPlanId.profilePhoto
            }}
            style={{
              borderRadius: 50,
              height: 40,
              width: 40
            }}
            />
            <Text style={{marginLeft: 10, fontSize: 20, fontWeight: "bold", color: 'white',}}>{authorInfo.userInfoByPlanId.username}</Text>
          </View>

        </TouchableOpacity>
      }
      <ScrollView>
      <TouchableOpacity onPress={openModal} style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Comprar Tokens</Text>
        </TouchableOpacity>
      {messages.map((msg, index) => (
        <View key={index}>
        { msg.sender === true && msg.text !== false &&
          <View style={{
              backgroundColor: "#a565f2",
              padding: 10,
              borderRadius: 13,
              alignSelf: "flex-end",
              marginVertical: 20
          }}>
            <Text style={{fontSize: 16, fontWeight: "400"}}>{msg.text}</Text>
          </View>
          }
          {msg.sender === false  && (
            <View
              style={{
                backgroundColor: "#212121",
                padding: 10,
                borderRadius: 13,
                alignSelf: "flex-start",
                marginVertical: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "70%",
                shadowColor: "#a565f2",
                elevation: 15
              }}
            >
          { authorInfo &&
              <Image 
            source={{
              uri: authorInfo.userInfoByPlanId.profilePhoto
            }}
            style={{
              borderRadius: 50,
              height: 60,
              width: 60
            }}/>
            }
              {msg.mediaFile && (
                <TouchableOpacity
                  onPress={() => playAudio(msg.mediaFile)}
                  style={{
                    marginRight: 10
                  }}
                >
                <Ionicons name="play" color="white" size={30}/>
                </TouchableOpacity>
              )}
            </View>
    )}
        </View>
      ))}
      { loading &&
          <View
            style={{
              backgroundColor: "#191919",
              padding: 10,
              borderRadius: 13,
              alignSelf: "flex-start",
              marginVertical: 20
            }}
          >
              <Text style={{fontSize: 16, fontWeight: "600"}}>Grabando audio...</Text>
          </View>

          }
    </ScrollView>
    </View>
    <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
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
  {isModalVisible && (
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Selecciona la cantidad de Tokens</Text>
          <TextInput
            style={styles.input}
            placeholder="Cantidad"
            keyboardType="numeric"
            value={selectedAmount.toString()}
            onChangeText={(text) => setSelectedAmount(parseInt(text, 10))}
          />
          <TouchableOpacity onPress={handleBuyTokens} style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Comprar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      )}
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
      backgroundColor: "#101010",
      height: 130
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderRadius: 30,
      paddingVertical: 8,
      paddingHorizontal: 16,
      marginRight: 8,
      bottom: 20,
      height: 50,
      backgroundColor: "#252525"
    },
    sendButton: {
      backgroundColor: "#a565f2",
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 16,
      bottom: 20
    },
    sendButtonText: {
      color: "#fff",
      fontSize: 16,
    },
    profileBox: {
      backgroundColor: "#191919",
      paddingVertical: 7,
      alignItems: "center",
      borderRadius: 17,
      shadowColor: "#a565f2",
      elevation: 10
    },
    modalContainer: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      elevation: 5, // Sombra en Android
      shadowColor: '#000', // Sombra en iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 10,
      width: 200,
      height: 40,
    },
    buyButton: {
      backgroundColor: '#a565f2',
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    buyButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    closeButton: {
      marginTop: 10,
    },
    closeButtonText: {
      color: '#a565f2',
      fontSize: 16,
    },
  });
