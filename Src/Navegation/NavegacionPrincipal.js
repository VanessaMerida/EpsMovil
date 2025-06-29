import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Ionicons } from "@expo/vector-icons"; // Asegúrate de tener @expo/vector-icons instalado

// Importaciones de tus Stacks de Navegación principales
// Asegúrate de que las rutas sean correctas.
// Si InicioScreen es una pantalla y no un Stack, asegúrate de que su path sea correcto
import InicioScreen from "./Stacks/Inicio"; // O './Stacks/InicioStack' si es un Stack
import PerfilStack from "./Stacks/PerfilStack";
import ConfiguracionStack from "./Stacks/ConfiguracionStack";
import EspecialidadesStack from "./Stacks/EspecialidadesStack";
import MedicosStack from "./Stacks/MedicosStack";
import ConsultoriosStack from "./Stacks/ConsultoriosStack";
import PacientesStack from "./Stacks/PacientesStack";
import CitasMedicasStack from "./Stacks/CitasMedicasStack";

// ¡IMPORTANTE! No importamos LoginScreen ni RegistroScreen aquí.
// Ellos son manejados por AuthNavegacion.js

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 👉 Componente de Pestañas Inferiores (Bottom Tabs)
// Este componente agrupa las pantallas que se acceden directamente desde las pestañas.
function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#1976D2",
        tabBarInactiveTintColor: "#757575",
        // Aquí es donde decides si el Tab Navigator tiene su propio encabezado o no.
        // Generalmente, si usas Stacks dentro de Tabs, quieres que el Stack interno maneje el header.
        headerShown: true, // <-- Oculta el encabezado por defecto en las pantallas de las pestañas
                               // Esto permite que cada Stack dentro de la pestaña maneje su propio header

        // Si quisieras un header común para todas las pestañas:
        // headerStyle: {
        //   backgroundColor: "#2a86ff",
        // },
        // headerTintColor: "#fff",
        // headerTitleStyle: {
        //   fontWeight: "bold",
        // },
        // headerTitle: getHeaderTitle(route), // Necesitarías importar getFocusedRouteNameFromState
      })}
    >
      <Tab.Screen
        name="InicioTab" // Un nombre único para la pestaña de Inicio
        component={InicioScreen} // Asumo que "InicioScreen" es una pantalla. Si es un Stack, cámbialo.
        options={{
          title: "Inicio", // Título que se muestra en la pestaña
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          // Si InicioScreen necesita un header, defínelo en el propio componente o en un Stack.
          // Por ejemplo:
          // headerShown: true, // Si quieres que solo esta pestaña tenga header
          // headerTitle: "Bienvenido",
        }}
      />

      <Tab.Screen
        name="PerfilTab" // Un nombre único para la pestaña de Perfil
        component={PerfilStack} // Renderiza todo el Stack de Perfil
        options={{
          title: "Perfil", // Título que se muestra en la pestaña
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
          // El header lo manejará PerfilStack internamente (si PerfilStack lo define)
        }}
      />

      <Tab.Screen
        name="ConfiguracionTab" // Un nombre único para la pestaña de Configuración
        component={ConfiguracionStack} // Renderiza todo el Stack de Configuración
        options={{
          title: "Configuración", // Título que se muestra en la pestaña
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
          // El header lo manejará ConfiguracionStack internamente
        }}
      />

      {/*
        ¡Eliminamos la pantalla de Login de las Tabs!
        El usuario ya está autenticado para acceder a NavegacionPrincipal.
      */}
      {/* <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="log-in" size={size} color={color} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}

// 👉 Navegador Principal: incluye Tabs + otras pantallas fuera de las pestañas
// Estas son pantallas a las que se puede navegar desde cualquier parte de las Tabs
// Por ejemplo, una pantalla de detalles de un médico que se abre desde una lista.
export default function NavegacionPrincipal() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/*
        La primera pantalla de este Stack siempre será el navegador de pestañas.
        Una vez que el usuario está logueado, ve las Tabs.
      */}
      <Stack.Screen name="MainTabs" component={Tabs} />

      {/*
        Estas son pantallas/stacks a las que se navega desde las pantallas
        dentro de las pestañas. Por ejemplo, desde la pestaña "Inicio"
        podrías tener una lista de médicos y al tocar uno, navegarías a la pantalla
        de detalles del médico, que podría estar definida dentro de MedicosStack.
        Asegúrate de que cada uno de estos es un componente Stack Navigator.
      */}
      <Stack.Screen name="Especialidades" component={EspecialidadesStack} />
      <Stack.Screen name="Medicos" component={MedicosStack} />
      <Stack.Screen name="Consultorios" component={ConsultoriosStack} />
      <Stack.Screen name="Pacientes" component={PacientesStack} />
      <Stack.Screen name="CitasMedicas" component={CitasMedicasStack} />

      {/*
        ¡Eliminamos LoginScreen y RegistroScreen de aquí también!
        Estas pantallas pertenecen exclusivamente a AuthNavegacion.
      */}
      {/* <Stack.Screen name="Registro" component={RegistroScreen} /> */}
      {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
    </Stack.Navigator>
  );
}

// Opcional: Función auxiliar si quieres un título de header dinámico en las pestañas
// Necesitarías importar getFocusedRouteNameFromState desde '@react-navigation/native'
// import { getFocusedRouteNameFromState } from '@react-navigation/native';
// const getHeaderTitle = (route) => {
//     const routeName = getFocusedRouteNameFromState(route.state) ?? 'InicioTab';
//     switch (routeName) {
//       case 'InicioTab':
//         return 'Inicio';
//       case 'PerfilTab':
//         return 'Mi Perfil';
//       case 'ConfiguracionTab':
//         return 'Configuración de la App';
//       default:
//         return 'App';
//     }
// };