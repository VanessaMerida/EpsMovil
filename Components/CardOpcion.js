// Src/Components/CardOpcion.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// Asegúrate de importar los iconos necesarios aquí si no los pasas como prop
// import { Ionicons } from '@expo/vector-icons'; // Si 'icon' es solo un nombre de string y lo quieres construir aquí

const CardOpcion = ({ icon, title, description, onPress, iconBgColor }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={[styles.cardIconContainer, { backgroundColor: iconBgColor }]}>
        {icon} {/* El icono se pasa directamente como un elemento JSX */}
      </View>
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
    padding: 15,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 90,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  cardIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cardTextContent: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
    textAlign: 'left',
  },
  cardDescription: {
    fontSize: 11,
    color: '#777',
    textAlign: 'left',
  },
});

export default CardOpcion;