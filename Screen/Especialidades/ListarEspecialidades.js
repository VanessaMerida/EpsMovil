// Src/Screens/Especialidades/ListarEspecialidades.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ListItemCard from '../../Components/ListItemCard';
import BotonComponent from '../../Components/BotonComponent'; // Reutilizando BotonComponent

export default function ListarEspecialidades() {
  const navigation = useNavigation();

  const [especialidades, setEspecialidades] = useState([
    { id: '1', nombre: 'Cardiología', descripcion: 'Especialidad en el corazón y sistema circulatorio.', jefedearea: 'Dr. Juan Pérez', fechacreacion: '2023-01-15', ultimamodificacion: '2024-06-20' },
    { id: '2', nombre: 'Dermatología', descripcion: 'Especialidad en la piel, cabello y uñas.', jefedearea: 'Dra. Ana Gómez', fechacreacion: '2023-02-01', ultimamodificacion: '2024-05-10' },
    { id: '3', nombre: 'Pediatría', descripcion: 'Especialidad en la salud y enfermedades de los niños.', jefedearea: 'Dr. Luis Torres', fechacreacion: '2023-03-10', ultimamodificacion: '2024-04-25' },
    { id: '4', nombre: 'Neurología', descripcion: 'Especialidad en el sistema nervioso y sus trastornos.', jefedearea: 'Dra. Clara Soto', fechacreacion: '2023-04-20', ultimamodificacion: '2024-03-18' },
    { id: '5', nombre: 'Ortopedia', descripcion: 'Especialidad en el sistema musculoesquelético.', jefedearea: 'Dr. Ricardo Paz', fechacreacion: '2023-05-05', ultimamodificacion: '2024-02-01' },
  ]);

  const renderEspecialidadItem = ({ item }) => (
    <ListItemCard
      title={item.nombre}
      description={item.descripcion}
      iconName="medical-outline"
      iconColor="#1E90FF"
      onPress={() => navigation.navigate('DetalleEspecialidad', { especialidad: item })}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listado de Especialidades</Text>
      <Text style={styles.subtitle}>Aquí aparecerán todas las especialidades registradas</Text>

      <FlatList
        data={especialidades}
        renderItem={renderEspecialidadItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyListText}>No hay especialidades registradas.</Text>}
      />

      <BotonComponent
        title="Agregar Especialidad"
        onPress={() => navigation.navigate("EditarEspecialidad")}
        style={styles.addButton}
        iconName="add-circle-outline"
        iconColor="#fff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#999',
  },
  addButton: {
    backgroundColor: '#28A745', // Verde para agregar
  },
});