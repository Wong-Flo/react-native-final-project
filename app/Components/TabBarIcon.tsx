import { FontAwesome6 } from '@expo/vector-icons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

export function TabBarIcon({
  style,
  color,
  name,
}: IconProps<ComponentProps<typeof FontAwesome6>['name']>) {
  return (
    <FontAwesome6
      size={32}
      style={[{ marginBottom: -3 }, style]}
      color={color}
      name={name}
    />
  );
}
