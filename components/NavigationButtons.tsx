import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App"; // Assuming you define this in App.tsx or a shared types file.

type NavigationButtonsProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, any>;
};

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ navigation }) => {
  return (
    <View style={styles.navButtons}>
      <Button title="Go to Admin View" onPress={() => navigation.navigate("Admin")} />
      <Button title="Go to Student View" onPress={() => navigation.navigate("Student")} />
    </View>
  );
};

const styles = StyleSheet.create({
  navButtons: { flexDirection: "row", justifyContent: "space-around", marginBottom: 10 },
});

export default NavigationButtons;
