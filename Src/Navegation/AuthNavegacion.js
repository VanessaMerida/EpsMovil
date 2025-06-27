// AuthNavegacion.js
import {createStackNavigator} from '@react-navigation/stack';
import PantallaLogin from '../../Screen/Auth/Login'; // Asegúrate de que esta ruta sea correcta
import PantallaRegistro from '../../Screen/Auth/Registro'; // Asegúrate de que esta ruta sea correcta


const Stack = createStackNavigator();

export default function AuthNavegacion() {
    return (
        <Stack.Navigator
            initialRouteName="Login" // <-- ¡Añade esta línea! Define que "Login" es la primera pantalla.
            screenOptions={{
                headerShown: false // <-- ¡Añade esta línea! Oculta la barra de navegación en Login y Registro.
            }}
        >

            <Stack.Screen
                name="Login"
                component={PantallaLogin}
                // options={{ title: 'Iniciar Sesión'}} // Si headerShown es false, este título no se verá. Puedes quitarlo.
            />
            <Stack.Screen
                name="Registro"
                component={PantallaRegistro}
                // options={{ title: 'Registrarse'}} // Si headerShown es false, este título no se verá. Puedes quitarlo.
            />

        </Stack.Navigator>
    );
}