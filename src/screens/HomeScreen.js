import { View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';
import React, { useEffect } from 'react';
import { getCategories } from '../services/mealApi';

export default function HomeScreen({ navigation }) {

 useEffect(() => {
    async function loadData() {
      const data = await getCategories();
      console.log(data);
    }

    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Browse')}>
        <Text>Browse</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Detail')}>
        <Text>Detail</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});