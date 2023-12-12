import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React from 'react';
import {colorConstant, fontConstant, imageConstant} from '../../utils/constant';
import {width} from '../../dimension/dimension';

export default function ItemDetails({props, route, navigation}) {
  const {orderID, Qrid, orderStatus} = route.params || {};
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.rowContainerHeder}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}>
          <Image source={imageConstant.back} style={styles.backImg} />
        </TouchableOpacity>
        <View style={styles.HeaderCon}>
          <View
            style={
              orderStatus === 'in transfer'
                ? {width: width / 2.2}
                : styles.columView2
            }>
            <View
              style={{
                flexDirection: 'column',
              }}>
              <Text style={styles.firstHeaderText}>Item Details</Text>
              <Text style={styles.secondHeaderText}>#{orderID}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text
              style={[
                styles.text,
                {
                  color:
                    orderStatus === 'open'
                      ? colorConstant.green
                      : orderStatus === 'in stock'
                      ? colorConstant.orange
                      : orderStatus === 'in transfer'
                      ? colorConstant.blue
                      : orderStatus === 'sold out'
                      ? colorConstant.red
                      : colorConstant.black,
                  textTransform: 'uppercase',
                },
              ]}>
              {orderStatus}
            </Text>
            <Image
              source={
                orderStatus === 'open'
                  ? imageConstant.truckFast
                  : orderStatus === 'in stock'
                  ? imageConstant.inStock
                  : orderStatus === 'in transfer'
                  ? imageConstant.truckFast
                  : orderStatus === 'sold out'
                  ? imageConstant.shopBag
                  : imageConstant.truckFast
              }
              style={[
                styles.truckImg,
                {
                  tintColor:
                    orderStatus === 'open'
                      ? colorConstant.green
                      : orderStatus === 'in stock'
                      ? colorConstant.orange
                      : orderStatus === 'in transfer'
                      ? colorConstant.blue
                      : orderStatus === 'sold out'
                      ? colorConstant.red
                      : colorConstant.black,
                },
              ]}
            />
          </View>
        </View>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            progressBackgroundColor={'#ffffff'}
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#A94545']}
          />
        }>
        <Text style={styles.headerText}>QR #{Qrid}</Text>
        <Text style={styles.disText}>
          A cement bag is a type of packaging used to store and transport
          cement, a powdery building material used for construction purposes.
          The details of a cement bag can vary depending on the manufacturer,
          but typical features...{' '}
          <Text style={styles.seeMoreText}>See More</Text>
        </Text>
        <View style={styles.rowView}>
          <Text style={[styles.headerText1, {width: width / 1.7}]}>
            Recent Scan History
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={[
                styles.openText,
                {
                  color:
                    orderStatus === 'open'
                      ? colorConstant.green
                      : orderStatus === 'in stock'
                      ? colorConstant.orange
                      : orderStatus === 'in transfer'
                      ? colorConstant.blue
                      : orderStatus === 'sold out'
                      ? colorConstant.red
                      : colorConstant.black,
                  textTransform: 'uppercase',
                },
              ]}>
              {orderStatus}
            </Text>
            <Image
              source={
                orderStatus === 'open'
                  ? imageConstant.truckFast
                  : orderStatus === 'in stock'
                  ? imageConstant.inStock
                  : orderStatus === 'in transfer'
                  ? imageConstant.truckFast
                  : orderStatus === 'sold out'
                  ? imageConstant.shopBag
                  : imageConstant.truckFast
              }
              style={[
                styles.truckImg,
                {
                  tintColor:
                    orderStatus === 'open'
                      ? colorConstant.green
                      : orderStatus === 'in stock'
                      ? colorConstant.orange
                      : orderStatus === 'in transfer'
                      ? colorConstant.blue
                      : orderStatus === 'sold out'
                      ? colorConstant.red
                      : colorConstant.black,
                },
              ]}
            />
          </View>
        </View>
        {/* first */}
        {/* <View style={styles.rowContainer}>
          <View style={styles.columView}>
            <Text style={styles.firstHeaderText}>Scane 3</Text>
            <View style={styles.rowView1}>
              <Text style={styles.subText}>Discrepancy</Text>
              <Image source={imageConstant.dot} style={styles.dot} />
              <Text style={styles.timeText}>1 hour ago</Text>
            </View>
          </View>
          <View style={styles.columView1}>
            <Image source={imageConstant.viewImg} style={styles.img} />
            <Text style={styles.text2}>VIEW image</Text>
          </View>
        </View>
        <View style={styles.line}></View>
        <View style={styles.rowContainer}>
          <View style={styles.columView}>
            <Text style={styles.firstHeaderText}>Scane 2</Text>
            <View style={styles.rowView1}>
              <Text style={styles.subText}>Discrepancy</Text>
              <Image source={imageConstant.dot} style={styles.dot} />
              <Text style={styles.timeText}>1 hour ago</Text>
            </View>
          </View>
          <View style={styles.columView1}>
            <Image source={imageConstant.viewImg} style={styles.img} />
            <Text style={styles.text2}>VIEW image</Text>
          </View>
        </View>
        <View style={styles.line}></View> */}
        {/* third */}
        <View style={styles.rowContainer}>
          <View style={styles.columView}>
            <Text style={styles.firstHeaderText}>Scane 1</Text>
            <View style={styles.rowView1}>
              <Text
                style={[
                  styles.openText,
                  {
                    color:
                      orderStatus === 'open'
                        ? colorConstant.green
                        : orderStatus === 'in stock'
                        ? colorConstant.orange
                        : orderStatus === 'in transfer'
                        ? colorConstant.blue
                        : orderStatus === 'sold out'
                        ? colorConstant.red
                        : colorConstant.black,
                    textTransform: 'uppercase',
                  },
                ]}>
                {orderStatus}
              </Text>
              <Image source={imageConstant.dot} style={styles.dot} />
              <Text style={styles.timeText}>1 hour ago</Text>
            </View>
          </View>
          {/* <View style={styles.columView1}>
            <Image source={imageConstant.viewImg} style={styles.img} />
            <Text style={styles.text2}>VIEW image</Text>
          </View> */}
        </View>
        <View style={styles.line}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colorConstant.white,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    width: width / 1.1,
    marginTop: width / 20,
  },
  backImg: {
    resizeMode: 'contain',
    height: 48,
    width: 48,
  },
  truckImg: {
    resizeMode: 'contain',
    height: 24,
    width: 24,
    tintColor: colorConstant.green,
  },
  openText: {
    fontFamily: fontConstant.semibold,
    fontSize: 10,
    lineHeight: 12,
    color: colorConstant.green,
    paddingRight: 6,
  },
  columView: {
    width: width / 1.4,
  },
  columView2: {
    width: width / 1.8,
  },
  columView1: {
    alignItems: 'center',
  },
  rowContainerHeder: {
    flexDirection: 'row',
    width: width / 1.1,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: width / 30,
  },
  HeaderCon: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  firstHeaderText: {
    fontFamily: fontConstant.regular,
    fontSize: 14,
    lineHeight: 21,
    color: colorConstant.blackText,
  },
  secondHeaderText: {
    fontFamily: fontConstant.regular,
    fontSize: 14,
    lineHeight: 21,
    color: colorConstant.blackText,
  },
  headerText: {
    fontFamily: fontConstant.semibold,
    fontSize: 16,
    lineHeight: 21,
    color: colorConstant.blackText,
    marginTop: width / 30,
    marginLeft: width / 20,
    //width: width / 1.4,
  },
  headerText1: {
    fontFamily: fontConstant.semibold,
    fontSize: 16,
    lineHeight: 21,
    color: colorConstant.blackText,
  },
  disText: {
    fontFamily: fontConstant.regular,
    fontSize: 14,
    lineHeight: 21,
    color: colorConstant.blackText,
    marginTop: width / 20,
    width: width / 1.1,
    alignSelf: 'center',
  },
  seeMoreText: {
    fontFamily: fontConstant.bold,
    fontSize: 14,
    lineHeight: 21,
    color: colorConstant.button,
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    width: width / 1.1,
    marginTop: width / 20,
  },
  rowView1: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width / 2.5,
    marginTop: width / 80,
  },
  subText: {
    color: colorConstant.red,
    fontSize: 12,
    fontFamily: fontConstant.regular,
  },
  timeText: {
    color: colorConstant.lightBlackText,
    fontSize: 12,
    fontFamily: fontConstant.regular,
  },
  dot: {
    resizeMode: 'contain',
    height: 3,
    width: 3,
    paddingHorizontal: 8,
    marginTop: 3,
  },
  text: {
    fontSize: 10,
    fontFamily: fontConstant.semibold,
    lineHeight: 21,
    paddingRight: 6,
  },
  img: {
    resizeMode: 'contain',
    height: 24,
    width: 24,
  },
  text2: {
    marginTop: width / 80,
    color: colorConstant.button,
    fontSize: 10,
    fontFamily: fontConstant.semibold,
    textTransform: 'uppercase',
  },
  line: {
    height: 0.5,
    width: width / 1.1,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: width / 20,
    borderColor: colorConstant.line,
  },
});
