import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, Button } from "react-native";
import { RootStackParamList } from "../App";  // import RootStackParamList

type AdminViewProps = NativeStackScreenProps<RootStackParamList, "Admin">;

const AdminView: React.FC<AdminViewProps> = ({ navigation }) => {
  return (
    <View>
      <Text>Admin View</Text>
      {/* Your Admin View content */}
      <Button title="Go to Student View" onPress={() => navigation.navigate("Student")} />
    </View>
  );
};

export default AdminView;
