import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useMutation, gql } from '@apollo/client';
import * as ImagePicker from 'expo-image-picker';

const ADD_CONTENT_TO_PLAN = gql`
  mutation AddContentToPlan($planId: ID!, $contentUrl: String!) {
    addContentToPlan(planId: $planId, contentUrl: $contentUrl) {
      id
      planContent
    }
  }
`;

const PlanContentForm = () => {
  const [contentUrl, setContentUrl] = useState('');
  const [addContentToPlan, { data, loading, error }] = useMutation(ADD_CONTENT_TO_PLAN);

  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 0.7,
    });

    console.log(result);

    if (!result.cancelled) {
      let newfile = {
        uri: result.uri, 
        type: `test/${result.uri.split(".")[1]}`,
        name: `test.${result.uri.split(".")[1]}`
      }
      handleUpload(newfile);
    }
  };

  const handleUpload = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset","slinepreset");
    data.append("cloud_name", "dasfna79h");

    fetch("https://api.cloudinary.com/v1_1/dasfna79h/image/upload", {
      method: "post",
      body: data
    }).then(res => res.json())
    .then(data => {
      console.log(data);
      setContentUrl(data.secure_url);
    })
  };

  useEffect(() => {
    if(data){
      console.log(data);
      // navigation.navigate('MainScreen');
    }
  }, [data]);

  const handleAddContent = async () => {
    try {
      const planId = '1234567890';
      await addContentToPlan({ variables: { planId, contentUrl } });
    } catch (error) {
      console.error('Error al añadir contenido al plan: ', error);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={pickVideo}>
        <Text>Select Video</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleAddContent}>
        <Text>Upload Content</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlanContentForm;

