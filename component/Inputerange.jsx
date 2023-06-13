import {View, Text, InputText} from 'react-native';
import React, {memo} from 'react';
import {Dimensions} from 'react-native';
import {StyleSheet} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';

const WIDTH = Dimensions.get('window').width - 60;
const KNOW1 = 18;
const MAXWIDTH = WIDTH - KNOW1 / 2 + 8;

const Inputerange = ({min, max, steps = 100, onValueChange}) => {
  const knob1Value = useSharedValue(0);
  const knob2Value = useSharedValue(MAXWIDTH);

  const styleline = useAnimatedStyle(() => {
    return {
      backgroundColor: 'orange',
      height: 8,
      borderRadius: 3,
      width: knob2Value.value - knob1Value.value,
      transform: [{translateX: knob1Value.value}],
    };
  });

  const handleTap = event => {
    const {x} = event.nativeEvent;
    x > MAXWIDTH / 2 ? (knob2Value.value = x) : (knob1Value.value = x);
    onValueChange({
      min:
        Math.round(
          (min + (knob1Value.value / MAXWIDTH) * (max - min)) / steps,
        ) * steps,
      max:
        Math.round(
          (min + (knob2Value.value / MAXWIDTH) * (max - min)) / steps,
        ) * steps,
    });
  };

  const gestureHandler1 = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = knob1Value.value;
    },
    onActive: (event, ctx) => {
      knob1Value.value =
        ctx.startX + event.translationX < 0
          ? knob1Value.value
          : ctx.startX + event.translationX > knob2Value.value - 25
          ? knob1Value.value
          : ctx.startX + event.translationX > MAXWIDTH
          ? MAXWIDTH
          : ctx.startX + event.translationX;
    },
    onEnd: (_, ctx) => {
      ctx.startX = knob1Value.value;

      runOnJS(onValueChange)({
        min:
          Math.round(
            (min + (knob1Value.value / MAXWIDTH) * (max - min)) / steps,
          ) * steps,
        max:
          Math.round(
            (min + (knob2Value.value / MAXWIDTH) * (max - min)) / steps,
          ) * steps,
      });
    },
  });
  const gestureHandler2 = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = knob2Value.value;
    },
    onActive: (event, ctx) => {
      knob2Value.value =
        ctx.startX + event.translationX < knob1Value.value
          ? knob1Value.value + 25
          : ctx.startX + event.translationX > MAXWIDTH
          ? MAXWIDTH
          : ctx.startX + event.translationX;
    },
    onEnd: (_, ctx) => {
      ctx.startX = knob2Value.value;
      runOnJS(onValueChange)({
        min:
          Math.round(
            (min + (knob1Value.value / MAXWIDTH) * (max - min)) / steps,
          ) * steps,
        max:
          Math.round(
            (min + (knob2Value.value / MAXWIDTH) * (max - min)) / steps,
          ) * steps,
      });
    },
  });

  const knob1Style = useAnimatedStyle(() => {
    return {
      transform: [{translateX: knob1Value.value}],
    };
  });

  const knob2Style = useAnimatedStyle(() => {
    return {
      transform: [{translateX: knob2Value.value}],
    };
  });

  return (
    <View style={styles.conatiner}>
      <GestureHandlerRootView style={{flex: 1, width: '100%', height: '100%'}}>
        <TapGestureHandler onHandlerStateChange={handleTap}>
          <View style={styles.track}>
            <View style={styles.track}>
              <Animated.View style={styleline} />
            </View>
          </View>
        </TapGestureHandler>
        <PanGestureHandler onGestureEvent={gestureHandler1}>
          <Animated.View style={[styles.knob, knob1Style]} />
        </PanGestureHandler>
        <PanGestureHandler onGestureEvent={gestureHandler2}>
          <Animated.View style={[styles.knob, knob2Style]} />
        </PanGestureHandler>
      </GestureHandlerRootView>
    </View>
  );
};
const styles = StyleSheet.create({
  conatiner: {
    backgroundColor: '#eee',
    paddingHorizontal: 20,
    borderRadius: 8,
    paddingVertical: 10,
    marginVertical: 10,
    justifyContent: 'center',
  },
  track: {
    width: WIDTH,
    height: 8,
    backgroundColor: '#cccbd2',
    borderRadius: 3,
  },
  knob: {
    position: 'absolute',
    bottom: -4,
    padding:10,
    left: 7,
    width: KNOW1,
    height: KNOW1,
    borderRadius: KNOW1 / 2,
    borderColor: '#ff0000',
    borderWidth: 1,
    padding: 3,
    backgroundColor: '#fff',
    marginLeft: -KNOW1 + 3,
  },
});

export default memo(Inputerange);
