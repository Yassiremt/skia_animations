import {useWindowDimensions} from 'react-native';
import React from 'react';
import {SharedValue} from 'react-native-reanimated';
import Eye from './Eye';
import Mouth from './Mouth';

type Props = {
  currentPosition: SharedValue<number>;
  positions: {
    firstPosition: number;
    secondPosition: number;
    thirdPosition: number;
  };
};
const Face = ({currentPosition, positions}: Props) => {
  const {width} = useWindowDimensions();
  const cardWidth = width - 20;
  const cardHeight = (cardWidth * 282) / 185;
  const LEFT_EYE_X = cardWidth / 2 - 85;
  const LEFT_EYE_Y = 200;
  const RIGHT_EYE_X = cardWidth / 2 + 85;
  const RIGHT_EYE_Y = 200;

  return (
    <>
      <Eye
        currentPosition={currentPosition}
        positions={positions}
        eyeX={LEFT_EYE_X}
        eyeY={LEFT_EYE_Y}
      />
      <Eye
        currentPosition={currentPosition}
        positions={positions}
        eyeX={RIGHT_EYE_X}
        eyeY={RIGHT_EYE_Y}
      />
      <Mouth
        currentPosition={currentPosition}
        positions={positions}
        cardHeight={cardHeight}
        cardWidth={cardWidth}
      />
    </>
  );
};

export {Face};
