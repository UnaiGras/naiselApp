export async function AddNewVoice(
    voiceName, 
    filesArray, 
    description
    ) {
    const url = 'https://api.elevenlabs.io/v1/voices/add'; // Reemplaza con la URL de la API

    const headers = {
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
