export const FetchVoice = async (voiceID, message, stability, similarityBoost) => {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceID}`;

  const headers = {
    'accept': 'audio/mpeg',
    'xi-api-key': 'a34290616ea926679a68a9e21b91dcc7',
    'Content-Type': 'application/json',
  };

  console.log(
    stability / 100,
    similarityBoost / 100,
    "datos en teoria flotantes"
  )

  const body = {
    text: message,
    model_id: 'eleven_multilingual_v1',
    voice_settings: {
      stability: 0.84,
      similarity_boost: 0.51,
    },
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });

    console.log(response)
    if (response.status === 200) {
       return response
    } else if (response.status === 422) {
      const error = await response.json();
      throw new Error(`Error de validación: ${JSON.stringify(error)}`);
    } else {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
};

export const  AddNewVoice = async(voiceName, filesArray, description) => {
    const url = 'https://api.elevenlabs.io/v1/voices/add'; // Reemplaza con la URL de la API

    const headers = {
      'accept': 'application/json',
      'xi-api-key': 'a34290616ea926679a68a9e21b91dcc7'
    };

    const body = {
      name: voiceName,
      files: filesArray,
      description: description
    };

    fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 422) {
          return response.json().then(error => {
            throw new Error(`Error de validación: ${JSON.stringify(error)}`);
          });
        } else {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
}

export const GetVoices = async () => {
  const url = 'https://api.elevenlabs.io/v1/voices';

  const headers = {
    'accept': 'application/json',
    'xi-api-key': 'a34290616ea926679a68a9e21b91dcc7'
  };


  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else if (response.status === 422) {
      const error = await response.json();
      throw new Error(`Error de validación: ${JSON.stringify(error)}`);
    } else {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
};

export const GetModels = async () => {
  const url = 'https://api.elevenlabs.io/v1/models';

  const headers = {
    'accept': 'application/json',
    'xi-api-key': 'a34290616ea926679a68a9e21b91dcc7'
  };

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else if (response.status === 422) {
      const error = await response.json();
      throw new Error(`Error de validación: ${JSON.stringify(error)}`);
    } else {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
};


