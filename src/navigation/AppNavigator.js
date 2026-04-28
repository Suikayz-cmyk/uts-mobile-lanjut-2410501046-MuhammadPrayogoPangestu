import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';
import DetailScreen from '../screens/DetailScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{
            title: 'Detail',
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
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}