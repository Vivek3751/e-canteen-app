import React, { useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { OrderContext, OrderContextProps } from '../contexts/OrderContext';

export default function AdminView() {
  const { menuItems, orders, updateOrderStatus, addMenuItem, editMenuItem, deleteMenuItem } =
    useContext(OrderContext) as OrderContextProps;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Menu Management</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.menuItem}>
            <Text>{item}</Text>
            <Button title="Edit" onPress={() => editMenuItem(index, `${item} (Updated)`)} />
            <Button title="Delete" onPress={() => deleteMenuItem(index)} />
          </View>
        )}
      />
      <Button title="Add Menu Item" onPress={() => addMenuItem('New Dish')} />

      <Text style={styles.header}>Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.orderItem}>
            <Text>Items: {item.items.join(', ')}</Text>
            <Text>Status: {item.status}</Text>
            <Button
              title={`Update to ${
                item.status === 'Received'
                  ? 'Prepared'
                  : item.status === 'Prepared'
                  ? 'Picked'
                  : 'Received'
              }`}
              onPress={() => updateOrderStatus(index)}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#e0f7fa',
    borderRadius: 5,
  },
  orderItem: {
    padding: 10,
    backgroundColor: '#c8e6c9',
    marginVertical: 5,
    borderRadius: 5,
  },
});
