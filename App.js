import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaSaude from './src/TelaSaude'; /*IMPORTANDO A TELA SAUDE*/
import Perfil from './src/Perfil'; /*IMPORTANDO A PERFIL*/


const Stack = createStackNavigator(); 

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TelaSaude" component={TelaSaude} />
        <Stack.Screen name="Perfil" component={Perfil} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
