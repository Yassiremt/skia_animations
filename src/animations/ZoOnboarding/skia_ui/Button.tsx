import {useWindowDimensions} from 'react-native';
import React from 'react';
import {
  FitBox,
  Group,
  LinearGradient,
  Path,
  RoundedRect,
  Skia,
  rect,
} from '@shopify/react-native-skia';
import {
  SharedValue,
  interpolateColor,
  useDerivedValue,
} from 'react-native-reanimated';

type Props = {yValue: SharedValue<number>};

const Button = ({yValue}: Props) => {
  const {width, height} = useWindowDimensions();
  const size = 75;
  const x = width - size - 20;
  const y = height - size - 20;
  const barPath = Skia.Path.Make();
  barPath.addRect({x, y, width: size, height: size});
  const bgColors = useDerivedValue(() => [
    interpolateColor(
      yValue.value,
      [0, 1, 2],
      ['#42825B79', '#9C301E79', '#D66E1D79'],
    ),
    interpolateColor(
      yValue.value,
      [0, 1, 2],
      ['#9BCB5379', '#DF8F6679', '#E9991E79'],
    ),
  ]);
  return (
    <Group clip={barPath}>
      <RoundedRect x={x} y={y} width={size} height={size} r={size / 2} />
      <LinearGradient start={{x, y}} end={{x: x + size, y}} colors={bgColors} />
      <FitBox
        src={rect(0, 0, size, size)}
        dst={rect(x + size / 3 + 2, y + size / 3 + 2, size, size)}>
        <Path
          origin={{x: x + size, y}}
          path="M13.0316 1.02868C12.8078 0.814866 12.5088 0.697635 12.1993 0.702281C11.8898 0.706928 11.5945 0.833078 11.3771 1.05351C11.1598 1.27395 11.0378 1.57099 11.0376 1.88055C11.0373 2.19011 11.1588 2.48736 11.3757 2.70817L17.7092 8.94967L1.58651 8.94967C1.27371 8.94967 0.973717 9.07393 0.752533 9.29512C0.531347 9.5163 0.407087 9.81629 0.407087 10.1291C0.407087 10.4419 0.531347 10.7419 0.752533 10.9631C0.973717 11.1843 1.27371 11.3085 1.58651 11.3085L17.7021 11.3085L11.3757 17.5418C11.1588 17.7626 11.0373 18.0598 11.0376 18.3694C11.0378 18.6789 11.1598 18.976 11.3771 19.1964C11.5945 19.4169 11.8898 19.543 12.1993 19.5477C12.5088 19.5523 12.8078 19.4351 13.0316 19.2213L21.1991 11.1752C21.3382 11.0381 21.4486 10.8747 21.524 10.6945C21.5994 10.5143 21.6382 10.3209 21.6382 10.1256C21.6382 9.93023 21.5994 9.73685 21.524 9.55665C21.4486 9.37645 21.3382 9.21303 21.1991 9.07587L13.0316 1.02868Z"
          color="white"
        />
      </FitBox>
    </Group>
  );
};

export default Button;
