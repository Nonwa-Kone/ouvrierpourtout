import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { globalStyle } from '../../styles/globalStyle';
import HeroBanner from '../components/heroBanner';
import ListWorkers from '../components/ListWorkers';

const WorkersScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.bannerContainer}>
        <HeroBanner />
      </View>
      {/* Liste des workers */}
      <ListWorkers navigation={navigation} />
      <StatusBar
        backgroundColor={globalStyle.primary}
        barStyle={'light-content'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerContainer: {
    height: '20%',
  },
});

export default WorkersScreen;
