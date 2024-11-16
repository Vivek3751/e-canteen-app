import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { OrderContext } from '../contexts/OrderContext';

const StudentView = ({ navigation }: any) => {
  const [order, setOrder] = useState('');
  const { addOrder, menuItems }: any = useContext(OrderContext);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Student View</Text>

      <Text style={styles.subHeading}>Menu:</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.menuItem}>{item}</Text>}
      />

      <Text style={styles.subHeading}>Enter order:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter order name"
        value={order}
        onChangeText={setOrder}
      />

      <Button
        title="Place Order"
        onPress={() => {
          addOrder(order);
          setOrder('');
        }}
        color="#007BFF"
      />

      <Button
        title="Go to Admin View"
        onPress={() => navigation.navigate('Admin')}
        color="#28A745"
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
    marginBottom: 16,
  },
});

export default StudentView;
