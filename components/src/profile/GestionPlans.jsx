import React, { useState, useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { REQUEST_MY_PLANS } from './gestionQuerys';
import { useQuery } from '@apollo/client';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const Card = ({ item, openSheet, setSelectedPlanId }) => {
  return (
    <TouchableOpacity onPress={() => {
      setSelectedPlanId(item.id);
      openSheet();
    }}>
      <View style={styles.cardContainer}>
        <Image source={{ uri: item.photo }} style={styles.photo} />
        <Text style={styles.planName}>{item.planName}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>{item.price}€</Text>
      </View>
    </TouchableOpacity>
  );
};

export const Plans = ({ navigation }) => {
  const { data } = useQuery(REQUEST_MY_PLANS);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const bottomSheetModalRef = useRef(null);

  const handleGoCreate = () => {
    navigation.navigate("CreatePlanForm");
  };

  const handleUpload = () => {
    if (selectedPlanId) {
      navigation.navigate("PlanContentForm", { planId: selectedPlanId });
      bottomSheetModalRef.current.close();
    }
  };

  const openSheet = () => {
    bottomSheetModalRef.current.present();
  };

  return (
    <BottomSheetModalProvider>
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        onPress={handleGoCreate}>
          <Text style={{color: "white"}}>Crear Plan</Text>
      </TouchableOpacity>
      {data &&
        <>
          <View style={{backgroundColor: "#191919", paddingVertical: 6, borderWidth: 1, borderColor: "gray", width: "104%", alignSelf: "center"}}>
            <Text style={{fontSize: 22, fontWeight: "bold", marginLeft: 20, color: "white"}}>Planes De {data.requestMyPlans.username}</Text>
          </View>  
          <View style={styles.capsuledList}>
            <FlatList
              data={data.requestMyPlans.plans}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <Card item={item} openSheet={openSheet} setSelectedPlanId={setSelectedPlanId} />}
            />
          </View>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={['30%']}
            backgroundComponent={({ style }) => (
              <View style={[style, { backgroundColor: '#171717' }]} />
            )}
          >
            <View style={{ padding: 20 }}>
              <TouchableOpacity style={styles.Mbutton} onPress={() => { /* Funcionalidad de editar */ }}>
                <Text style={{color: "white"}}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.Mbutton} onPress={handleUpload}>
                <Text style={{color: "white"}}>Subir</Text>
              </TouchableOpacity>
            </View>
          </BottomSheetModal>
        </>
      }
    </View>
    </BottomSheetModalProvider>
  );
};

// Estilos no se han modificado


// Estilos no se han modificado
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
  },
  card: {
    backgroundColor: '#ffffff',
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  planName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: "white"
  },
  description: {
    fontSize: 16,
    color: '#888888',
    marginBottom: 10
  },
  context: {
    fontSize: 16,
    color: '#888888',
  },
  price: {
    fontSize: 22,
    color: "white"
  },
  duration: {
    fontSize: 16,
    color: 'white',
  },
  type: {
    fontSize: 16,
    color: '#000000',
  },
  photo: {
    width: "100%",
    height:170,
    borderRadius: 5,
    marginTop: 10,
  },
  button: {
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 15,
    marginVertical: 50,
    width: "80%",
    borderRadius: 10,
    backgroundColor: "#a565f2",
    marginTop: 50
  },
  capsuledList: {
    width: "90%",
    alignSelf: "center"
  },
  cardContainer: {
    width: "100%",
    backgroundColor: "#191919",
    marginVertical: 20,
    padding: 15,
    borderRadius: 10
  },
  Mbutton: {
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 15,
    marginVertical: 10,
    width: "80%",
    borderRadius: 10,
    backgroundColor: "#a565f2",
  }
});

