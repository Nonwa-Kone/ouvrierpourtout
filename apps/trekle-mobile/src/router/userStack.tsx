import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import UserProfileScreen from '../screens/UserProfile';

const UserStack = createStackNavigator();

export const userStack = () => {
  return (
    <UserStack.Navigator>
      <UserStack.Screen name='Profile' component={UserProfileScreen} />
    </UserStack.Navigator>
  );
};
