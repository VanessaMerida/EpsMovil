// Screen/Medicos/ListarMedicos.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ListItemCard from '../../Components/ListItemCard';
import BotonComponent from '../../Components/BotonComponent';
import { listarMedicos, eliminarMedico } from '../../Src/Services/MedicosService';
import { getUser } from '../../Src/Services/AuthService'; // 1. Importar el servicio de usuario

export default function ListarMedicos() {
    const navigation = useNavigation();

    // Estados para la lista, carga, errores y rol
    const [medicos, setMedicos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userRole, setUserRole] = useState(null); // 2. Nuevo estado para el rol

    const handleCargarDatos = async () => {
        setLoading(true);
        setError(null);
        try {
            // Cargar datos en paralelo
            const [medicosResult, userResult] = await Promise.all([
                listarMedicos(),
                getUser()
            ]);
            
            if (medicosResult.success) {
                setMedicos(medicosResult.data);
            } else {
                Alert.alert('Error', medicosResult.message || 'No se pudieron cargar los médicos.');
            }

            if (userResult.success) {
                setUserRole(userResult.user.role);
            } else {
                Alert.alert('Error', 'No se pudo verificar el rol del usuario.');
            }

        } catch (err) {
            Alert.alert('Error', 'Error de conexión.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleCargarDatos);
        return unsubscribe;
    }, [navigation]);

    // 3. Lógica para eliminar un médico
    // Se muestra un mensaje de confirmación antes de eliminar
    // y se cambia el rol del usuario a 'user' al eliminar
    const handleEliminar = (medico) => {
        Alert.alert(
            'Confirmar Acción',
            `¿Estás seguro de que deseas eliminar el perfil del Dr(a). ${medico.nombres} ${medico.apellidos}? Su cuenta de usuario será revertida a 'user'.`,
            [
                { text: 'Cancelar' },
                {
                    text: 'Sí, eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        const result = await eliminarMedico(medico.id);
                        if (result.success) {
                            Alert.alert('Éxito', 'Perfil de médico eliminado.');
                            handleCargarDatos();
                        } else {
                            Alert.alert('Error', result.message);
                        }
                    }
                },
            ]
        );
    };

    const renderMedicoItem = ({ item }) => (
        <ListItemCard
            title={`${item.nombres} ${item.apellidos}`}
            description={`Documento: ${item.documento}`}
            iconName="person-outline"
            iconColor="#4CAF50"
            onPress={() => navigation.navigate('DetalleMedico', { medico: item })}
            // 3. ✅ LÓGICA CONDICIONAL PARA LOS ICONOS
            // Solo se muestran si el rol es 'administrador'
            onEdit={userRole === 'administrador' ? () => navigation.navigate('EditarMedico', { medico: item }) : null}
            onDelete={userRole === 'administrador' ? () => handleEliminar(item) : null}
        />
    );

    if (loading && medicos.length === 0) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#4CAF50" />
                <Text>Cargando médicos...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Listado de Médicos</Text>
            <Text style={styles.subtitle}>Aquí aparecerá el listado de médicos registrados</Text>

            {error && <Text style={styles.errorMessage}>{error}</Text>}

            <FlatList
                data={medicos}
                renderItem={renderMedicoItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={<Text style={styles.emptyListText}>No hay médicos registrados.</Text>}
                onRefresh={handleCargarDatos}
                refreshing={loading}
            />

            {/* 4. ✅ LÓGICA CONDICIONAL PARA EL BOTÓN DE AGREGAR */}
            {userRole === 'administrador' && (
                <BotonComponent
                    title="Agregar Médico"
                    onPress={() => navigation.navigate("AgregarMedico")}
                    style={styles.addButton}
                    iconName="add-circle-outline"
                    iconColor="#fff"
                />
            )}
        </View>
    );
}

// Tus estilos se mantienen iguales
const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5', },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#333' },
    subtitle: { fontSize: 16, color: '#666', marginBottom: 20 },
    errorMessage: { color: 'red', textAlign: 'center', marginBottom: 10 },
    listContent: { paddingBottom: 80, },
    emptyListText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#999' },
    addButton: { position: 'absolute', bottom: 20, right: 20, backgroundColor: '#28A745' },
});