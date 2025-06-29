import { NavigationContainer} from '@react-navigation/native';
import AuthNavegacion from './AuthNavegacion'; 
import NavegacionPrincipal from './NavegacionPrincipal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useRef, use } from 'react';
import { ActivityIndicator, View, StyleSheet, AppState } from 'react-native';

export default function AppNavegacion() {
  const [isLoading, setisLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const appState = useRef(AppState.currentState);

  const loadToken = async () => {
    
    try {
      const token = await AsyncStorage.getItem("userToken");

      setUserToken(token);
    } catch (e) {

    } finally {
      setisLoading(false);

    }
  };

  useEffect(() => {
    loadToken(); // Carga inicial del token
 
  }, []);

  useEffect(() => {
    // ... (tu código para handleAppStateChange)
    const handleAppStateChange = (nextAppState) => {

      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
    
        loadToken();
      }
      appState.current = nextAppState;
    };
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );
    return () => subscription?.remove();
  }, []);

  useEffect(() => {
   
    if (!isLoading) {
      const interval = setInterval(() => {
        if (AppState.currentState === "active") {
        
          loadToken();
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  // Añadir un console.log justo antes del return final
  

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1976D2" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userToken ? <NavegacionPrincipal /> : <AuthNavegacion />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});
// Este archivo es el punto de entrada para la navegación de la aplicación.
// Importa el contenedor de navegación y las rutas de autenticación o principal según el estado de autenticación.
// Aquí se define si el usuario está autenticado o no, y se renderiza la navegación correspondiente.
// El estado de autenticación se determina mediante el token almacenado en AsyncStorage.
// Puedes cambiar el valor de `Autenticado` para probar ambas rutas de navegación.


