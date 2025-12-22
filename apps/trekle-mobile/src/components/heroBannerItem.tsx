import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalStyle } from '../../styles/globalStyle';

interface IProps {
  label: string;
}

export default function HeroBannerItem(props: IProps) {
  return (
    <View style={styles.heroBannerItem}>
      <Text style={styles.heroBannerItemText}>{props.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  heroBannerItem: {
    // paddingHorizontal: 30,
    backgroundColor: globalStyle.primary,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    flex: 1,
    width: '100%',
  },
  heroBannerItemText: {
    color: globalStyle.white,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
