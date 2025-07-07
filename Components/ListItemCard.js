// Src/Components/ListItemCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const ListItemCard = ({
  title,
  description,
  iconName,
  iconColor,
  onPress,
  onEdit,   // Nueva prop para la acción de editar
  onDelete, // Nueva prop para la acción de eliminar
  extraContent,
  style
}) => {
  return (
    <TouchableOpacity
      style={[styles.itemCard, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.itemContent}>
        {/* Icono principal de la tarjeta */}
        <Ionicons name={iconName} size={24} color={iconColor} style={styles.itemIcon} />
        
        {/* Contenedor de texto */}
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemTitle}>{title}</Text>
          <Text style={styles.itemDescription}>{description}</Text>
          {extraContent && <View>{extraContent}</View>} 
        </View>

        {/* Contenedor de acciones: Editar y Eliminar */}
        <View style={styles.actionsContainer}>
          {onEdit && ( // Renderiza el botón de editar solo si se proporciona la función onEdit
            <TouchableOpacity style={styles.actionButton} onPress={onEdit}>
              <Ionicons name="create-outline" size={24} color="#1e3799" /> {/* Color azul para editar */}
            </TouchableOpacity>
          )}
          {onDelete && ( // Renderiza el botón de eliminar solo si se proporciona la función onDelete
            <TouchableOpacity style={styles.actionButton} onPress={onDelete}>
              <Ionicons name="trash-outline" size={24} color="#dc3545" /> {/* Color rojo para eliminar */}
            </TouchableOpacity>
          )}
          {/* Icono de flecha para navegación, si no hay botones de acción o si se desea mantener */}
          {!onEdit && !onDelete && <Ionicons name="chevron-forward-outline" size={20} color="#666" />}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Asegura espacio entre contenido y acciones
    flex: 1, // Permite que el contenido ocupe el espacio disponible
  },
  itemIcon: {
    marginRight: 10,
  },
  itemTextContainer: {
    flex: 1, // Permite que el texto ocupe el espacio restante
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  itemDescription: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10, // Espacio entre el texto y los botones de acción
  },
  actionButton: {
    padding: 5, // Espacio alrededor del icono para facilitar el toque
    marginLeft: 5, // Espacio entre los botones de acción
  },
});

export default ListItemCard;
