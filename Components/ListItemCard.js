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
  onEdit,
  onDelete,
  onLongPress, // Añadimos onLongPress para que sea una prop válida
  extraContent,
  style
}) => {
  return (
    <TouchableOpacity
      style={[styles.itemCard, style]}
      onPress={onPress}
      onLongPress={onLongPress} // Se pasa la prop al TouchableOpacity
      activeOpacity={0.7}
    >
      <View style={styles.itemContent}>
        <Ionicons name={iconName} size={24} color={iconColor} style={styles.itemIcon} />
        
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemTitle}>{title}</Text>
          <Text style={styles.itemDescription}>{description}</Text>
          
          {/* ✅ LÓGICA CORREGIDA AQUÍ */}
          {/* Comprobamos si extraContent existe antes de renderizarlo */}
          {extraContent && (
            // No necesitamos un <View> adicional, el componente que pasemos ya lo tendrá
            <>{extraContent}</>
          )}

        </View>

        <View style={styles.actionsContainer}>
          {onEdit && (
            <TouchableOpacity style={styles.actionButton} onPress={onEdit}>
              <Ionicons name="create-outline" size={24} color="#1e3799" />
            </TouchableOpacity>
          )}
          {onDelete && (
            <TouchableOpacity style={styles.actionButton} onPress={onDelete}>
              <Ionicons name="trash-outline" size={24} color="#dc3545" />
            </TouchableOpacity>
          )}
          {!onEdit && !onDelete && <Ionicons name="chevron-forward-outline" size={20} color="#666" />}
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Tus estilos se mantienen iguales
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
    justifyContent: 'space-between',
    flex: 1,
  },
  itemIcon: {
    marginRight: 10,
  },
  itemTextContainer: {
    flex: 1,
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
    marginLeft: 10,
  },
  actionButton: {
    padding: 5,
    marginLeft: 5,
  },
});

export default ListItemCard;