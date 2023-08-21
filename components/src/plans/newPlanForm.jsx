import React, { useState } from "react";
import { 
  View, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Text, 
  Image, 
  Switch, 
  PanResponder,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker'
import { CREATE_PLAN } from "./planQuerys";
import { useMutation } from "@apollo/client";
import SliderComponent from "./percentajeBar";

export const CreatePlanForm = () => {
  const [planName, setPlanName] = useState("");
  const [description, setDescription] = useState("");
  const [context, setContext] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [tokensLenght, setTokensLenght] = useState(0)
  const [genere, setGenere] = useState("")
  const [pesonality, setPersonality] = useState(false)
  const [iaName, setIaName] = useState("")
  const [years, setYears] = useState(0)

  //Estados de la linea de orcentaje de voluntarytax

  const [ballPosition, setBallPosition] = useState({ x: 0, y: 0 });
  const [value, setValue] = useState(0);

  const [create, {data}] = useMutation(CREATE_PLAN, {
    onError: err => {
      console.log(err)
    }
  }) 

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

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        const { moveX } = gesture;
        const containerWidth = StyleSheet.flatten(styles.container).width;
        const newPosition = (moveX / containerWidth) * 100;
        const clampedPosition = Math.min(Math.max(newPosition, 0), 100);
        setBallPosition({ x: clampedPosition, y: 0 }); // Actualizar ambas coordenadas
        setValue(Number(clampedPosition.toFixed(0)));
      },
    });

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
    let picante = ""

    if (pesonality) {
      picante = "que quiere ligar conmigo"
    } else {
      picante= "amable"
    }

    create({
      variables: {
        planName: planName, 
        description: description, 
        context: `Eres un asistente${picante} de ${years} años de edad, eres ${genere} y te llamas ${iaName}`, 
        price: parseFloat(price), 
        duration: duration, 
        type: type, 
        photo: image,
        planTokensLenght: tokensLenght,
        voluntaryTax: 20
      }
    })

  };

  return (
    <View style={styles.container}>
         <ScrollView>
      <View style={{width: '100%', alignItems: 'center'}}>

             <TouchableOpacity
                         style={{backgroundColor: '#191919', borderRadius: 10, marginVertical: 50}}
                         onPress={pickImage}
                         >

                         {!image &&
                            <View style= { { borderRadius: 110}}>
                                <Ionicons name="image" size={200} color={"gray"}/>
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
      <Text style={styles.title}>Datos Del Plan</Text>
          <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre del plan"
          placeholderTextColor="gray"
          value={planName}
          onChangeText={(text) => setPlanName(text)}

        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Descripción"
          placeholderTextColor="gray"
          value={description}
          onChangeText={(text) => setDescription(text)}
          multiline
        />
      </View>
      <Text style={styles.title}>Personalidad</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="gray"
          value={iaName}
          onChangeText={(text) => setIaName(text)}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Años"
          placeholderTextColor="gray"
          value={years}
          onChangeText={(text) => setYears(text)}
        />
      </View>

      <View style={styles.chooseContainer}>
          <TouchableOpacity
            onPress={() => setGenere("un hombre")}
          >
              <Image 
                source={require("../../../assets/hombre-de-negocios.png")}
                style={genere === "un hombre" ? styles.photoGenreChoosed : styles.photoGenre}
                />
                <Text style={{alignSelf: "center", color: 'white',}}>Hombre</Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => setGenere("una mujer")}
          >
              <Image 
                source={require("../../../assets/mujer-de-negocios.png")}
                style={genere === "una mujer" ? styles.photoGenreChoosed : styles.photoGenre}
                />
                <Text style={{alignSelf: "center", color: 'white',}}>Mujer</Text>
          </TouchableOpacity>

      </View>
          <Text style={{fontSize: 18, fontWeight: "700", marginTop: 20, marginLeft: 20, color: 'white',}}>Actitud</Text>
        <View style={{
          flexDirection: "row", 
          backgroundColor: "#191919", 
          borderRadius: 10, 
          padding: 5, 
          alignItems: "center",
          justifyContent: "space-between",
          marginVertical: 15
          }}>
          <Text style={{
            fontSize: 16,
            fontWeight: "700",
            marginLeft: 20,
            color: 'white',
          }}>Picante</Text>
          <Switch value={pesonality} onChange={() => setPersonality(!pesonality)}/>
          </View>
          <Text style={{alignSelf: "center", color: 'white'}}>¡ATENCION! Si marcas la opcion de picante tu IA respondera con intencion de copular con la otra parte</Text>
    <View style={{marginVertical: 20}}>
      <Text style={styles.title}>Precio</Text>
        
      <View style={styles.inputContainerRow}>
        <TextInput
          style={styles.input}
          placeholder="Precio"
          placeholderTextColor="gray"
          value={price}
          onChangeText={(text) => setPrice(text)}
          keyboardType="numeric"
        />
        <Text style={styles.text}>€</Text>
      </View>

          
        <View style={{marginVertical: 10, marginTop: 30}}>
            <View style={styles.container} {...panResponder.panHandlers}>
            <View style={styles.line} />
            <View style={[styles.ball, { left: ballPosition.x }]} />
            <View style={styles.valueContainer}>
              <Text style={styles.value}>{value}</Text>
            </View>
      </View>


        </View>
          <View style={styles.miniBox}>
          <TouchableOpacity
            style={[tokensLenght === 250 ? styles.buttonBoxPressed: styles.buttonBox]}
            onPress={() => setTokensLenght(250)}
          >
            <Text style={styles.buttonText}>Cortas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[tokensLenght === 500 ? styles.buttonBoxPressed: styles.buttonBox]}
            onPress={() => setTokensLenght(500)}
          >
            <Text style={styles.buttonText}>Medias</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[tokensLenght === 750 ? styles.buttonBoxPressed: styles.buttonBox]}
            onPress={() => setTokensLenght(750)}
          >
            <Text style={styles.buttonText}>Grande</Text>
          </TouchableOpacity>
        </View>
        </View>
        <TouchableOpacity 
      style={styles.button}
      onPress={handleSubmit} >
        <Text>Crear Plan</Text>
      </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101010",
    padding: 16,
  },
  value: {
    color: 'white',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputContainerRow: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center"
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#151515",
    color: "white"
  },
  button: {
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 10,
    marginVertical: 10,
    width: "80%",
    borderRadius: 10,
    backgroundColor: "#a565f2"
  },
  miniBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 20
  },
  buttonBox: {
    backgroundColor: '#212121',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10
  },
  buttonBoxPressed: {
    backgroundColor: '#a565f2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 10,
    color: 'white',
  },
  text: {
    fontSize: 20, 
    fontWeight: "700", 
    marginLeft: 15,
    color: 'white',
  },
  chooseContainer: {
    flexDirection: "row",
    justifyContent: "center"
  },
  photoGenre: {
    width: 120,
    height: 120,
    margin: 20
  },
  photoGenreChoosed: {
    width: 120,
    height: 120,
    margin: 20,
    backgroundColor: "#191919",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#a565f2"
  }
});

//<View style={styles.inputContainerRow}>
//          <SliderComponent/>     
//      </View> 
