import React from 'react';
import { View, Image, FlatList, Text, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_IMAGES_BY_PLAN } from './channelQuerys';

export const ImagesScreen = ({ planId }) => {
  console.log(planId)
  const { data } = useQuery(GET_IMAGES_BY_PLAN, { variables: { planId } });

  const images = data?.getContentImagesByPlan;

  const renderImageItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.content }} style={styles.imageStyle} />
      <Text style={styles.imageTitle}>{item.title}</Text>
      <Text style={styles.imageDescription}>{item.descrition}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderImageItem}
        keyExtractor={img => img.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    paddingHorizontal: 10,
  },
  imageContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#303030',
  },
  imageStyle: {
    width: '100%',
    height: 400,
  },
  imageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f5f5f5',
    margin: 10,
  },
  imageDescription: {
    fontSize: 14,
    color: '#b5b5b5',
    marginBottom: 10,
    marginLeft: 10,
  }
});

export default ImagesScreen;

