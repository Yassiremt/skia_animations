import React, {useEffect} from 'react';
import {
  Canvas,
  Group,
  SweepGradient,
  Text,
  useFont,
  Skia,
  usePathInterpolation,
} from '@shopify/react-native-skia';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import {
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
var flubber = require('flubber');

const MaskedText = () => {
  const {width, height} = useWindowDimensions();
  const center = {x: width / 2, y: height / 2};

  const fontSize = 90;
  const font = useFont(require('../../assets/Brandan.ttf'), fontSize);

  const path0 = flubber.toPathString([
    [1, 50],
    [1, 50],
    [1, 50],
    [1, 50],
  ]);
  const path1 = flubber.toPathString([
    [1, 1],
    [100, 50],
    [100, 50],
    [1, 100],
  ]);
  const path2 = flubber.toPathString([
    [1, 1],
    [width, 50],
    [width, 50],
    [1, 100],
  ]);
  const path3 = flubber.toPathString([
    [1, 1],
    [width, 1],
    [width, 100],
    [1, 100],
  ]);
  const path4 = flubber.toPathString([
    [width, 50],
    [width, 50],
    [width, 50],
    [width, 50],
  ]);

  const skiaPath0 = Skia.Path.MakeFromSVGString(path0)!;
  const skiaPath1 = Skia.Path.MakeFromSVGString(path1)!;
  const skiaPath2 = Skia.Path.MakeFromSVGString(path2)!;
  const skiaPath3 = Skia.Path.MakeFromSVGString(path3)!;
  const skiaPath4 = Skia.Path.MakeFromSVGString(path4)!;
  const progress = useSharedValue(0);
  const progress2 = useSharedValue(0);
  useEffect(() => {
    progress.value = withRepeat(withTiming(1, {duration: 2000}), -1);
    progress2.value = withDelay(
      750,
      withRepeat(withTiming(1, {duration: 2000}), -1),
    );
  }, []);

  const path = usePathInterpolation(
    progress,
    [0, 0.3, 0.7, 1],
    [skiaPath0, skiaPath1, skiaPath2, skiaPath3, skiaPath4],
  );
  const pathB = usePathInterpolation(
    progress2,
    [0, 0.3, 0.7, 1],
    [skiaPath0, skiaPath1, skiaPath2, skiaPath3, skiaPath4],
  );

  return (
    <View style={styles.container}>
      <Canvas
        style={{
          width: width,
          height: 100,
          backgroundColor: '#212121',
        }}>
        <SweepGradient c={center} colors={['#6DD5ED', '#01BAEF']} />
        <Text x={15} y={80} font={font} text={'OPENER'} />

        <Group clip={path}>
          <Text x={15} y={80} font={font} text={'OPENER'} />
          <SweepGradient c={center} colors={['#56AB2F', '#A8E063']} />
        </Group>
        <Group clip={pathB}>
          <Text x={15} y={80} font={font} text={'OPENER'} />
          <SweepGradient c={center} colors={['#6DD5ED', '#01BAEF']} />
        </Group>
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#121121',
  },
});

export {MaskedText};
