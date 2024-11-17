import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TextInput } from 'react-native';
import { OrderContext } from '../contexts/OrderContext';

const AdminView = ({ navigation }: any) => {
  const orderContext = useContext(OrderContext);

  if (!orderContext) {
    return <Text>Loading...</Text>;
  }

  const { menuItems, orders, addMenuItem, editMenuItem, deleteMenuItem, updateOrderStatus } =
    orderContext;

  // Local state for adding new menu items
  const [newMenuItem, setNewMenuItem] = React.useState('');
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
  const [editingText, setEditingText] = React.useState('');

  const handleAddMenuItem = () => {
    if (newMenuItem.trim()) {
      addMenuItem(newMenuItem.trim());
      setNewMenuItem('');
    } else {
      alert('Menu item cannot be empty.');
    }
  };

  const handleEditMenuItem = (index: number) => {
    if (editingText.trim()) {
      editMenuItem(index, editingText.trim());
      setEditingIndex(null);
      setEditingText('');
    } else {
      alert('Menu item cannot be empty.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin View</Text>
      <Text style={styles.subHeader}>Menu Management:</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.menuItemContainer}>
            {editingIndex === index ? (
              <>
                <TextInput
                  style={styles.input}
                  value={editingText}
                  onChangeText={setEditingText}
                  placeholder="Edit menu item"
                />
                <Button title="Save" onPress={() => handleEditMenuItem(index)} />
                <Button title="Cancel" onPress={() => setEditingIndex(null)} />
              </>
            ) : (
              <>
                <Text style={styles.menuItemText}>{item}</Text>
                <Button title="Edit" onPress={() => setEditingIndex(index)} />
                <Button title="Delete" onPress={() => deleteMenuItem(index)} />
              </>
            )}
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        value={newMenuItem}
        onChangeText={setNewMenuItem}
        placeholder="Add new menu item"
      />
      <Button title="Add Item" onPress={handleAddMenuItem} />

      <Text style={styles.subHeader}>Orders:</Text>
      <FlatList
        data={orders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.orderContainer}>
            <Text>Order: {item.items.join(', ')}</Text>
            <Text>Status: {item.status}</Text>
            <Button title="Update Status" onPress={() => updateOrderStatus(index)} />
          </View>
        )}
      />
      <Button title="Go to Student View" onPress={() => navigation.navigate('Student')} />
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  orderContainer: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default AdminView;
