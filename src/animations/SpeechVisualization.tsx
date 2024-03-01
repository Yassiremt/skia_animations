import React, {useEffect} from 'react';
import {StatusBar, View, useWindowDimensions} from 'react-native';

import {
  Blur,
  Canvas,
  Circle,
  Group,
  LinearGradient,
  vec,
} from '@shopify/react-native-skia';
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const NeonCircle = ({
  color,
  rotateExtra,
  radius,
  reverse,
}: {
  color: string;
  rotateExtra: number;
  radius: number;
  reverse?: boolean;
}) => {
  const {width, height} = useWindowDimensions();
  const rotation = useSharedValue(0);

  const centerX = width / 2;
  const centerY = height - 150;
  const centerVec = vec(centerX, centerY);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(reverse ? -2 : 2, {
        duration: 2500,
        easing: Easing.linear,
      }),
      -1,
    );
  }, []);

  const animatedRotation = useDerivedValue(() => {
    return [{rotate: Math.PI * rotation.value}];
  }, [rotation]);
  return (
    <Group origin={centerVec} transform={[{rotate: rotateExtra}]}>
      <Group>
        <Circle
          style={'stroke'}
          strokeWidth={5}
          cx={width / 2}
          cy={height - 150}
          r={radius}
        />
        <LinearGradient
          origin={centerVec}
          start={{x: width / 2 - radius, y: height - 150}}
          end={{x: width / 2 + radius / 2, y: height - 150}}
          colors={[color, 'transparent']}
          transform={animatedRotation}
        />
        <Blur blur={1.5} />
      </Group>
      <Group>
        <Circle
          style={'stroke'}
          strokeWidth={1.5}
          cx={width / 2}
          cy={height - 150}
          r={radius}
        />
        <LinearGradient
          origin={centerVec}
          start={{x: width / 2 - radius, y: height - 150}}
          end={{x: width / 2 + radius / 2, y: height - 150}}
          colors={[WHITE, 'transparent']}
          transform={animatedRotation}
        />
        <Blur blur={1} />
      </Group>
    </Group>
  );
};

const BG = '#020000';
const WHITE = '#FFFFFF';
const POWER_PALETTE = ['#FFE921', '#FF351B', '#82E2FD', '#FFB332'];
const RADIUS = 60;

const SpeechVisualization = () => {
  return (
    <>
      <StatusBar backgroundColor={BG} />
      <View style={{flex: 1, backgroundColor: BG}}>
        <Canvas style={{flex: 1}}>
          {POWER_PALETTE.map((color, index) => (
            <NeonCircle
              key={index}
              color={color}
              rotateExtra={1 + index * 2}
              radius={RADIUS + index * 4}
              reverse={index % 2 == 0}
            />
          ))}
        </Canvas>
      </View>
    </>
  );
};
export default SpeechVisualization;
