import React, { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MESSAGE_RESPONSE, AUTHOR_INFO_BY_PLANID } from "./chatQuerys";
import { useLazyQuery, useQuery } from "@apollo/client";
import { FetchVoice, GetVoices, GetModels } from "../../../helpers";
import { Audio } from "expo-av";

export const ChatScreen = ({navigation, route}) => {

  const {planId} = route.params

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([])

  const [isQuerying, setIsQuerying] = useState(false);

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

  const addAudioMessage = (audioURI) => {
    const newMessage = {
      text: "",
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
          addAudioMessage(audioDataURL);
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
      console.log(messages, "Este es el estado despues de el primer set")
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
            <Text style={{marginLeft: 10, fontSize: 20, fontWeight: "bold"}}>{authorInfo.userInfoByPlanId.username}</Text>
          </View>

        </TouchableOpacity>
      }
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
    profileBox: {
      backgroundColor: "#191919",
      paddingVertical: 7,
      alignItems: "center",
      borderRadius: 17,
      shadowColor: "#a565f2",
      elevation: 10
    }
  });
