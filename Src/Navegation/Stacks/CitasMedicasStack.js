import ListarCitasMedicas from '../../../Screen/CitasMedicas/ListarCitasMedicas';
import DetalleCitaMedica from '../../../Screen/CitasMedicas/DetalleCitaMedica';
import EditarCitaMedica from '../../../Screen/CitasMedicas/EditarCitaMedica';
import { createStackNavigator } from '@react-navigation/stack';

export default function CitasMedicasStack() {

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
        screenOptions={{
                headerStyle: {
                    backgroundColor: '#6200EE', // Morado para asociados
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold'
                }
            }}>
            <Stack.Screen
                name="CitasMedicas"
                component={ListarCitasMedicas}
                options={{ headerShown: true, title: 'Citas Médicas' }}
            />
            <Stack.Screen
                name="DetalleCitaMedica"
                component={DetalleCitaMedica}
                options={{ headerShown: true, title: 'Detalle Cita Médica' }}
            />
            <Stack.Screen
                name="EditarCitaMedica"
                component={EditarCitaMedica}
                options={{ headerShown: true, title: 'Editar Cita Médica' }}
            />
            <Stack.Screen
                name="AgregarCitaMedica"
                component={EditarCitaMedica}
                options={{ headerShown: true, title: 'Agregar Cita Médica' }}
            />
        </Stack.Navigator>
    );
}

