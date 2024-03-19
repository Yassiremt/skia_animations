import React from 'react';
import {colors} from '../colors';
import {Group, RoundedRect, Shadow} from '@shopify/react-native-skia';
import {
  SharedValue,
  interpolate,
  interpolateColor,
  useDerivedValue,
} from 'react-native-reanimated';

type Props = {
  cardWidth: number;
  cardHeight: number;
  currentPosition: SharedValue<number>;
  positions: {
    firstPosition: number;
    secondPosition: number;
    thirdPosition: number;
  };
};

const Mouth = ({cardWidth, cardHeight, currentPosition, positions}: Props) => {
  const {firstPosition, secondPosition, thirdPosition} = positions;

  const mouthWidth = useDerivedValue(() =>
    interpolate(
      currentPosition.value,
      [firstPosition, secondPosition, thirdPosition],
      [90, 25, 120],
    ),
  );
  const mouthHeight = useDerivedValue(() =>
    interpolate(
      currentPosition.value,
      [firstPosition, secondPosition, thirdPosition],
      [20, 50, 30],
    ),
  );
  const teethOpacity = useDerivedValue(() =>
    interpolate(
      currentPosition.value,
      [firstPosition, secondPosition, thirdPosition],
      [0, 0, 1],
    ),
  );
  const animatedShadowColor = useDerivedValue(() =>
    interpolateColor(
      currentPosition.value,
      [firstPosition, secondPosition, thirdPosition],
      [colors.redShadow, colors.yellowShadow, colors.greenShadow],
    ),
  );
  const toothHeight = 8;
  const toothWidth = 10;
  const firstToothX = cardWidth / 3 + 30;

  return (
    <Group>
      {/* Inside area in mouth */}
      <Group>
        <RoundedRect
          x={cardWidth / 3}
          y={cardHeight / 1.6}
          width={mouthWidth}
          height={mouthHeight}
          r={40}
          color={colors.black}
        />
        <Shadow dx={7} dy={8} blur={6} color={animatedShadowColor} />
      </Group>

      {/* Theeth */}
      <Group opacity={teethOpacity}>
        {/* Theeth on top */}
        <Group>
          {[0, 1, 2, 3].map(v => (
            <RoundedRect
              key={v}
              x={firstToothX + v * 8 * 1.7}
              y={352}
              width={toothWidth}
              height={toothHeight}
              color={colors.white}
              r={2}
            />
          ))}
        </Group>
        {/* Theeth on bottom */}
        <Group>
          {[0, 1, 2, 3].map(v => (
            <RoundedRect
              key={v}
              x={firstToothX + v * 8 * 1.7}
              y={363}
              width={toothWidth}
              height={toothHeight}
              color={colors.white}
              r={2}
            />
          ))}
        </Group>
      </Group>

      {/* Lips */}
      <Group>
        <RoundedRect
          x={cardWidth / 3}
          y={cardHeight / 1.6}
          width={mouthWidth}
          height={mouthHeight}
          r={40}
          color={colors.white}
          strokeWidth={13}
          style={'stroke'}
        />
        <Shadow dx={-3} dy={-6} blur={2} color={animatedShadowColor} inner />
      </Group>
    </Group>
  );
};

export default Mouth;
