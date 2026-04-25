import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';

import { useEffect, useState } from 'react';
import { getMealDetail } from '../services/mealApi';
import useFavoriteStore from '../store/favoriteStore';

export default function DetailScreen({ route, navigation }) {

  const [meal, setMeal] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { idMeal } = route.params;

  const loadDetail = async () => {
    try {
      setError('');

      const data = await getMealDetail(idMeal);
      setMeal(data);

    } catch (err) {
      console.log(err);
      setError('Gagal memuat detail');
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = useFavoriteStore(
    (state) => state.addFavorite
  );

  const removeFavorite = useFavoriteStore(
    (state) => state.removeFavorite
  );

  const favorites = useFavoriteStore(
    (state) => state.favorites
  );

  const isFavorite = useFavoriteStore(
    (state) => state.isFavorite
  );

  const favoriteStatus = favorites.some(
    (item) => item.idMeal === meal?.idMeal
  );

  const handleFavoriteToggle = () => {
    if (favoriteStatus) {
      removeFavorite(meal.idMeal);
    } else {
      addFavorite(meal);
    }
  };

  useEffect(() => {
    loadDetail();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }  

  return (
  <ScrollView contentContainerStyle={styles.content}>
      <Text>Detail Screen</Text>
        <Image
          source={{ uri: meal.strMealThumb }}
          style={styles.image}
        />

        <Text style={styles.title}>{meal.strMeal}</Text>

        <TouchableOpacity
          style={[
            styles.button,
            isFavorite(meal.idMeal) && styles.removeButton
          ]}
          onPress={handleFavoriteToggle}
        >
          <Text>
            {favoriteStatus
              ? 'Hapus Favorit'
              : 'Tambah Favorit'}
          </Text>
        </TouchableOpacity>

        <Text>Category: {meal.strCategory}</Text>
        <Text>Area: {meal.strArea}</Text>

        <Text style={styles.section}>Instructions:</Text>
        <Text>{meal.strInstructions}</Text>
      </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
content: {
  padding: 16,
},

image: {
  width: '100%',
  height: 250,
  borderRadius: 12,
},

title: {
  fontSize: 24,
  fontWeight: 'bold',
  marginVertical: 12,
},

section: {
  fontSize: 18,
  fontWeight: 'bold',
  marginTop: 16,
},

button: {
  marginTop: 20,
  padding: 12,
  backgroundColor: '#4fff64',
  borderRadius: 8,
  alignItems: 'center',
},
removeButton: {
  backgroundColor: '#ff6b6b'
}

});