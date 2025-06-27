import { createStackNavigator } from '@react-navigation/stack';
import ListarMedicos from '../../../Screen/Medicos/ListarMedicos';
import DetalleMedico from '../../../Screen/Medicos/DetalleMedico'; // Replace with actual detail screen component
import EditarMedico from '../../../Screen/Medicos/EditarMedico'; // Replace with actual edit screen component

export default function MedicosStack() {
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
            }}
            >
            <Stack.Screen
                name="Medicos"
                component={ListarMedicos}
                options={{ headerShown: true, title:  'Médicos' }}
            />
            <Stack.Screen
                name="DetalleMedico"
                component={DetalleMedico} // Replace with actual detail screen component
                options={{ headerShown: true, title: 'Detalle Médico' }}
            />
            <Stack.Screen
                name="EditarMedico"
                component={EditarMedico} 
                options={{ headerShown: true, title: 'Editar Médico' }}
            />
            <Stack.Screen
                name="AgregarMedico"
                component={EditarMedico} 
                options={{ headerShown: true, title: 'Agregar Médico' }}
            />
        </Stack.Navigator>
    );
}
