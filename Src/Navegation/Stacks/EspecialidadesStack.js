import { createStackNavigator } from '@react-navigation/stack';
import ListarEspecialidades from '../../../Screen/Especialidades/ListarEspecialidades';
import DetalleEspecialidad from '../../../Screen/Especialidades/DetalleEspecialidad'; 
import EditarEspecialidad from '../../../Screen/Especialidades/EditarEspecialidad'; 

export default function EspecialidadesStack() {
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
                name="Especialidades"
                component={ListarEspecialidades}
                options={{ headerShown: true, title: 'Especialidades' }}
            />
            <Stack.Screen
                name="DetalleEspecialidad"
                component={DetalleEspecialidad}
                options={{ headerShown: true, title: 'Detalle Especialidad' }}
            />
            <Stack.Screen
                name="EditarEspecialidad"
                component={EditarEspecialidad}
                options={{ headerShown: true, title: 'Editar/Agregar Especialidad' }}
            />
           
        </Stack.Navigator>
    );
}

