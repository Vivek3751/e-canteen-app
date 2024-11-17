import React, { useContext, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { OrderContext, OrderContextProps } from '../contexts/OrderContext';
import { RootStackParamList } from '../App'; // Import the navigation type

type StudentViewNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Student'>;

export default function StudentView() {
  const navigation = useNavigation<StudentViewNavigationProp>();
  const { menuItems, placeOrder, orders } = useContext(OrderContext) as OrderContextProps;
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleAddToCart = (item: string) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems((prev) => [...prev, item]);
    }
  };

  const handlePlaceOrder = () => {
    if (selectedItems.length > 0) {
      placeOrder(selectedItems);
      setSelectedItems([]);
    }
  };

  const liveOrders = orders.filter(
    (order) => order.status === 'Received' || order.status === 'Prepared'
  );
  const pastOrders = orders.filter((order) => order.status === 'Picked');

  return (
    <View style={styles.container}>
      <Button title="Go to Admin View" onPress={() => navigation.navigate('Admin')} />

      <Text style={styles.header}>Menu List</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.menuItem} onPress={() => handleAddToCart(item)}>
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.cart}>
        <Text style={styles.header}>Selected Items</Text>
        <FlatList
          data={selectedItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Text>{item}</Text>
            </View>
          )}
        />
        <Button title="Place Order" onPress={handlePlaceOrder} />
      </View>

      <View style={styles.statusSection}>
        <Text style={styles.header}>Live Orders</Text>
        <FlatList
          data={liveOrders}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.orderItem}>
              <Text>Items: {item.items.join(', ')}</Text>
              <Text>Status: {item.status}</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.statusSection}>
        <Text style={styles.header}>Past Orders</Text>
        <FlatList
          data={pastOrders}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.orderItem}>
              <Text>Items: {item.items.join(', ')}</Text>
              <Text>Status: {item.status}</Text>
            </View>
          )}
        />
      </View>
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
    padding: 10,
    backgroundColor: '#e0f7fa',
    marginVertical: 5,
    borderRadius: 5,
  },
  cart: {
    marginTop: 16,
  },
  cartItem: {
    padding: 8,
    backgroundColor: '#ffecb3',
    marginVertical: 5,
    borderRadius: 5,
  },
  statusSection: {
    marginTop: 16,
  },
  orderItem: {
    padding: 8,
    backgroundColor: '#c8e6c9',
    marginVertical: 5,
    borderRadius: 5,
  },
});
