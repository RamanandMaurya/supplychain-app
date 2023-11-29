import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {colorConstant, fontConstant, imageConstant} from '../../utils/constant';
import Header from '../../custom/Header';
import {width} from '../../dimension/dimension';

export default function TransferDelivery(props) {
  const [checked, setChecked] = useState(-1);

  const data = [
    {
      id: '#01',
      title: 'Ramesh Kumar',
      subTitle: 'rameshkumar123@gmail.com',
    },
    {
      id: '#02',
      title: 'Ramesh Kumar',
      subTitle: 'rameshkumar123@gmail.com',
    },
    {
      id: '#03',
      title: 'Ramesh Kumar',
      subTitle: 'rameshkumar123@gmail.com',
    },
    {
      id: '#04',
      title: 'Ramesh Kumar',
      subTitle: 'rameshkumar123@gmail.com',
    },
    {
      id: '#05',
      title: 'Ramesh Kumar',
      subTitle: 'rameshkumar123@gmail.com',
    },
  ];
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header title={'Transfer Delivery'} navigation={props.navigation} />

      <View style={styles.searchView}>
        <TextInput
          style={styles.input}
          placeholder="Search Retailer"
          placeholderTextColor={colorConstant.lightBlackText}
        />
        <Image source={imageConstant.search} style={styles.searchImg} />
      </View>

      {data.map((item, key) => {
        return (
          <View key={key}>
            <View style={styles.rowContainer}>
              <View style={styles.columView}>
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.subText}>{item.subTitle}</Text>
              </View>

              {checked == key ? (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setChecked(1)}>
                  <Image source={imageConstant.success} style={styles.img} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setChecked(key)}>
                  <Image source={imageConstant.round} style={styles.img} />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.line}></View>
          </View>
        );
      })}
      {/* 
      <View style={styles.rowContainer}>
        <View style={styles.columView}>
          <Text style={styles.titleText}>Ramesh Kumar</Text>
          <Text style={styles.subText}>rameshkumar123@gmail.com</Text>
        </View>

        {checked === 0 ? (
          <TouchableOpacity activeOpacity={0.7} onPress={() => setChecked(1)}>
            <Image source={imageConstant.round} style={styles.img} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity activeOpacity={0.7} onPress={() => setChecked(0)}>
            <Image source={imageConstant.success} style={styles.img} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.line}></View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colorConstant.white,
  },
  searchView: {
    width: width / 1.1,
    height: 56,
    borderRadius: 12,
    borderColor: colorConstant.inputBorder,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: width / 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchImg: {
    resizeMode: 'contain',
    height: 24,
    width: 24,
    marginRight: width / 30,
  },
  input: {
    // backgroundColor: 'red',
    width: width / 1.4,
    marginLeft: width / 30,
    fontFamily: fontConstant.regular,
    fontSize: 16,
    color: colorConstant.lightBlackText,
    height: 50,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: width / 1.1,
    // backgroundColor: 'red',
    height: 50,
    marginTop: width / 20,
  },
  columView: {
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
    width: width / 1.2,
  },
  titleText: {
    color: colorConstant.blackText,
    fontFamily: fontConstant.regular,
    fontSize: 14,
    lineHeight: 21,
  },
  subText: {
    color: colorConstant.lightBlackText,
    fontFamily: fontConstant.regular,
    fontSize: 12,
    lineHeight: 21,
  },
  img: {
    resizeMode: 'contain',
    height: 24,
    width: 24,
  },
  line: {
    height: 0.5,
    width: width / 1.1,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: width / 40,
    borderColor: colorConstant.line,
  },
});
