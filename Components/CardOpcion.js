// Components/CardOpcion.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CardOpcion = ({ icon, title, description, onPress, iconBgColor }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Contenedor del Ícono */}
      <View style={[styles.cardIconContainer, { backgroundColor: iconBgColor }]}>
        {icon}
      </View>
      
      {/* Contenedor del Texto */}
      <View style={styles.cardTextContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16, // Un padding consistente
    marginBottom: 18,
    flexDirection: 'row', // El ícono y el texto se alinean horizontalmente
    alignItems: 'center', // Alinea verticalmente el ícono con el bloque de texto
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  cardIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16, // Separación entre el ícono y el texto
  },
  // ✅ ESTILO CLAVE CORREGIDO
  cardTextContent: {
    // flex: 1 le dice al contenedor que ocupe todo el espacio horizontal restante.
    flex: 1,
    // flexShrink: 1 (que está implícito en flex: 1) permite que el contenedor se 
    // ajuste y que el texto dentro pueda dividirse en varias líneas correctamente.
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#3C4043',
    marginBottom: 4, // Espacio entre título y descripción
  },
  cardDescription: {
    fontSize: 12,
    color: '#5F6368',
    lineHeight: 20, // Espacio entre líneas de la descripción para mejor legibilidad
    // El texto se ajustará automáticamente (wrap) porque es el comportamiento por defecto.
  },
});

export default CardOpcion;