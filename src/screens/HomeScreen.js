import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
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
          <Text>Coba Lagi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.idCategory}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate('Browse', {
                category: item.strCategory,
              })
            }
          >
            <Text>{item.strCategory}</Text>
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
    padding: 16,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  item: {
    padding: 12,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  }
});