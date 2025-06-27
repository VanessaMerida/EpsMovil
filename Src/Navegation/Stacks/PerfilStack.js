// Src/Navigation/Stacks/PerfilStack.js
import { createStackNavigator } from "@react-navigation/stack"; //
import PerfilScreen from "../../../Screen/Perfil/Perfil";
import EditarPerfil from "../../../Screen/Perfil/EditarPerfil";

const Stack = createStackNavigator(); //

export default function PerfilStack() {
  return (
    <Stack.Navigator>
      {/* Puedes quitar screenOptions={{ headerShown: false }} del Stack.Navigator si quieres la barra en todas*/}
      {/* Comentario de línea o de bloque dentro de JSX: */}
      {/* <Stack.Screen
        name="PerfilInicio"
        component={PerfilScreen}
        options={{ headerShown: false }} // Si quieres ocultar el encabezado solo en esta pantalla
      /> */}
      <Stack.Screen
        name="PerfilInicio"
        component={PerfilScreen}
        options={{ headerShown: false }} // Si quieres ocultar el encabezado solo en esta pantalla
      />

      <Stack.Screen
        name="EditarPerfil"
        component={EditarPerfil}
        options={{ title: 'Editar Perfil' }} // Título en la barra superior
      />
    </Stack.Navigator>
  );
}