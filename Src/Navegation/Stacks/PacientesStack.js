import { createStackNavigator } from '@react-navigation/stack';
import ListarPacientes from '../../../Screen/Pacientes/ListarPacientes';
import DetallePaciente from '../../../Screen/Pacientes/DetallePaciente'; // Replace with actual detail screen component
import EditarPaciente from '../../../Screen/Pacientes/EditarPaciente'; // Replace with actual edit screen component

export default function PacientesStack() {
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
                name="Pacientes"
                component={ListarPacientes}
                options={{ headerShown: true, title: 'Pacientes' }}
            />
            <Stack.Screen
                name="DetallePaciente"
                component={DetallePaciente} // Replace with actual detail screen component
                options={{ headerShown: true, title: 'Detalle Paciente' }}
            />
            <Stack.Screen
                name="EditarPaciente"
                component={EditarPaciente} // Replace with actual edit screen component
                options={{ headerShown: true, title: 'Editar Paciente' }}
            />
            <Stack.Screen
                name="AgregarPaciente"
                component={EditarPaciente} // Replace with actual add screen component
                options={{ headerShown: true, title: 'Agregar Paciente' }}
            />
        </Stack.Navigator>
    );
}
