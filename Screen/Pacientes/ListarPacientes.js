// Src/Screens/Pacientes/ListarPacientes.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ListItemCard from '../../Components/ListItemCard';
import BotonComponent from '../../Components/BotonComponent'; // Reutilizando BotonComponent

export default function ListarPacientes() {
  const navigation = useNavigation();

  const [pacientes, setPacientes] = useState([
    { id: 'P001', nombre: 'Carlos', apellido: 'García', fechaNacimiento: '1990-01-15', genero: 'Masculino', telefono: '555-1111', email: 'carlos.g@example.com', direccion: 'Calle 1 # 2-34', fechaRegistro: '2023-01-01', ultimaActualizacion: '2024-06-20' },
    { id: 'P002', nombre: 'María', apellido: 'López', fechaNacimiento: '1985-07-22', genero: 'Femenino', telefono: '555-2222', email: 'maria.l@example.com', direccion: 'Carrera 5 # 6-78', fechaRegistro: '2023-02-10', ultimaActualizacion: '2024-06-18' },
    { id: 'P003', nombre: 'Pedro', apellido: 'Ramírez', fechaNacimiento: '2000-03-01', genero: 'Masculino', telefono: '555-3333', email: 'pedro.r@example.com', direccion: 'Avenida 10 # 11-12', fechaRegistro: '2023-03-05', ultimaActualizacion: '2024-06-15' },
    { id: 'P004', nombre: 'Laura', apellido: 'Martínez', fechaNacimiento: '1992-11-05', genero: 'Femenino', telefono: '555-4444', email: 'laura.m@example.com', direccion: 'Diagonal 15 # 16-17', fechaRegistro: '2023-04-20', ultimaActualizacion: '2024-06-10' },
  ]);

  const renderPacienteItem = ({ item }) => (
    <ListItemCard
      title={`${item.nombre} ${item.apellido}`}
      description={`Teléfono: ${item.telefono}`}
      iconName="body-outline"
      iconColor="#FF6347"
      onPress={() => navigation.navigate('DetallePaciente', { paciente: item })}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listado de Pacientes</Text>
      <Text style={styles.subtitle}>Aquí aparecerán todos los pacientes registrados</Text>

      <FlatList
        data={pacientes}
        renderItem={renderPacienteItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyListText}>No hay pacientes registrados.</Text>}
      />

      <BotonComponent
        title="Agregar Paciente"
        onPress={() => navigation.navigate("EditarPaciente")}
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
    backgroundColor: '#28A745',
  },
});