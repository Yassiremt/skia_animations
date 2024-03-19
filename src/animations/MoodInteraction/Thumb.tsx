import React from 'react';
import {Circle, Group, Path, rect, FitBox} from '@shopify/react-native-skia';
import {
  SharedValue,
  interpolateColor,
  useDerivedValue,
} from 'react-native-reanimated';
import {colors} from './colors';

type Props = {
  size?: number;
  position: SharedValue<number>;
  positions: {
    firstPosition: number;
    secondPosition: number;
    thirdPosition: number;
  };
};

const Thumb = ({position, size = 90, positions}: Props) => {
  const {firstPosition, secondPosition, thirdPosition} = positions;

  const animatedTranslate = useDerivedValue(() => {
    return [{translateX: position.value - 38}];
  }, [position]);

  const animatedCircleColor = useDerivedValue(
    () =>
      interpolateColor(
        position.value,
        [firstPosition, secondPosition, thirdPosition],
        [colors.red + '79', colors.yellow + '79', colors.green + '79'],
      ),
    [position],
  );

  return (
    <Group transform={animatedTranslate}>
      <FitBox src={rect(0, 0, 69, 36)} dst={rect(0, 0, size, size)}>
        <Path
          path="M8.70328 12.4686C4.47923 15.583 -1.03637 16.5 -7 16.5V17V17.5H69V17V16.5C63.0364 16.5 57.5208 15.583 53.2967 12.4686C51.7767 11.3479 50.3779 10.0724 48.9444 8.76521L48.8587 8.68704C47.4015 7.35845 45.9073 6.00159 44.2444 4.78953C40.8997 2.35154 36.8738 0.5 31 0.5C25.1262 0.5 21.1003 2.35154 17.7556 4.78953C16.0927 6.00159 14.5985 7.35845 13.1413 8.68704L13.0556 8.76524C11.6221 10.0724 10.2233 11.3479 8.70328 12.4686Z"
          color="white"
        />
        {/* I duplicated the Circle 4 times bcz I used opacity +'79',so it looks
        good in android phones, if i don't use opacity more than '79' color doesn't appear at all 
        using interpolateColor (android real devices only)
        Not sure how I can fix it */}
        <Circle cx={31} cy={20} r={16} color={animatedCircleColor} />
        <Circle cx={31} cy={20} r={16} color={animatedCircleColor} />
        <Circle cx={31} cy={20} r={16} color={animatedCircleColor} />
        <Circle cx={31} cy={20} r={16} color={animatedCircleColor} />
        <Path
          path="M28 14V25"
          style="stroke"
          color="black"
          strokeWidth={2}
          strokeCap="round"
          opacity={0.05}
        />
        <Path
          path="M34 14V25"
          style="stroke"
          color="black"
          strokeWidth={2}
          strokeCap="round"
          opacity={0.05}
        />
      </FitBox>
    </Group>
  );
};

export default Thumb;
