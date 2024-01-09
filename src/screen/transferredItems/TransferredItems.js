import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {colorConstant, fontConstant, imageConstant} from '../../utils/constant';
import {width} from '../../dimension/dimension';
import {useSelector, useDispatch} from 'react-redux';
import {actions} from '../../redux/actions/actions';
export default function TransferredItems(props) {
  const adddata = useSelector(state => state.reducer.addDataForTransfer);
  const dispatch = useDispatch();
  const removeAddData = () => {
    dispatch(actions.setRemoveTransfer());
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.mainContainern}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            removeAddData();
            props.navigation.navigate('Deliveries', {
              Stock: 'Stock',
            });
          }}>
          <Image source={imageConstant.back} style={styles.img} />
        </TouchableOpacity>
        <Text style={styles.titleText}>Transferred Items</Text>
      </View>
      <View
        style={{
          marginTop: width / 8,
          alignItems: 'center',
          marginBottom: width / 20,
        }}>
        <Image source={imageConstant.success} style={{width: 50, height: 50}} />
        <Text
          style={{
            color: '#121212DE',
            fontSize: 24,
            marginTop: 10,
            marginBottom: 15,
          }}>
          Success
        </Text>
        <Text style={{color: '#1212128A', fontSize: 14}}>
          Transfer items to
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: '#333333',
            marginBottom: 8,
            marginTop: 10,
          }}>
          {props.route?.params?.userName}
        </Text>
        <Text style={{color: '#333333BF'}}>
          {props.route?.params?.userEmail}
        </Text>
      </View>
      <ScrollView>
        {adddata.map((item, key) => {
          return (
            <View key={key}>
              <View style={[styles.rowContainer, {marginTop: width / 20}]}>
                <View style={[styles.columView, {width: width / 1.1}]}>
                  <Text style={styles.subTitleText2}>QR #{item}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.subTitleText}>1 hour ago</Text>
                  </View>
                </View>
              </View>
              <View style={styles.line}></View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colorConstant.white,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    width: width / 1.1,
    marginTop: width / 30,
  },
  rowContainerHeder: {
    flexDirection: 'row',
    width: width / 1.1,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: width / 30,
  },
  columView: {
    width: width / 1.9,
  },
  columView1: {
    width: width / 1.3,
  },
  subTitleText2: {
    fontSize: 14,
    fontFamily: fontConstant.regular,
    color: colorConstant.blackText,
    lineHeight: 21,
  },
  subTitleText: {
    fontSize: 12,
    fontFamily: fontConstant.regular,
    color: colorConstant.lightBlackText,
    lineHeight: 21,
    marginTop: width / 80,
  },
  imgDot: {
    resizeMode: 'contain',
    height: 3,
    width: 3,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 8,
  },
  viewImg: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
    marginBottom: 3,
  },
  scanText: {
    fontFamily: fontConstant.semibold,
    color: colorConstant.green,
    lineHeight: 15,
    fontSize: 10,
    marginTop: 5,
  },
  openText: {
    fontSize: 12,
    fontFamily: fontConstant.semibold,
    lineHeight: 21,
  },
  line: {
    height: 0.5,
    width: width / 1.1,
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: width / 20,
    borderColor: colorConstant.line,
  },
  mainContainern: {
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
