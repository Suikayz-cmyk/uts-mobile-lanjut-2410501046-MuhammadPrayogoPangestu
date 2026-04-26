import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';

import useFavoriteStore from '../store/favoriteStore';
import { useEffect, useState } from 'react';

export default function FavoritesScreen({ navigation }) {
  const favorites = useFavoriteStore(
    (state) => state.favorites
  );

  const removeFavorite = useFavoriteStore(
    (state) => state.removeFavorite
  );

  if (favorites.length === 0) {
    return (
      <View style={styles.center}>
        <Text>Belum ada resep favorit</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.idMeal}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() =>
      navigation.navigate('Detail', {
        idMeal: item.idMeal
      })
    }
  >
    <Image
      source={{ uri: item.strMealThumb }}
      style={styles.image}
    />

    <View style={styles.info}>
      <Text
        style={styles.title}
        numberOfLines={2}
      >
        {item.strMeal}
      </Text>

      <Text style={styles.category}>
        {item.strCategory}
      </Text>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() =>
          removeFavorite(item.idMeal)
        }
      >
        <Text style={styles.deleteText}>
          Hapus
        </Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
)}
    />
  );
}

const styles = StyleSheet.create({
 container: {
    padding: 16,
    backgroundColor: '#fff',
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 2,
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },

  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },

  category: {
    marginTop: 4,
    color: '#666',
  },

  deleteButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#f32a2a',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});