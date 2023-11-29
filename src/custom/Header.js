import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colorConstant, fontConstant, imageConstant} from '../utils/constant';
import {width} from '../dimension/dimension';

export default function Header(props) {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => props.navigation.goBack()}>
        <Image
          source={props.leftImg ? props.leftImg : imageConstant.back}
          style={styles.img}
        />
      </TouchableOpacity>
      <Text style={styles.titleText}>{props.title}</Text>
      {props.rightFlag === true ? (
        <TouchableOpacity activeOpacity={0.7} onPress={props.rightNavigation}>
          <Image source={props.rightImg} style={styles.img} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    width: width / 1,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  img: {
    resizeMode: 'contain',
    height: 48,
    width: 48,
  },
  titleText: {
    fontSize: 20,
    fontFamily: fontConstant.regular,
    lineHeight: 24,
    color: colorConstant.blackText,
    marginLeft: width / 40,
    width: width / 1.5,
  },
});
