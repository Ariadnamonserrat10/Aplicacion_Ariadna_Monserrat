import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Principal from "./src/Pages/Principal";
import Inicio from "./src/Pages/Inicio";
import Pantalla2 from "./src/Pages/Pantalla2";
import Menu from "./src/Pages/Menu";
import Inventario from "./src/Pages/Inventario";
import Categoria from "./src/Pages/Categoria";
import Configuracion from "./src/Pages/Configuracion";

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
        <Stack.Screen name="Menu" component={Menu}/>
        <Stack.Screen name="Inventario" component={Inventario}/>
        <Stack.Screen name="Categoria" component={Categoria}/>
        <Stack.Screen name="Configuracion" component={Configuracion}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
