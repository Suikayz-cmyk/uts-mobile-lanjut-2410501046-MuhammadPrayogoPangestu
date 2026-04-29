import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
} from 'react-native';
import { useEffect, useState } from 'react';
import { getCategories, getRandomMeal } from '../services/mealApi';

export default function HomeScreen({ navigation }) {

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [featuredMeal, setFeaturedMeal] = useState(null);

  const loadData = async () => {
    try {
      setError('');

      const data = await getCategories();
      setCategories(data);

      const randomMeal = await getRandomMeal();
      setFeaturedMeal(randomMeal);

    } catch (err) {
      setError('Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.centerText}> Loading categories... </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.centerText}> Gagal Memuat Data  </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setLoading(true);
            loadData();
          }}
        >
        <Text style={{ color:'#fff', fontWeight:'bold', textAlign:'center' }}>
            Coba Lagi
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.idCategory}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        
        ListHeaderComponent={
          <>
            <Text style={styles.appTitle}>Resep Kita </Text>

            <TouchableOpacity
              style={styles.heroCard}
              onPress={() =>
                navigation.navigate('Detail', {
                  idMeal: featuredMeal.idMeal
                })
              }
            >
              <Text style={styles.heroLabel}>
                Today's Recommendation
              </Text>

              <Image
                source={{
                  uri: featuredMeal?.strMealThumb
                }}
                style={styles.heroImage}
              />

              <Text style={styles.heroTitle}>
                {featuredMeal?.strMeal || 'Loading...'}
              </Text>

              <Text style={styles.heroSub}>
                Tap for detail
              </Text>
            </TouchableOpacity>

            <Text style={styles.title}>
              Kategori Makanan
            </Text>
          </>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('Browse', {
                category: item.strCategory
              })
            }
          >
            <Image
              source={{ uri: item.strCategoryThumb }}
              style={styles.image}
            />

            <Text style={styles.cardTitle}>
              {item.strCategory}
            </Text>
          </TouchableOpacity>
          )}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF7',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    color: '#222',
  },

  button: {
    marginTop: 12,
    backgroundColor: '#47bbe9',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  list: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  row: {
    justifyContent: 'space-between',
  },

  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 2,
  },

  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },

  cardTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFDF7',
  },

  centerText: {
    marginTop: 12,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },

  appTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },

  heroCard: {
    backgroundColor: '#468432',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },

  heroImage: {
    width: '100%',
    height: 160,
    borderRadius: 14,
    marginBottom: 12,
  },

  heroLabel: {
    color: '#ffffff',
    fontSize: 13,
    marginBottom: 6,
  },

  heroTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  heroSub: {
    color: '#fff',
    marginTop: 10,
    fontSize: 14,
  },
});