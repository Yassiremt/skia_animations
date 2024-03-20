import React from 'react';
import {RoundedRect} from '@shopify/react-native-skia';
import {SharedValue, useDerivedValue} from 'react-native-reanimated';

type Props = {
  positions: {
    firstPosition: number;
    secondPosition: number;
    thirdPosition: number;
  };
  currentPosition: SharedValue<number>;
};

const Progress = ({positions, currentPosition}: Props) => {
  const {firstPosition, secondPosition, thirdPosition} = positions;
  const leftColorProgress = useDerivedValue(
    () => (currentPosition.value === firstPosition ? 'black' : 'gray'),
    [currentPosition],
  );
  const centerColorProgress = useDerivedValue(
    () => (currentPosition.value === secondPosition ? 'black' : 'gray'),
    [currentPosition],
  );
  const RightColorProgress = useDerivedValue(
    () => (currentPosition.value === thirdPosition ? 'black' : 'gray'),
    [currentPosition],
  );
  return (
    <>
      <RoundedRect
        x={firstPosition}
        y={0}
        width={8}
        height={35}
        r={35 / 2}
        color={leftColorProgress}
      />
      <RoundedRect
        x={secondPosition}
        y={0}
        width={8}
        height={35}
        r={35 / 2}
        color={centerColorProgress}
      />
      <RoundedRect
        x={thirdPosition}
        y={0}
        width={8}
        height={35}
        r={35 / 2}
        color={RightColorProgress}
      />
    </>
  );
};

export default Progress;
