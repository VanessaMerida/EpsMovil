// App.js
import React from 'react'; // Asegúrate de importar React
import AppNavegacion from './Src/Navegation/AppNavegacion'; // <-- ¡Importa AppNavegacion!
import { NavigationContainer } from '@react-navigation/native';
import NavegacionPrincipal from './Src/Navegation/NavegacionPrincipal';

export default function App() {
  return (
    // <NavigationContainer>  <-- NavigationContainer ya está dentro de AppNavegacion
    //   <NavegacionPrincipal />  <-- Esto es incorrecto para el punto de entrada
    // </NavigationContainer>

    // ¡Aquí debes renderizar AppNavegacion!
    <AppNavegacion />
  );
}