import { NavigationContainer} from '@react-navigation/native';
import AuthNavegacion from './AuthNavegacion'; 
import NavegacionPrincipal from './NavegacionPrincipal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useRef, use } from 'react';
import { ActivityIndicator, View, StyleSheet, AppState } from 'react-native';

export default function AppNavegacion() {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);
    const appState = useRef(AppState.currentState);

    const loadToken = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            setUserToken(token);
        } catch (e) {
            console.error("Error al cargar el token desde AsyncStorage:", e);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        loadToken();// Cargar el token al iniciar la aplicación
    }, []);

    // Determinar si el usuario está autenticado
    // Si el token existe, el usuario está autenticado
    // Si no, el usuario no está autenticado
    useEffect (() => {
        const handleAppStateChange = (nextAppState) => {
            if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
                console.log("La aplicación ha vuelto a estar activa. Cargando el token...");
                loadToken(); // Cargar el token cuando la aplicación vuelve a estar activa
            }
            appState.current = nextAppState;
        };
        const subscription = AppState.addEventListener('change', handleAppStateChange);
        return () => {
            subscription?.remove(); // Limpiar el listener al desmontar el componente
        }
    }, []);

    // Determinar si el usuario está autenticado
    // Si el token existe, el usuario está autenticado
    // Si no, el usuario no está autenticado
    useEffect(() => {
        if (!isLoading) {
            const interval = setInterval(() => {
                if (AppState.currentState === 'active') {
                    loadToken(); // Cargar el token cada 2 segundos solo si la aplicación está activa
                }
            }, 2000);
            return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
        }
    }, [isLoading]);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
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


