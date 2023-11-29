import {SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Header from '../../custom/Header';
import {colorConstant, imageConstant, fontConstant} from '../../utils/constant';
import {width} from '../../dimension/dimension';

export default function TrackDelivery(props) {
  return (
    <SafeAreaView style={styles.mainView}>
      <Header title={'Track Delivery'} navigation={props.navigation} />
      <View style={styles.mainContainer}>
        <View style={styles.columView1}>
          <Text style={styles.titleText}>REF #12345678</Text>
          <View
            style={{
              flexDirection: 'row',

              alignItems: 'center',
            }}>
            <Text style={styles.subTitleText}>5 items </Text>
            <Image source={imageConstant.dot} style={styles.imgDot} />
            <Text style={styles.subTitleText}> 1 hour ago</Text>
          </View>
        </View>

        <Text
          style={[
            styles.text,
            {
              color: colorConstant.green,
            },
          ]}>
          OPEN
        </Text>
        <Image
          source={imageConstant.truck}
          style={[
            styles.img,
            {
              marginRight: width / 30,
            },
          ]}
        />
      </View>
      <View style={styles.line}></View>
      <Text style={styles.text1}>Scan History</Text>

      {/* first View */}
      <View style={styles.rowContainer}>
        <View style={styles.rowView}>
          <Text style={styles.subTitleText}>Scan 3 </Text>
          <Image source={imageConstant.dot} style={styles.imgDot} />
          <Text style={styles.subTitleText}> 2 out of 5 items</Text>
          <Image
            source={imageConstant.dot}
            style={[
              styles.imgDot,
              {marginLeft: width / 40, marginRight: width / 30},
            ]}
          />
          <Text style={[styles.subTitleText, {color: colorConstant.green}]}>
            Current Location
          </Text>
        </View>
        <Text style={styles.subTitleText}>10:30 AM</Text>
      </View>
      <Text style={styles.nameText}>Raj Kumar - Dealer</Text>
      <Text style={styles.addressText}>458 Rajiv Chowk, Rajasthan, India</Text>
      <View style={[styles.line, {marginBottom: width / 20}]}></View>

      {/* second View */}
      <View style={styles.rowContainer}>
        <View style={styles.rowView}>
          <Text style={styles.subTitleText}>Scan 3 </Text>
          <Image source={imageConstant.dot} style={styles.imgDot} />
          <Text style={styles.subTitleText}> 2 out of 5 items</Text>
        </View>
        <Text style={styles.subTitleText}>10:30 AM</Text>
      </View>
      <Text style={styles.nameText}>Raj Kumar - Dealer</Text>
      <Text style={styles.addressText}>458 Rajiv Chowk, Rajasthan, India</Text>
      <View style={[styles.line, {marginBottom: width / 20}]}></View>

      {/* Third View */}
      <View style={styles.rowContainer}>
        <View style={styles.rowView}>
          <Text style={styles.subTitleText}>Scan 3 </Text>
          <Image source={imageConstant.dot} style={styles.imgDot} />
          <Text style={styles.subTitleText}> 2 out of 5 items</Text>
        </View>
        <Text style={styles.subTitleText}>10:30 AM</Text>
      </View>
      <Text style={styles.nameText}>Raj Kumar - Dealer</Text>
      <Text style={styles.addressText}>458 Rajiv Chowk, Rajasthan, India</Text>
      <View style={[styles.line, {marginBottom: width / 20}]}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    width: width / 1.05,
    alignSelf: 'center',
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: width / 30,
    padding: width / 80,
  },
  text: {
    fontSize: 12,
    fontFamily: fontConstant.semibold,
    lineHeight: 21,
    width: '30%',
    // backgroundColor: 'green',
    textAlign: 'right',
  },
  line: {
    height: 0.5,
    width: width / 1.1,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: width / 40,
    borderColor: colorConstant.line,
  },

  imgDot: {
    resizeMode: 'contain',
    height: 2,
    width: 2,
    marginLeft: 5,
    marginRight: 5,
  },
  img: {
    resizeMode: 'contain',
    height: 24,
    width: 24,
  },
  columView1: {
    width: width / 2,
    // backgroundColor: 'pink',
  },
  titleText: {
    fontSize: 14,
    fontFamily: fontConstant.medium,
    color: colorConstant.blackText,
    lineHeight: 21,
  },
  subTitleText: {
    fontSize: 12,
    fontFamily: fontConstant.regular,
    color: colorConstant.lightBlackText,
    lineHeight: 21,
  },
  text1: {
    fontFamily: fontConstant.semibold,
    fontSize: 16,
    color: colorConstant.blackText,
    lineHeight: 24,
    marginTop: width / 20,
    marginBottom: width / 30,
    marginLeft: width / 30,
  },
  rowContainer: {
    flexDirection: 'row',
    width: width / 1.07,
    // backgroundColor: 'red',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  rowView: {
    flexDirection: 'row',
    // backgroundColor: 'green',
    alignItems: 'center',
  },
  nameText: {
    color: colorConstant.blackText,
    fontFamily: fontConstant.semibold,
    fontSize: 14,
    marginLeft: width / 30,
    marginTop: width / 80,
  },
  addressText: {
    color: colorConstant.blackText,
    fontFamily: fontConstant.regular,
    fontSize: 14,
    marginLeft: width / 30,
    marginTop: width / 80,
  },
});
