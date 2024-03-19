import React from 'react';
import {RoundedRect} from '@shopify/react-native-skia';
import {SharedValue, useDerivedValue} from 'react-native-reanimated';

type Props = {
  positions: {
    firstPosition: number;
    secondPosition: number;
    thirdPosition: number;
  };
  positionName: SharedValue<string>;
};

const Progress = ({positions, positionName}: Props) => {
  const {firstPosition, secondPosition, thirdPosition} = positions;
  const leftColorProgress = useDerivedValue(
    () => (positionName.value === 'LEFT' ? 'black' : 'gray'),
    [positionName],
  );
  const centerColorProgress = useDerivedValue(
    () => (positionName.value === 'CENTER' ? 'black' : 'gray'),
    [positionName],
  );
  const RightColorProgress = useDerivedValue(
    () => (positionName.value === 'RIGHT' ? 'black' : 'gray'),
    [positionName],
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
