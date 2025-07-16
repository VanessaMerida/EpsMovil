// Src/Navegation/Stacks/CitasMedicasStack.js
import ListarCitasMedicas from '../../../Screen/CitasMedicas/ListarCitasMedicas';
import DetalleCitaMedica from '../../../Screen/CitasMedicas/DetalleCitaMedica';
import EditarCitaMedica from '../../../Screen/CitasMedicas/EditarCitaMedica';
import { createStackNavigator } from '@react-navigation/stack';

export default function CitasMedicasStack() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#6A5ACD' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold' }
            }}>
            <Stack.Screen
                name="ListarCitasMedicas"
                component={ListarCitasMedicas}
                options={{ title: 'Citas Médicas' }}
            />
            <Stack.Screen
                name="DetalleCitaMedica"
                component={DetalleCitaMedica}
                options={{ title: 'Detalle de Cita' }}
            />
            {/* ✅ RUTA ÚNICA PARA EL FORMULARIO */}
            <Stack.Screen
                name="FormularioCita"
                component={EditarCitaMedica}
                options={({ route }) => ({
                    // El título cambia según si pasamos una cita para editar o no
                    title: route.params?.citaMedica ? 'Editar Cita' : 'Agendar Nueva Cita'
                })}
            />
        </Stack.Navigator>
    );
}