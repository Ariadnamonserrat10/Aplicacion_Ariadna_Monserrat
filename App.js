import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Principal from "./src/Pages/Principal";
import Inicio from "./src/Pages/Inicio";
import Pantalla2 from "./src/Pages/Pantalla2";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Principal"
        screenOptions={{
          headerShown: false 
        }}
      >
        <Stack.Screen name="Principal" component={Principal} />
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Pantalla2" component={Pantalla2}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
