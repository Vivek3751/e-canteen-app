import React, { useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { OrderContext } from '../contexts/OrderContext';

const AdminView = ({ navigation }: any) => {
  const { orders, updateOrderStatus, menuItems }: any = useContext(OrderContext);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Admin View</Text>

      <Text style={styles.subHeading}>Menu:</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.menuItem}>{item}</Text>}
      />

      <Text style={styles.subHeading}>Orders:</Text>
      <FlatList
        data={orders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text>Order: {item.name}</Text>
            <Text>Status: {item.status}</Text>
            <Button
              title="Update to Picked"
              onPress={() => updateOrderStatus(item.id, 'Picked')}
            />
          </View>
        )}
      />

      <Button
        title="Go to Student View"
        onPress={() => navigation.navigate('Student')}
        color="#007BFF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  menuItem: {
    fontSize: 16,
    marginVertical: 4,
  },
  orderItem: {
    padding: 8,
    backgroundColor: '#f9f9f9',
    marginVertical: 8,
    borderRadius: 8,
  },
});

export default AdminView;
