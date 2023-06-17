import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker'
import { ScrollView } from "react-native";

export const CreatePlanForm = () => {
  const [planName, setPlanName] = useState("");
  const [description, setDescription] = useState("");
  const [context, setContext] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 0.7,
    });

    console.log(result.assets[0]);

    if (!result.canceled) {
          let newfile = {
              uri: result.assets[0].uri, 
              type: `test/${result.assets[0].uri.split(".")[1]}`,
              name:`test.${result.assets[0].uri.split(".")[1]}`
          }
          handleUpload(newfile)

    }}

    const handleUpload = (image) => {
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset","slinepreset" )
    data.append("cloud_name", "dasfna79h")

    fetch("https://api.cloudinary.com/v1_1/dasfna79h/image/upload", {
        method:"post",
        body: data
    }).then(res =>res.json()).
    then( data => {
        console.log(data)
        setImage(data.secure_url)
    })
    
}

  const handleSubmit = () => {
    // Aquí puedes realizar alguna acción con los datos del formulario
    console.log({
      planName,
      description,
      context,
      price,
      duration,
      type,
      image,
    });
  };

  return (
    <View style={styles.container}>
              <ScrollView>
          <>
      <View style={{width: '100%', alignItems: 'center'}}>

             <TouchableOpacity
                         style={{backgroundColor: '#191919', borderRadius: 10, marginVertical: 50}}
                         onPress={pickImage}
                         >

                         {!image &&
                            <View style= { { borderRadius: 110}}>
                                <Ionicons name="image" size={200}/>
                            </View>
                         }
                         { image &&
                            <View style= { { borderRadius: 100}}>
                                <Image  
                                style={{
                                    alignSelf: 'center', 
                                    height: 200, 
                                    width: 200, 
                                    borderRadius: 12
                                }} 
                                source={{uri: image}}></Image>
                            </View>

                         }
             </TouchableOpacity>
                
                    </View>
          <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre del plan"
          value={planName}
          onChangeText={setPlanName}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Descripción"
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Contexto"
          value={context}
          onChangeText={setContext}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Precio"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Duración"
          value={duration}
          onChangeText={setDuration}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tipo"
          value={type}
          onChangeText={setType}
        />
      </View>
      </>
      </ScrollView>
      <TouchableOpacity 
      style={styles.button}
      onPress={handleSubmit} >
        <Text>Crear Plan</Text>
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
    inputContainer: {
      marginBottom: 16,
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: "#151515"
    },
    button: {
        alignItems: "center",
        alignSelf: "center",
        paddingVertical: 10,
        marginVertical: 10,
        width: "80%",
        borderRadius: 10,
        backgroundColor: "#a565f2"
    }
  });
