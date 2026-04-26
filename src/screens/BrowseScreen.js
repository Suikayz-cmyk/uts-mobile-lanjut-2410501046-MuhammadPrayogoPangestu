import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useEffect, useState } from 'react';

import { getMealsByCategory } from '../services/mealApi';

export default function BrowseScreen({ route, navigation }) {
  const [meals, setMeals] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { category } = route.params;

  const loadMeals = async () => {
    try {
      setLoading(true);
      const data = await getMealsByCategory(category);
      setMeals(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMeals();
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadMeals();
    setRefreshing(false);
  };

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
    <View style={styles.container}>
    <Text style={styles.pageTitle}>
      {category} ({meals.length})
    </Text>

      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
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
              <Text style={styles.title}>
                {item.strMeal}
              </Text>

              <Text style={styles.subtitle}>
                Tap for detail
              </Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
      
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  content: {
    padding: 16,
  },

  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    color: '#222',
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
    alignItems: 'center',
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },

  info: {
    flex: 1,
    marginLeft: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },

  subtitle: {
    marginTop: 6,
    color: '#666',
    fontSize: 13,
  },
});