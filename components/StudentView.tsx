import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { OrderContext } from '../contexts/OrderContext';

const StudentView = ({ navigation }: any) => {
  const orderContext = useContext(OrderContext);

  if (!orderContext) {
    return <Text>Loading...</Text>;
  }

  const { menuItems, placeOrder } = orderContext;

  // State for managing cart items
  const [cart, setCart] = useState<string[]>([]);

  // Handle adding items to the cart
  const handleAddToCart = (item: string) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  // Handle removing an item from the cart
  const handleRemoveFromCart = (item: string) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem !== item));
  };

  // Handle placing the order
  const handlePlaceOrder = () => {
    if (cart.length > 0) {
      placeOrder(cart); // Call the context function to place the order
      setCart([]); // Clear the cart after placing the order
      alert('Order placed successfully!');
    } else {
      alert('Please add items to your cart before placing an order.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Student View</Text>
      <Text style={styles.subHeader}>Menu:</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.menuItemContainer}>
            <Text style={styles.menuItemText}>{item}</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(item)}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Text style={styles.subHeader}>Cart:</Text>
      {cart.length > 0 ? (
        <FlatList
          data={cart}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.cartItemContainer}>
              <Text style={styles.cartItemText}>{item}</Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveFromCart(item)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      )}
      <View style={styles.placeOrderButtonContainer}>
        <Button title="Place Order" onPress={handlePlaceOrder} />
      </View>
      <View style={styles.navigationButtonContainer}>
        <Button title="Go to Admin View" onPress={() => navigation.navigate('Admin')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  menuItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  menuItemText: {
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cartItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cartItemText: {
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyCartText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#888',
  },
  placeOrderButtonContainer: {
    marginVertical: 20,
  },
  navigationButtonContainer: {
    marginTop: 10,
  },
});

export default StudentView;
