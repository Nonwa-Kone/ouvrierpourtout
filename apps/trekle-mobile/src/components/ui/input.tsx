import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface IProps extends React.PropsWithChildren {
  label: string;
  onHandlePress: () => void;
}

const Input = ({ label, onHandlePress }: IProps) => {
  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <TextInput
        placeholder='Saisissez votre nom'
        style={styles.input}
        inlineImageLeft='search_icon'
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 10,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  input: {
    height: 50,
    width: '100%',
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 1,
  },
});
