import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OrderProvider } from './contexts/OrderContext';

import AdminView from './components/AdminView';
import StudentView from './components/StudentView';

// Defining the navigation types
export type RootStackParamList = {
  Admin: undefined;
  Student: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <OrderProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Student">
          <Stack.Screen name="Admin" component={AdminView} />
          <Stack.Screen name="Student" component={StudentView} />
        </Stack.Navigator>
      </NavigationContainer>
    </OrderProvider>
  );
}
