import React, { useContext, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, Button, TextInput } from "react-native";
import { RootStackParamList } from "../App";  // import RootStackParamList
import { OrderContext } from "../contexts/OrderContext";  // import your OrderContext

type StudentViewProps = NativeStackScreenProps<RootStackParamList, "Student">;

const StudentView: React.FC<StudentViewProps> = ({ navigation }) => {
  // Get the context value
  const { addOrder, menuItems } = useContext(OrderContext) || {}; // Check context is not undefined
  const [newOrder, setNewOrder] = useState("");

  if (!addOrder || !menuItems) {
    return <Text>Loading...</Text>;  // Return loading state if context is not available
  }

  const handleOrderSubmit = () => {
    addOrder(newOrder);
    setNewOrder("");
  };

  return (
    <View>
      <Text>Student View</Text>

      {/* Display Menu Items */}
      <Text>Menu:</Text>
      {menuItems.map((item: string, index: number) => (
        <Text key={index}>{item}</Text> // Add types for 'item' and 'index'
      ))}

      {/* Order Form */}
      <TextInput
        placeholder="Enter order"
        value={newOrder}
        onChangeText={setNewOrder}
      />
      <Button title="Place Order" onPress={handleOrderSubmit} />

      {/* Navigate to Admin View */}
      <Button title="Go to Admin View" onPress={() => navigation.navigate("Admin")} />
    </View>
  );
};

export default StudentView;
