import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import BrowseScreen from '../screens/BrowseScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#468432',
        },

        headerTintColor: '#fff',

        headerTitleStyle: {
          fontWeight: 'bold',
        },

        headerShadowVisible: true,

        headerStatusBarHeight: 0,
      }}
    >
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerShown: true,
        }}
      />
<<<<<<< HEAD
      <Stack.Screen name="Browse" component={BrowseScreen} />
=======

      <Stack.Screen
        name="Browse"
        component={BrowseScreen}
      />
>>>>>>> df7032d (style: polish UI with recolor screens and navigation)
    </Stack.Navigator>
  );
}