import { Tabs } from 'expo-router';
import { TabBarIcon } from '../Components/TabBarIcon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'blue',
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
        name="transaction"
        options={{
          title: 'Transaction',
          tabBarIcon: ({ color, focused }) =>
            TabBarIcon({
              name: focused ? 'receipt' : 'file-invoice-dollar',
              color,
            }),
        }}
      />
    </Tabs>
  );
}
