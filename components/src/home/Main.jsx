import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import Login1 from "../login/Login1";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useLazyQuery, useMutation} from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import {AuthContext} from "../../../App"
import { ME_QUERY } from "../personalQuerys";
import AppBar from "./AppBar";
import { ChatsList } from "./chatsLists";
import { UPDATE_DEVICE_TOKEN } from "./homeQuerys";
import * as Notifications from 'expo-notifications';


const saveTokenToLocalStorage = async (token) => {
    try {
      await AsyncStorage.setItem("User-Token", token);
    } catch (error) {
      // handle error
    }
  };

const gettoken = async () => {
    await AsyncStorage.getItem("User-Token")
  }

  

const MainScreen = ({ navigation, test}) => {
    const [tokwen, setTokwen] = useState('') 
    const [token, setUserToken]= useContext(AuthContext)


    const [showTerms, setShowTerms] = useState(false);

    useEffect(() => {
      async function checkIfTermsAccepted() {
        try {
          const value = await AsyncStorage.getItem('termsAccepted');
          if (value === null) {
            // Los términos aún no han sido aceptados, mostramos el componente de términos y condiciones
            setShowTerms(true);
          }
        } catch (error) {
          console.log('Error al obtener el valor de AsyncStorage:', error);
        }
      }
      checkIfTermsAccepted();
    }, []);
    
    const aceptTermsAndConditions = async () => {
      try {
        // Guardamos en AsyncStorage que los términos han sido aceptados
        await AsyncStorage.setItem('termsAccepted', 'true');
        setShowTerms(false);
      } catch (error) {
        console.log('Error al guardar el valor de AsyncStorage:', error);
      }
    };
    
    
    const [addDeviceToken, {data: mamahuevo, loading: cargando, error: failure}] = useMutation(UPDATE_DEVICE_TOKEN, {
        onError: error => {
            console.log(error)
        }
    })

    const [me, {loading, error, data, refetch}] = useLazyQuery(ME_QUERY, {
        onError: error => {
            console.log(error)
        },
        onCompleted: info => {
          console.log(info)
        }
    })

    useEffect(() => {
        refetch()
    }, [])
    //console.log(setUserToken)
    console.log(test)
    useEffect(() => {
        setTokwen(tokwen)
        saveTokenToLocalStorage(tokwen)
        gettoken()
        me({
            context: {
                headers: {
                    'Authorization': `bearer ${tokwen}`
                }
            }
        })
        console.log(tokwen)
        setUserToken(tokwen)
        getDeviceToken()
        .then(deviceToken => addDeviceToken({
            variables: {deviceToken}
        }))
    }, [tokwen]
    )

    return(
  
    <View style={{
        flex: 1,
        backgroundColor:'#101010'
    }}>
        {tokwen && data ? (
          <>
          <View style={{height: "100%"}}>
          <TermsModal
            isVisible={showTerms}
            onClose={() => setShowTerms(false)}
            onAccept={aceptTermsAndConditions}
          />
              <ChatsList navigation={navigation}/>
          </View>
                <View>
                      <AppBar data={data} navigation={navigation} position={"home"}/>     
                  </View>
                  </>
        ) : (
            <Login1 navigation={navigation} setToken={setTokwen}/>
        )
        }
    </View>
    )
}

const TermsModal = ({ isVisible, onClose, onAccept }) => {
  if (!isVisible) return null;

  return (
    <View style={styles.termsLayer}>
      <View style={styles.termsContainer}>
        <View style={styles.termsHeader}>
          <Text style={styles.headerText}>Términos y Condiciones</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.termsContent}>
          <Text style={styles.termsText}>
            // Aquí va todo el contenido de tus términos y condiciones.
          </Text>
        </View>
        <View style={styles.agreeContainer}>
          <TouchableOpacity onPress={onAccept} style={styles.acceptButton}>
            <Text style={styles.acceptButtonText}>Aceptar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};


async function getDeviceToken() {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);

    return token;
}



const styles = StyleSheet.create({
    icon: {
        height: 20,
        width: 20
    },
    termsLayer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#151515',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999,
    },
    termsContainer: {
      backgroundColor: '#191919',
      borderRadius: 20,
      padding: 20,
      width: '90%',
      height: "90%"
    },
    termsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    closeButton: {
      backgroundColor: '#00c1b9',
      borderRadius: 10,
      padding: 10,
    },
    closeButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    termsContent: {
      maxHeight: '80%',
    },
    termsText: {
      color: '#fff',
      fontSize: 16,
    },
    agreeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
    agreeText: {
      color: '#fff',
      fontSize: 14,
      marginLeft: 10,
    },
    acceptButton: {
      backgroundColor: '#00c1b9',
      borderRadius: 10,
      padding: 10,
      alignItems: 'center',
    },
    acceptButtonText: {
      color: '#fff',
      fontSize: 16,
    },
})

export default MainScreen
