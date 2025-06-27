// App.js (Este es el archivo principal que se renderiza, por ejemplo, en index.js)

import { NavigationContainer } from '@react-navigation/native';
import NavegacionPrincipal from './Src/Navegation/NavegacionPrincipal';

export default function App() {
  return (
    <NavigationContainer>
      {/* Aquí solo llamas a tu NavegacionPrincipal que ahora es el RootStack */}
      <NavegacionPrincipal />
    </NavigationContainer>
  );
}