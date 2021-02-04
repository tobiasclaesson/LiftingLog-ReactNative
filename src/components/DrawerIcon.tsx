import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicon from "react-native-vector-icons/Ionicons";
import colors from "../utils/colors";
import { StackHeaderLeftButtonProps } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "../navigation/appstack";

interface Props {}

const DrawerIcon: FC<StackHeaderLeftButtonProps> = (props) => {
  const {} = props;
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  return (
    <TouchableOpacity
      onPress={() => navigation.openDrawer()}
      containerStyle={styles.container}
    >
      <Ionicon name="md-menu-outline" size={35} color={colors.white} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 20,
    padding: 5,
  },
});

export default DrawerIcon;
