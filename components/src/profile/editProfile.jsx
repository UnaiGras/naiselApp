import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { EDIT_PROFILE } from './gestionQuerys';
import * as ImagePicker from 'expo-image-picker';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { Ionicons } from '@expo/vector-icons';

const EditProfile = ({ navigation, route }) => {  

    const [editProfile, result] = useMutation(EDIT_PROFILE, {
        onError: error => {
        console.log(error)
    }})

    const data = route.params.data

    const photo = route.params.data.profilePhoto


    const [choose, setChoose] = useState('')
    const [image, setImage] = useState('')
    const [username, setUsername] = useState(data.username)
    const [email, setEmail] = useState(data.email)
    const [description, setDescription] = useState(data.description)



    const handleSubmit = () => {
      editProfile({variables: {
        newProfilePhoto: image ? image : photo,
        newUser: username ? username : data.username,
        newEmail: email ? email :  data.email,
        newDescription: description ? description : data.description
      }})
    }

    useEffect(() => {
        if(result.data) {
          navigation.navigate('Home')
          Toast.show({
            type: 'success',
            text1: 'Perfil Editado Con Exito',
            text2: 'vuelve a tu perfil para ver los cambios'
          })
        }
    },[result])


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

      }
      setChoose('')
    }

    const handleUpload = (image) => {
       const data = new FormData()
       data.append("file", image)
       data.append("upload_preset","slinepreset" )
       data.append("cloud_name", "dasfna79h")
   
      fetch("https://api.cloudinary.com/v1_1/dasfna79h/image/upload", {
           method:"post",
           body: data
      }).then(res =>res.json()).
      then(data=>{
        console.log(data)
        setImage(data.secure_url)
      })
    }
    

    return (
      <>
        <ScrollView style={{backgroundColor: 'black', }}>
          <View style={{height: "100%"}}>
            <View style={{width: '100%', alignItems: 'center', marginTop: 40}}>
                <TouchableOpacity
                onPress={() => {
                  setChoose('holabb')
                }}
                >

                  {!image &&
                  <View>
                    <Image style={styles.avatar} source={{uri: photo}}/>
                  </View>
                    }
                  {image &&
                  <View>
                    <Image style={styles.avatar} source={{uri: image}}/>
                  
                  </View>
                    }
                    
                  
                </TouchableOpacity>
                
            </View>
            <View style={{marginHorizontal: 20, marginVertical: 100}}>
                <View style={{flexDirection: 'row', marginVertical: 20}}>
                    <Ionicons name='person' size={40}/>
                    <TextInput 
                    style={styles.input}
                    value={username}
                    placeholder="Editar el nombre de Usuario"
                    onChangeText={text => setUsername(text)}
                    />
                </View>
                <View style={{flexDirection: 'row', marginVertical: 20}}>
                    <Ionicons name='mail' size={40}/>
                    <TextInput 
                    style={styles.input}
                    value={email}
                    placeholder="Editar el email"
                    onChangeText={text => setEmail(text)}
                    
                    />
                </View>
                <View style={{flexDirection: 'row', marginVertical: 20}}>
                    <Ionicons name='folder' size={40}/>
                    <TextInput 
                        style={styles.input}
                        multiline
                        value={description}
                        placeholder="Editar la description"
                        onChangeText={text => setDescription(text)}
                    />
                </View>
            </View>
            <TouchableOpacity 
              style={styles.buttonContainer}
              onPress={handleSubmit}
            >
                <Text>
                    Aceptar
                </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {choose && 
        <View style={{ position:'absolute', height: 300, backgroundColor: '#191919', width: '100%', bottom: 0, borderTopStartRadius: 30, borderTopEndRadius: 30}}>
            <View style={{height: 80, width: '70%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderBottomColor: '#00c1b9', borderBottomWidth: 3}}>
              <Text style={{fontSize: 17, fontWeight: '800', fontStyle: 'italic'}}>
                  Selecciona Un Metodo
              </Text>
            </View>
            <View style={{alignSelf: 'center', alignItems: 'center', justifyContent: 'center', height: '70%'}}>
              <TouchableOpacity 
                style={styles.buttonContainer}
                onPress={pickImage}
              >
                <Text style={{fontSize: 17, fontWeight: '800', fontStyle: 'italic'}}>
                    Cargar Foto
                </Text>
              </TouchableOpacity>

            </View>

        </View>
        
        }
         </>
    );
  
}

//poner un scrollview lateral para ver los ultimos eventos a los que a asistido la persona

export default EditProfile

const styles = StyleSheet.create({
  description: {
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20 
  },
  input: {
    width: '85%',
    marginLeft: 10,
    paddingHorizontal: 5,
    backgroundColor: "#151515",
    borderRadius: 10

  },
  text: {
    fontWeight: 'bold'
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'black',
    opacity: 0.7
  },
  buttonContainer: {

    width: "90%",
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom:20,
    backgroundColor: "#a565f2",
    paddingVertical: 10,
    borderRadius: 10
  },
  ImageList: {
    marginTop: 80,
    paddingHorizontal: 15,
    flexDirection: "row",
    borderRadius: 30,


  },
  top: {
    flexDirection: 'row',
    marginTop: 30
  },
  profileView: {
    marginTop: 20,
    height: 60,
    minWidth: '50%',
    borderRadius: 20,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginHorizontal: 50,
    shadowColor: "#00c1b9",
    shadowOffset: {
        width: 15,
        height: 15,
    },
    shadowOpacity: 1,
    shadowRadius: 18.00,

    elevation: 20,
},
images: {
  width: 40,
  height: 40,
  marginRight: 20,
  borderRadius: 50,

},
button: {
  position: 'absolute',
  backgroundColor: '#191919',
  justifyContent: 'center',
  bottom: 30,
  opacity: 1,
  alignSelf: "center",
  borderRadius: 30,
  alignItems: 'center',

}
});

                                            