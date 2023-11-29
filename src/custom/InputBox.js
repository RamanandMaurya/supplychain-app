import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {width} from '../dimension/dimension';
import {colorConstant, imageConstant} from '../utils/constant';

export default function InputBox(props) {
  const [isvisible, setVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <SafeAreaView>
      {props.isPassword === true ? (
        <View
          style={[
            styles.mainContainer,
            {
              borderColor: isFocused
                ? colorConstant.blue
                : colorConstant.inputBorder,
            },
          ]}>
          <TextInput
            style={styles.textInputBox}
            placeholder={props.placeholder}
            placeholderTextColor={colorConstant.lightBlackText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            secureTextEntry={isvisible}
            value={props.value}
            onChangeText={props.onChangeText}
          />
          {isvisible ? (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setVisible(!isvisible);
              }}
              style={{alignSelf: 'center', marginRight: width / 20}}>
              <Image source={imageConstant.lock} style={styles.rightImg} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setVisible(!isvisible);
              }}
              style={{alignSelf: 'center', marginRight: width / 20}}>
              <Image source={imageConstant.unlock} style={styles.rightImg} />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View
          style={[
            styles.mainContainer,
            {
              borderColor: isFocused
                ? colorConstant.blue
                : colorConstant.inputBorder,
            },
          ]}>
          <TextInput
            style={styles.textInputBox}
            placeholder={props.placeholder}
            placeholderTextColor={colorConstant.lightBlackText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={props.value}
            onChangeText={props.onChangeText}
          />
          <View style={{alignSelf: 'center', marginRight: width / 20}}>
            <Image source={props.image} style={styles.rightImg} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    borderWidth: 1,

    width: width / 1.1,
    height: width / 7,
    borderRadius: 12,
    marginTop: width / 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  textInputBox: {
    width: width / 1.4,
    height: width / 7.3,
    marginLeft: width / 20,
    color: colorConstant.lightBlackText,
  },
  rightImg: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
});
