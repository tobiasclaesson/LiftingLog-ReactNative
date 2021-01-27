import React, { FC } from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface Props {
  placeholder: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

const TextInputField: FC<Props> = (props) => {
  const { placeholder, onChangeText, secureTextEntry } = props;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        onChangeText={(text) => onChangeText(text)}
        secureTextEntry={secureTextEntry || false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#e3e3e3",
    borderRadius: 5,
    marginVertical: 5,
  },
  textInput: { padding: 15 },
});

export default TextInputField;
