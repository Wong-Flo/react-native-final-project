import { Tabs } from 'expo-router';
import { colors } from '../../constants/colors';
import { TabBarIcon } from '../Components/TabBarIcon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.iconBackground,
        headerTitleAlign: 'center',
        tabBarStyle: {
          height: 70,

          paddingBottom: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) =>
            TabBarIcon({
              name: focused ? 'house-chimney' : 'house',
              color,
            }),
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          title: 'Category',
          tabBarIcon: ({ color, focused }) =>
            TabBarIcon({
              name: focused ? 'folder-open' : 'folder-closed',
              color,
            }),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Add',
          tabBarIcon: ({ color, focused }) =>
            TabBarIcon({
              name: focused ? 'plus' : 'add',
              color,
            }),
        }}
      />
      <Tabs.Screen
        name="logoutScreen"
        options={{
          title: 'Logout',
          tabBarIcon: ({ color, focused }) =>
            TabBarIcon({
              name: focused ? 'user-large-slash' : 'user-tie',
              color,
            }),
        }}
      />
    </Tabs>
  );
}
