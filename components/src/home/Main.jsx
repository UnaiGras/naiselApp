import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const data = [
  {
    name: 'Producto 1',
    description: 'Descripción del producto 1',
    context: 'Contexto del producto 1',
    price: 9.99,
    duration: '1 mes',
    type: 'Tipo de producto 1',
    photo: 'https://ejemplo.com/foto1.jpg',
  },
  {
    name: 'Producto 2',
    description: 'Descripción del producto 2',
    context: 'Contexto del producto 2',
    price: 19.99,
    duration: '2 meses',
    type: 'Tipo de producto 2',
    photo: 'https://ejemplo.com/foto2.jpg',
  },
  // Agrega más objetos de datos aquí...
];

const Card = ({ item }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.context}>{item.context}</Text>
      <Text style={styles.price}>{item.price}</Text>
      <Text style={styles.duration}>{item.duration}</Text>
      <Text style={styles.type}>{item.type}</Text>
      <Image style={styles.photo} source={{ uri: item.photo }} />
    </View>
  );
};

const MainScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Card item={item} />}
      />
    </View>
  );
};

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
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#888888',
  },
  context: {
    fontSize: 16,
    color: '#888888',
  },
  price: {
    fontSize: 16,
    color: '#000000',
  },
  duration: {
    fontSize: 16,
    color: '#000000',
  },
  type: {
    fontSize: 16,
    color: '#000000',
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default MainScreen;
