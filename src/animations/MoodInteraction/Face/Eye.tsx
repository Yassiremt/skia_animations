import React from 'react';
import {Circle, Group, Shadow} from '@shopify/react-native-skia';
import {
  SharedValue,
  interpolate,
  interpolateColor,
  useDerivedValue,
} from 'react-native-reanimated';
import {colors} from '../colors';

type Props = {
  currentPosition: SharedValue<number>;
  positions: {
    firstPosition: number;
    secondPosition: number;
    thirdPosition: number;
  };
  eyeX: number;
  eyeY: number;
};

const Eye = ({currentPosition, positions, eyeX, eyeY}: Props) => {
  const {firstPosition, secondPosition, thirdPosition} = positions;

  const bigCircleRadius = useDerivedValue(() =>
    interpolate(
      currentPosition.value,
      [firstPosition, secondPosition, thirdPosition],
      [50, 60, 65],
    ),
  );
  const mediumCircleRadius = useDerivedValue(() =>
    interpolate(
      currentPosition.value,
      [firstPosition, secondPosition, thirdPosition],
      [12, 13, 20],
    ),
  );
  const smallCircleRadius = useDerivedValue(() =>
    interpolate(
      currentPosition.value,
      [firstPosition, secondPosition, thirdPosition],
      [2, 4, 5],
    ),
  );
  const mediumCircleX = useDerivedValue(() =>
    interpolate(
      currentPosition.value,
      [firstPosition, secondPosition, thirdPosition],
      [eyeX, eyeX - 20, eyeX],
    ),
  );
  const mediumCircleY = useDerivedValue(() =>
    interpolate(
      currentPosition.value,
      [firstPosition, secondPosition, thirdPosition],
      [200, 200 - 20, 200 + 20],
    ),
  );
  const smallCircleX = useDerivedValue(() =>
    interpolate(
      currentPosition.value,
      [firstPosition, secondPosition, thirdPosition],
      [eyeX, eyeX - 24, eyeX - 5],
    ),
  );
  const smallCircleY = useDerivedValue(() =>
    interpolate(
      currentPosition.value,
      [firstPosition, secondPosition, thirdPosition],
      [200, 200 - 24, 200 + 15],
    ),
  );

  const animatedShadowColor = useDerivedValue(() =>
    interpolateColor(
      currentPosition.value,
      [firstPosition, secondPosition, thirdPosition],
      [colors.redShadow, colors.yellowShadow, colors.greenShadow],
    ),
  );

  return (
    <Group>
      <Group>
        <Circle
          cx={eyeX}
          cy={eyeY}
          r={bigCircleRadius}
          color={colors.eyeWhite}
        />
        <Shadow dx={7} dy={8} blur={6} color={animatedShadowColor} />
        <Shadow dx={-3} dy={-6} blur={4} color={animatedShadowColor} inner />
      </Group>
      <Circle
        cx={mediumCircleX}
        cy={mediumCircleY}
        r={mediumCircleRadius}
        color={colors.eyeBlack}
      />
      <Circle
        cx={smallCircleX}
        cy={smallCircleY}
        r={smallCircleRadius}
        color={colors.eyeWhite}
      />
    </Group>
  );
};

export default Eye;
