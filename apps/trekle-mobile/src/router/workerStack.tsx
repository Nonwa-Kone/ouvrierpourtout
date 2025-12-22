import { MaterialIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Divider,
  HeaderButton,
  HeaderButtonProps,
  HeaderButtons,
  HiddenItem,
  HiddenItemProps,
  Item,
  ItemProps,
  OverflowMenu,
} from 'react-navigation-header-buttons';
import { globalStyle } from '../../styles/globalStyle';
import WorkerDetailScreen from '../screens/WorkerDetail';
import { TabsNavigatorWorkers } from './TabsNavigator';

const StackWorkerNavigator = createStackNavigator();

const MaterialHeaderButton = (props: HeaderButtonProps) => (
  // the `props` here come from <Item ... />
  // you may access them and pass something else to `HeaderButton` if you like
  <HeaderButton IconComponent={MaterialIcons} iconSize={23} {...props} />
);

const EditItem = ({ onPress }: Pick<ItemProps, 'onPress'>) => {
  return <Item title='edit' onPress={onPress} />;
};

const ReusableHiddenItem = ({ onPress }: Pick<HiddenItemProps, 'onPress'>) => (
  <HiddenItem title='hidden2' onPress={onPress} disabled />
);

export const WorkerNavigator = () => {
  return (
    <StackWorkerNavigator.Navigator
      screenOptions={({ route, navigation }) => ({
        headerStyle: {
          backgroundColor: globalStyle.primary,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTintColor: globalStyle.white,
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
            <Item
              title='Ajouter'
              iconName='add'
              color={globalStyle.white}
              onPress={() => navigation.navigate('AddWorker')}
            />
            <OverflowMenu
              OverflowIcon={({ color = '#fff' }) => (
                <MaterialIcons name='more-horiz' size={23} color={color} />
              )}
            >
              <HiddenItem title='hidden1' onPress={() => alert('hidden1')} />
              <Divider />
              <ReusableHiddenItem onPress={() => alert('hidden2')} />
            </OverflowMenu>
            {/* Avatar */}
            <Item
              title='Avatar'
              iconName='account-circle'
              color={globalStyle.white}
              onPress={() => alert('Avatar')}
            />
          </HeaderButtons>
        ),
      })}
    >
      <StackWorkerNavigator.Screen
        name='Workers'
        component={TabsNavigatorWorkers}
      />
      <StackWorkerNavigator.Screen
        name='WorkerDetail'
        component={WorkerDetailScreen}
      />
    </StackWorkerNavigator.Navigator>
  );
};
