import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { globalStyle } from '../../styles/globalStyle';
import RequestService from '../screens/RequestService';
import WorkersScreen from '../screens/Workers';

const Tab = createBottomTabNavigator();

export function TabsNavigatorWorkers() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: globalStyle.primary,
        tabBarInactiveBackgroundColor: globalStyle.white,
        tabBarActiveTintColor: globalStyle.white,

        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTintColor: globalStyle.white,
      }}
    >
      <Tab.Screen
        name='Workers'
        component={WorkersScreen}
        options={{
          tabBarLabel: 'Mes travaux',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name='people' size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='RequestService'
        component={RequestService}
        options={{
          tabBarLabel: 'Demande de service',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name='home-repair-service' size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
