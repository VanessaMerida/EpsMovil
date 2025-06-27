import ConfiguracionScreen from "../../../Screen/Configuracion/Configuracion";
import { createStackNavigator } from '@react-navigation/stack';

export default function ConfiguracionStack() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Configuracion"
                component={ConfiguracionScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}