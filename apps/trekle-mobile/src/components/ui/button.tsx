import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface IButtonProps {
  label: string;
  onHandlePress: () => void;
  iconName?: any;
  color?: string;
}

function ButtonCustom({ label, onHandlePress, iconName, color }: IButtonProps) {
  return (
    <TouchableOpacity onPress={onHandlePress}>
      <View style={styles.container}>
        {/* Icône */}
        {iconName && <MaterialIcons name={iconName} size={30} color={color} />}
        {/* Label */}
        <Text>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    height: 50,
    width: '100%',
    borderRadius: 10,
    marginVertical: 10,
  },
});

export default ButtonCustom;
