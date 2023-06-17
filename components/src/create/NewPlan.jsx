//import React from "react";
//import { View, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, Image, Modal} from "react-native";
//import { ADD_EVENT } from "./createEventQuerie";
//import { useMutation } from "@apollo/client";
//import { useState, useEffect } from "react";
//import * as ImagePicker from 'expo-image-picker';
//import { getUserLocation } from "expo/AppEntry";
//import MapView from "react-native-maps";
//import { Marker } from "react-native-maps";
//import { Ionicons } from "@expo/vector-icons";
//import { Toast } from "react-native-toast-message/lib/src/Toast";
//
//
export default function NewPlan({navigation}) {
//    
//    const [name, setName] = useState('')
//    
//    const [desc, setDesc] = useState('')
//    const [image ,setImage] = useState('')
//    const [freeEvent, setFreeEvent] = useState(false)
//    const [num, setNum] = useState(0)
//    const [showMap, setShowMap] = useState(false)
//    const [location, setLocation] = useState(null)
//    const [day, setDay] = useState("")
//    const [startTime, setStartTime] = useState("")
//    const [minute, setMinute] = useState("")
//    const [duration, setDuration] = useState("")
//    const [month, setMonth] = useState("Elegir el mes")
//    const [showMonths, setShowMonths] = useState(false)
//    const [makerFee, setMakerFee] = useState(0)
//
//
//    const [addEvent, result ] =useMutation(ADD_EVENT, {
//        onError: err => {
//            console.log(err)
//        }
//    })
//
//    const pickImage = async () => {
//        const result = await ImagePicker.launchImageLibraryAsync({
//          mediaTypes: ImagePicker.MediaTypeOptions.Images,
//          allowsEditing: true,
//          aspect: [6, 4],
//          quality: 0.7,
//        });
//    
//        console.log(result.assets[0]);
//    
//        if (!result.canceled) {
//              let newfile = {
//                  uri: result.assets[0].uri,
//                  type: `test/${result.assets[0].uri.split(".")[1]}`,
//                  name:`test.${result.assets[0].uri.split(".")[1]}`
//              }
//              handleUpload(newfile)
//
//     }}
//
//    const handleUpload = (image) => {
//         const data = new FormData()
//         data.append("file", image)
//         data.append("upload_preset","slinepreset")
//         data.append("cloud_name", "dasfna79h")
//     
//        fetch("https://api.cloudinary.com/v1_1/dasfna79h/image/upload", {
//             method:"post",
//             body: data
//        }).then(res =>res.json()).
//        then(data=>{
//          console.log(data)
//          setImage(data.secure_url)
//        })
//    }
//
//
//    useEffect(() => {
//        if(result.data){
//            navigation.goBack()
//        }
//    }, [result.data])
//
//
//    const handleSubmit = () => {
//        if (makerFee > 30 || makerFee < 0) {
//            Toast.show({
//                type: "error",
//                text1: "La comision de reventa deve ser entre 0 y 30"
//            })
//            throw new Error("La comision no es la adecuada")
//        }
//        console.log(makerFee)
//        addEvent({
//        variables:
//        {
//            eventName: name, 
//            startIn: `${day} de ${month}, ${startTime}:${minute}`,
//            description: desc,
//            eventMedia: image,
//            maxEspeculation: num,
//            freeEvent: freeEvent,
//            latitude: location && location.latitude ? location.latitude : 15,
//            longitude: location && location.longitude ? location.longitude : 15,
//            duration: duration,
//            makerFee: parseInt(makerFee)
//        }
//    })
//    }
//
//    return(
//        <>
//            <View style={styles.layout}>
//                <ScrollView style={{maxWidth: "100%", backgroundColor: '#101010'}}>
//                    <View style={{alignItems: 'center', marginTop: 41}}>
//                        <Text style={{
//                            fontSize: 25,
//                            fontStyle: 'italic',
//                            fontWeight: 'bold',
//                            textShadowColor: '#00c1b9'
//                        }}>
//                            Nuevo Evento
//                        </Text>
//                    </View>
//                    <View style={{
//                        height: 230, 
//                        width: "100%", 
//                        justifyContent: 'center', 
//                        marginTop: 30
//                    }}> 
//                 <TouchableOpacity
//                     onPress={pickImage}
//                     >
//                     {!image &&
//                         <View>
//                           <Image  style={{ alignSelf: 'center', height: 100, width: 100}} source={require('../../../assets/anadir-imagen.png')}/>
//                         </View>
//                       }
//                     {image &&
//                         <View>
//                           <Image style={styles.avatar} source={{uri: image}}/>
//                         </View>
//                     }
//                 </TouchableOpacity>
//                 </View>
//
//                    <TextInput 
//                        style={styles.input}
//                        value={name}
//                        placeholder="Nombre"
//                        onChangeText={text => setName(text)}
//                    />
//                    <TextInput 
//                        style={{
//                            height: 100,
//                            fontSize: 20,
//                            paddingHorizontal: 20,
//                            marginTop: 20,
//                            width: "90%",
//                            alignSelf: "center",
//                            backgroundColor: "#191919",
//                            borderRadius: 15
//                        }}
//                        value={desc}
//                        placeholder="Descripcion"
//                        onChangeText={text => setDesc(text)}
//                        multiline={true}
//                    /> 
//                {!location &&
//                    <TouchableOpacity
//                        style={{
//                            backgroundColor: '#00c1b9',
//                            borderRadius: 20,
//                            width: "90%",
//                            marginTop: 25,
//                            flexDirection: 'row',
//                            justifyContent: 'center',
//                            alignItems: 'center',
//                            alignSelf: 'center'
//                        }}
//                        onPress={() => setShowMap(true)}
//                    >
//                        <Text style={{paddingVertical: 15, fontSize: 18, fontStyle: 'italic', color: 'black'}}>
//                            Elegir Ubicacion
//                        </Text>
//                        <Image source={require('../../../assets/localizacion.png')} style={{height: 27, width: 27}}/>
//                    </TouchableOpacity>
//                    }
//                    {location &&
//                        <View style={{overflow: 'hidden', marginTop: 30, borderRadius: 20, marginHorizontal: 20}}>
//                            <MapView
//                                 initialRegion={location}
//                                 style={{ alignSelf: 'center',height: 180, width: "100%", marginHorizontal: 50}}
//                                
//                            />
//                        </View>
//
//                   }
//                        {showMap === true &&
//                            <ChooseLocationMap setLocation={setLocation} setShowMap={setShowMap}/>
//                        }
//                        <View style={{
//                            alignSelf: 'flex-start', 
//                            marginTop: 30, 
//                            borderWidth: 1, 
//                            borderColor: 'gray', 
//                            width: "100%", 
//                            paddingVertical: 20,
//                            borderRadius: 20
//                        }}>
//                            <Text style={{ 
//                                marginHorizontal: 20, 
//                                fontSize: 22, 
//                                fontWeight: '800'
//                            }}>Horario</Text>
//                            <TouchableOpacity
//                                    onPress={() => setShowMonths(true)}
//                                    style={{
//                                        paddingHorizontal: 80,
//                                        paddingVertical: 15,
//                                        backgroundColor: '#00c1b9',
//                                        borderRadius: 20,
//                                        margin: 15,
//                                        alignItems: "center"
//                                    }}
//                                >
//                                    <Text 
//                                        style={{
//                                            fontSize: 18,
//                                            fontWeight: '500',
//                                            fontStyle: 'italic'
//                                        }}>
//                                            {month}
//                                    </Text>
//                                </TouchableOpacity>
//                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
//                                <Ionicons name="calendar-outline" size={32}/>
//                                <TextInput 
//                                    style={styles.inPutInRow}
//                                    value={day}
//                                    placeholder="Dia"
//                                    keyboardType="numeric"
//                                    onChangeText={text => setDay(text)}
//                                />
//                            </View>
//                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
//                            <Ionicons name="time-outline" size={32}/>
//                                <TextInput 
//                                    style={styles.inPutInRow}
//                                    value={startTime}
//                                    placeholder="Hora"
//                                    keyboardType="numeric"
//                                    onChangeText={text => setStartTime(text)}
//                                />
//                                </View>
//                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
//                                <Ionicons name="timer-outline" size={32}/>
//                                <TextInput 
//                                    style={styles.inPutInRow}
//                                    value={minute}
//                                    placeholder="Minuto"
//                                    keyboardType="numeric"
//                                    onChangeText={text => setMinute(text)}
//                                />
//                            </View>
//                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
//                                <Ionicons name="hourglass-outline" size={32}/>
//                                <TextInput 
//                                    style={styles.inPutInRow}
//                                    value={duration}
//                                    placeholder="Duración(Horas)"
//                                    keyboardType="numeric"
//                                    onChangeText={text => setDuration(text)}
//                                />
//                                <Text>h</Text>
//                            </View>
//                        </View>
//                    <View style={{
//                        alignSelf: 'flex-start', 
//                        marginTop: 30, 
//                        borderWidth: 1, 
//                        borderColor: 'gray', 
//                        width: "100%", 
//                        paddingVertical: 20,
//                        borderRadius: 20
//                        }}>
//                        <Text style={{ 
//                            marginHorizontal: 20, 
//                            fontSize: 22, 
//                            fontWeight: "800"}}>Precio de reventa</Text>
//                        <Text style={{ marginHorizontal: 20}}>El precio de reventa es la plusvalia maxima al revender la entrada respecto al precio anterior</Text>
//                        <View style={{
//                            flexDirection: 'row', 
//                            alignSelf: 'flex-start',
//                            marginHorizontal: 20, 
//                            alignItems: 'center'
//                            }}>
//                            { num !== 1000 &&
//                            <>
//                            <TextInput 
//                                style={{
//                                    height: 30,
//                                    borderWidth: 1,
//                                    borderBottomColor: '#00c1b9',
//                                    fontSize: 18,
//                                    paddingHorizontal: 20,
//                                    marginTop: 10,
//                                    width: 70,
//                                    marginTop: 10,
//                                    borderRadius: 10
//                                }}
//                                value={num}
//                                placeholder="30"
//                                onChangeText={text => setNum(text)}
//                            
//                            />
//                            <Text style={{fontSize: 25, marginTop: 10}}>%</Text>
//                            <Text style={{fontSize: 20, paddingTop: 19, marginLeft: 10}}>o</Text>
//                            </>
//                            }
//                            <TouchableOpacity
//                            onPress={() =>{
//                                setNum(1000)
//                            }}
//                                style={{
//                                    marginLeft: 10,
//                                    paddingHorizontal: 20,
//                                    paddingVertical: 10,
//                                    borderRadius: 20,
//                                    backgroundColor: '#00c1b9',
//                                    marginTop: 10,
//                                    
//                                }}
//                            >
//                                <Text style={{
//                                    fontSize:18,
//                                    fontStyle: 'italic',
//                                    fontWeight: '700'
//                                }}>
//                                     Ilimitado
//                                </Text>
//                            </TouchableOpacity>
//                        </View>
//                        <TouchableOpacity
//                            onPress={() => setFreeEvent(true)}
//                            style={{
//                                paddingHorizontal: 80,
//                                paddingVertical: 15,
//                                backgroundColor: '#00c1b9',
//                                borderRadius: 20,
//                                margin: 15
//                            }}
//                        >
//                            <Text 
//                                style={{
//                                    fontSize: 18,
//                                    fontWeight: '700',
//                                    fontStyle: 'italic'
//                                }}>
//                                    Va a ser un evento gratis
//                            </Text>
//                        </TouchableOpacity>
//                    </View>
//                    <View style={{
//                        alignSelf: 'flex-start', 
//                        marginTop: 30, 
//                        borderWidth: 1, 
//                        borderColor: 'gray', 
//                        width: "100%", 
//                        paddingVertical: 20,
//                        borderRadius: 20
//                    }}>
//                        <Text style={{ marginHorizontal: 20, fontSize: 22, fontWeight: "800"}}>Porcetaje de comisión:</Text>
//                        <Text
//                            style={{
//                                marginHorizontal: 20
//                            }}
//                        > 
//                        El porcentaje de comision que desea cobrar por cada entrada que se revenda en el mercado entre el 0 y el 30%</Text>
//                        <View 
//                        style={{
//                            flexDirection: 'row', 
//                            alignSelf: 'flex-start',
//                            marginHorizontal: 20, 
//                            alignItems: 'center'
//                            }}>
//                            
//                            <>
//                            <TextInput 
//                                style={{
//                                    height: 30,
//                                    borderWidth: 1,
//                                    borderBottomColor: '#00c1b9',
//                                    fontSize: 18,
//                                    paddingHorizontal: 20,
//                                    marginTop: 10,
//                                    width: 100,
//                                    marginTop: 10,
//                                    borderRadius: 10
//                                }}
//                                value={makerFee}
//                                placeholder="0 - 30%"
//                                onChangeText={text => setMakerFee(text)}
//                                keyboardType="numeric"
//                            
//                            />
//                            <Text style={{fontSize: 25, marginTop: 10}}>%</Text>
//                            
//                            </>
//                            
//                        </View>
//                    </View>
//                    <View
//                        style={{
//                            height: 100
//                        }}
//                    />
// 
//            </ScrollView>  
//
//            </View>
//            { showMonths === true &&
//            <View style={{
//                position: 'absolute', 
//                alignSelf: 'center', 
//                top: 10, 
//                padding: 20, 
//                borderRadius: 20, 
//                backgroundColor: "#151515"
//            }}>
//                    <ScrollView>
//                        <TouchableOpacity
//                            onPress={() => {
//                                setMonth("Ene.")
//                                setShowMonths(false)
//                            }}
//                            style={styles.months}
//                        >
//                            <Text
//                                style={styles.monthText}
//                            >
//                                Ene.
//                            </Text>
//                        </TouchableOpacity>
//                        <TouchableOpacity
//                            onPress={() => {
//                                setMonth("Feb.")
//                                setShowMonths(false)
//                            }}
//                            style={styles.months}
//                        >
//                            <Text
//                            style={styles.monthText}>
//                                Feb.
//                            </Text>
//                        </TouchableOpacity>
//                        <TouchableOpacity
//                            onPress={() => {
//                                setMonth("Mar.") 
//                                setShowMonths(false)}}
//                            style={styles.months}
//                        >
//                            <Text
//                            style={styles.monthText}>
//                                Mar.
//                            </Text>
//                        </TouchableOpacity>
//                        <TouchableOpacity
//                            onPress={() => {
//                                setMonth("Abr.")
//                                setShowMonths(false)
//                            }}
//                            style={styles.months}
//                        >
//                            <Text
//                            style={styles.monthText}>
//                                Abr.
//                            </Text>
//                        </TouchableOpacity>
//                        <TouchableOpacity
//                            onPress={() => {
//                                setMonth("May.")
//                                setShowMonths(false)
//                            }}
//                            style={styles.months}
//                        >
//                            <Text
//                            style={styles.monthText}>
//                                May.
//                            </Text>
//                        </TouchableOpacity>
//                        <TouchableOpacity
//                            onPress={() => {
//                                setMonth("Jun.")
//                                setShowMonths(false)
//                            }}
//                            style={styles.months}
//                        >
//                            <Text
//                            style={styles.monthText}>
//                                Jun.
//                            </Text>
//                        </TouchableOpacity>
//                        <TouchableOpacity
//                            onPress={() => {
//                                setMonth("Jul.")
//                                setShowMonths(false)
//                            }}
//                            style={styles.months}
//                        >
//                            <Text
//                            style={styles.monthText}>
//                                Jul.
//                            </Text>
//                        </TouchableOpacity>    
//                        <TouchableOpacity
//                            onPress={() => {
//                                setMonth("Ago.")
//                                setShowMonths(false)
//                            }}
//                            style={styles.months}
//                        >
//                            <Text
//                            style={styles.monthText}>
//                                Ago.
//                            </Text>
//                        </TouchableOpacity>
//                        <TouchableOpacity
//                            onPress={() => {
//                                setMonth("Sep.")
//                                setShowMonths(false)
//                            }}
//                            style={styles.months}
//                        >
//                            <Text
//                            style={styles.monthText}>
//                                Sep.
//                            </Text>
//                        </TouchableOpacity>
//                        <TouchableOpacity
//                            onPress={() => {
//                                setMonth("Oct.")
//                                setShowMonths(false)
//                            }}
//                            style={styles.months}
//                        >
//                            <Text
//                            style={styles.monthText}>
//                                Oct.
//                            </Text>
//                        </TouchableOpacity>
//                        <TouchableOpacity
//                            onPress={() => {
//                                setMonth("Nov.")
//                                setShowMonths(false)
//                            }}
//                            style={styles.months}
//                        >
//                            <Text
//                            style={styles.monthText}>
//                                Nov.
//                            </Text>
//                        </TouchableOpacity>
//                        <TouchableOpacity
//                            onPress={() => {
//                                setMonth("Dic.")
//                                setShowMonths(false)
//                            }}
//                            style={styles.months}
//                        >
//                            <Text
//                            style={styles.monthText}>
//                                Dic.
//                            </Text>
//                        </TouchableOpacity>
//                    </ScrollView>
//            </View>
//              }  
//            <View style={{position: 'absolute', bottom: 20, alignSelf: 'center'}}>
//                <TouchableOpacity 
//                    style={styles.container}
//                    onPress={handleSubmit}
//                >
//                    <Image style={{height: 25, width: 25}} source={require('../../../assets/next.png')}/>
//
//                </TouchableOpacity>
//                    
//            </View>
//            </>
//    )
}
//
//
function ChooseLocationMap({setLocation, setShowMap}) {
//    const [actualLocation, setActualLocation] = useState()
//
//    useEffect(() => {
//        (async() => {
//            const response = await getUserLocation()
//            if(response.status === true) {
//                console.log(response.location)
//                setActualLocation(response.location)
//            }
//        })()
//    }, [])
//
//    const submitLocation = () => {
//        setLocation(actualLocation)
//        console.log(actualLocation)
//        setShowMap(false)
//    }
//
//    const quitMapWithoutLocation = () => {
//        setShowMap(false)
//    }
//
//    return(
//        <Modal setLocation={setLocation}>
//            <View style={{height: "100%", width: "100%"}}>
//                {actualLocation &&
//                    <MapView
//                        initialRegion={actualLocation}
//                        showsUserLocation
//                        style={styles.map}
//                        onRegionChange={(ev) => setActualLocation(ev)}
//                    >
//                        {actualLocation.latitude && (
//                              <Marker
//                                title="Marker"
//                                coordinate={{
//                                  latitude: actualLocation.latitude,
//                                  longitude: actualLocation.longitude || 15,
//                                }}
//                                draggable
//                                style={{ height: 40, width: 40 }}
//                              />
//                            )}
//                    </MapView>
//                }
//                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
//                    <TouchableOpacity
//                        style={{
//                            margin: 10,
//                            backgroundColor: 'gray',
//                            borderRadius: 15,
//                            paddingHorizontal: 50,
//                            paddingVertical: 10
//                        }}
//                        onPress={quitMapWithoutLocation}
//                    >
//                        <Text style={styles.textMap}>
//                            Cancelar
//                        </Text>
//                    </TouchableOpacity>
//                    <TouchableOpacity
//                        style={{
//                            margin: 10,
//                            backgroundColor: '#00c1b9',
//                            borderRadius: 15,
//                            paddingHorizontal: 50,
//                            paddingVertical: 10
//                        }}
//                        onPress={submitLocation}
//                    >
//                        <Text style={styles.textMap}>
//                            Guardar
//                        </Text>
//                    </TouchableOpacity>
//                </View>
//            </View>
//        </Modal>
//    )
}
//
//
//
//const styles = StyleSheet.create({
//    input: {
//        height: 50,
//        fontSize: 18,
//        paddingHorizontal: 20,
//        marginTop: 40,
//        width: "90%",
//        alignSelf: 'center',
//        borderRadius: 10,
//        backgroundColor: "#191919"
//    },
//    layout: {
//        backgroundColor: '#101010',
//        alignItems: 'center',
//        height: "110%",
//        flex: 1,
//    },
//    error: {
//        color: 'red',
//    },
//    button: {
//
//    },
//    container: {
//        backgroundColor: '#191919',
//        alignItems: 'center',
//        justifyContent: 'center',
//        borderColor: 'gray',
//        height: 10,
//        borderRadius: 50,
//        paddingVertical: 20,
//        paddingHorizontal: 90,
//        shadowColor: "#00c1b9",
//        shadowOffset: {
//            width: 15,
//            height: 15,
//        },
//        shadowOpacity: 1,
//        shadowRadius: 18.00,
//    
//        elevation: 10,
//    },
//    avatar: {
//        width: 350,
//        height: 230,
//        borderRadius: 10,
//        alignSelf: 'center'
//      },
//    map: {
//        width: "100%",
//        height: 700,
//        alignItems: 'center',
//        justifyContent: 'center'
//    },
//    textMap: {
//        fontSize:18,
//        fontStyle: 'italic',
//        fontWeight: '700'
//    },
//    inPutInRow: {
//        height: 50,
//        fontSize: 20,
//        paddingHorizontal: 20,
//        width: "70%",
//        alignSelf: 'center',
//        borderRadius: 15,
//        backgroundColor: "#191919"
//
//    },
//    months: {
//        paddingHorizontal: 60,
//        paddingVertical: 5,
//        backgroundColor: '#00c1b9',
//        marginBottom: 20,
//        borderRadius: 15
//    },
//    monthText: {
//        fontSize: 15,
//        fontWeight: '600',
//        fontStyle: 'italic'
//    }
//}) 