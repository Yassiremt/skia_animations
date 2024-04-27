import {useWindowDimensions} from 'react-native';
import React from 'react';
import {Fill, LinearGradient} from '@shopify/react-native-skia';
import {
  SharedValue,
  interpolateColor,
  useDerivedValue,
} from 'react-native-reanimated';

type Props = {yValue: SharedValue<number>};

const Background = ({yValue}: Props) => {
  const {height} = useWindowDimensions();
  const bgColors = useDerivedValue(() => [
    interpolateColor(
      yValue.value,
      [0, 1, 2],
      ['#42825B79', '#9C301E79', '#D66E1D79'],
    ),
    '#121010',
  ]);
  return (
    <Fill opacity={0.7}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: height}}
        colors={bgColors}
      />
    </Fill>
  );
};

export {Background};
