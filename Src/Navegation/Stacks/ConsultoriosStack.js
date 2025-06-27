import { createStackNavigator } from '@react-navigation/stack';
import ListarConsultorios from '../../../Screen/Consultorios/ListarConsultorios';
import DetalleConsultorio from '../../../Screen/Consultorios/DetalleConsultorio'; // Replace with actual detail screen component
import EditarConsultorio from '../../../Screen/Consultorios/EditarConsultorio'; // Replace with actual edit screen component

const Stack = createStackNavigator();

export default function ConsultoriosStack() {
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
        name="Consultorios"
        component={ListarConsultorios}
        options={{ headerShown: true, title: 'Consultorios' }}
      />
      <Stack.Screen
        name="DetalleConsultorio"
        component={DetalleConsultorio} // Replace with actual detail screen component
        options={{ headerShown: true, title: 'Detalle Consultorio' }}
      />
      <Stack.Screen
        name="EditarConsultorio"
        component={EditarConsultorio} // Replace with actual edit screen component
        options={{ headerShown: true, title: 'Editar Consultorio' }}
      />
      <Stack.Screen
        name="AgregarConsultorio"
        component={EditarConsultorio} // Replace with actual add screen component
        options={{ headerShown: true, title: 'Agregar Consultorio' }}
      />
    </Stack.Navigator>
  );
}



