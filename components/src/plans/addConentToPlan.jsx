import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, TextInput, Image, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/client';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { ADD_VIDEO_TO_PLAN, ADD_IMAGE_TO_PLAN } from './planQuerys'; // Asegúrate de importar las queries desde su ubicación

const PlanContentForm = ({route, navigation}) => {
  const { planId } = route.params;
  const [contentUrl, setContentUrl] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [contentType, setContentType] = useState('');

  const [addVideoToPlan, { data: videoData }] = useMutation(ADD_VIDEO_TO_PLAN);
  const [addImageToPlan, { data: imageData }] = useMutation(ADD_IMAGE_TO_PLAN);

  const pickMedia = async (type) => {
    const options = {
      mediaTypes: type === 'video' ? ImagePicker.MediaTypeOptions.Videos : ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 0.7
    };
    
    const result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result.cancelled) {
      let newfile = {
        uri: result.uri, 
        type: `test/${result.uri.split(".")[1]}`,
        name: `test.${result.uri.split(".")[1]}`
      }
      handleUpload(newfile, type);
    }
  };

  const handleUpload = (image, type) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset","slinepreset");
    data.append("cloud_name", "dasfna79h");

    fetch("https://api.cloudinary.com/v1_1/dasfna79h/image/upload", {
      method: "post",
      body: data
    })
    .then(res => res.json())
    .then(data => {
      setContentUrl(data.secure_url);
      setContentType(type);
    })
  };

  const handleAddContent = async () => {
    const mutationVariables = {
      planId,
      title: name,
      description,
      content: contentUrl,
      tag
    };

    try {
      if (contentType === 'video') {
        await addVideoToPlan({ variables: mutationVariables });
      } else if (contentType === 'photo') {
        await addImageToPlan({ variables: mutationVariables });
      }
    } catch (error) {
      console.error('Error al añadir contenido al plan: ', error);
    }
  };

  return (
    <View style={styles.container}>
      {contentUrl ? (
        <Image source={{ uri: contentUrl }} style={styles.previewImage} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Ionicons name="image-outline" size={48} color="#a565f2" />
          <Text style={styles.placeholderText}>Tu imagen/vídeo aparecerá aquí</Text>
        </View>
      )}

      <View style={styles.formContainer}>
        <TextInput 
          value={name} 
          onChangeText={setName}
          placeholderTextColor={"gray"} 
         placeholder="Nombre" 
          style={styles.input} />
        <TextInput 
          value={description} 
          onChangeText={setDescription}
          placeholder="Descripción" 
          placeholderTextColor={"gray"}
          multiline
          numberOfLines={4}
          style={styles.textArea} />
        <TextInput 
          value={tag} 
          onChangeText={setTag}
          placeholderTextColor={"gray"}
          placeholder="Tag" 
          style={styles.input} />
        <TouchableOpacity onPress={handleAddContent} style={styles.uploadButton}>
          <Text style={styles.uploadText}>Subir Contenido</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => pickMedia('photo')} style={styles.button}>
          <Text style={styles.buttonText}>Fotos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pickMedia('video')} style={styles.button}>
          <Text style={styles.buttonText}>Videos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#101010"
  },
  previewImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 15
  },
  formContainer: {
    flex: 1,
    marginBottom: 60
  },
  input: {
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#191919"
  },
  textArea: {

    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    textAlignVertical: 'top',
    backgroundColor: "#191919",
    height: 100
  },
  uploadButton: {
    backgroundColor: '#a565f2',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center'
  },
  uploadText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderTopWidth: 1,
    backgroundColor: '#101010'
  },
  button: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#a565f2',
    flex: 0.48
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#a565f2',
    borderWidth: 2,
    borderStyle: 'dashed'
  },
  placeholderText: {
    marginTop: 10,
    color: '#a565f2',
    fontSize: 16
  }
}
  )

export default PlanContentForm;

