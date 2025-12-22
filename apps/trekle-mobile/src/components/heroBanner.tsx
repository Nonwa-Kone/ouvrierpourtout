import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import HeroBannerItem from './heroBannerItem';

export default function HeroBanner() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.heroBanner}
    >
      <HeroBannerItem label='Tout type de travaux domestiques' />
      <HeroBannerItem label='Tout type de travaux domestiques' />
      <HeroBannerItem label='Bricolage' />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heroBanner: {
    flexDirection: 'row',
  },
});
