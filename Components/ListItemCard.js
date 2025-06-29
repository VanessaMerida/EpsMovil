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
        <Ionicons name={iconName} size={24} color={iconColor} style={styles.itemIcon} />
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemTitle}>{title}</Text>
          <Text style={styles.itemDescription}>{description}</Text>
          {extraContent && <View>{extraContent}</View>} 
        </View>
        <Ionicons name="chevron-forward-outline" size={20} color="#666" />
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
    justifyContent: 'space-between',
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
});

export default ListItemCard;