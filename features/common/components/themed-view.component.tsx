import { View, type ViewProps } from 'react-native';

import { ThemeColor } from '@/features/common/lib/theme.lib';
import { useTheme } from '@/features/common/hooks/use-theme.hook';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  type?: ThemeColor;
};

export function ThemedView({ style, lightColor, darkColor, type, ...otherProps }: ThemedViewProps) {
  const theme = useTheme();

  return <View style={[{ backgroundColor: theme[type ?? 'background'] }, style]} {...otherProps} />;
}
