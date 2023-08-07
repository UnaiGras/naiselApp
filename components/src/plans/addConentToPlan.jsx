import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput} from 'react-native';
import { useMutation, gql } from '@apollo/client';

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

  const handleAddContent = async () => {
    try {
      // Supongamos que este es el ID del plan al que deseas agregar contenido
      const planId = '1234567890';
      await addContentToPlan({ variables: { planId, contentUrl } });
    } catch (error) {
      console.error('Error al añadir contenido al plan: ', error);
    }
  };

  return (
    <View>
      <InputText
        placeholder='Introduce la URL del contenido'
        onChangeText={setContentUrl}
        value={contentUrl}
      />
      <TouchableOpacity onPress={handleAddContent}/>
    </View>
  );
};

export default PlanContentForm;
