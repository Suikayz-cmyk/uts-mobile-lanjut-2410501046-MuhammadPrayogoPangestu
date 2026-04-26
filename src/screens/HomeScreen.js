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
import { getCategories } from '../services/mealApi';

export default function HomeScreen({ navigation }) {

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      setError('');

      const data = await getCategories();
      setCategories(data);

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
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Loading categories...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setLoading(true);
            loadData();
          }}
        >
          <Text style={{ color:'#fff', fontWeight:'bold' }}>
            Coba Lagi
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Kategori Makanan
      </Text>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.idCategory}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
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
    backgroundColor: '#fff',
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
});