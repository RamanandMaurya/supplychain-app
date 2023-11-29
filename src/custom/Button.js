import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colorConstant, fontConstant} from '../utils/constant';
import {width} from '../dimension/dimension';

export default function Button(props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.button,
        {
          position: props.position,
          bottom: props.bottom,
          marginBottom: props.marginBottom,
          marginTop: props.marginTop ? props.marginTop : width / 20,
        },
      ]}
      onPress={props.onButtonPress}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colorConstant.button,
    height: width / 7,
    width: width / 1.1,
    borderRadius: 12,

    alignSelf: 'center',
    justifyContent: 'center',
  },
  text: {
    alignSelf: 'center',
    fontSize: 16,
    color: colorConstant.white,
    fontFamily: fontConstant.bold,
  },
});
