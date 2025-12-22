import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { WorkerNavigator } from './workerStack';

const AppNav = () => {
  return (
    <NavigationContainer>
      <WorkerNavigator />
    </NavigationContainer>
  );
};

export default AppNav;
