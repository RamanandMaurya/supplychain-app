import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  colorConstant,
  fontConstant,
  imageConstant,
  baseUrl,
} from '../../utils/constant';
import axios from 'axios';
import Header from '../../custom/Header';
import {width} from '../../dimension/dimension';
import Button from '../../custom/Button';
import {useSelector, useDispatch} from 'react-redux';
import {actions} from '../../redux/actions/actions';
export default function TransferDelivery(props) {
  const [checked, setChecked] = useState();
  const token = useSelector(state => state.reducer.userToken);
  const allUsersData = useSelector(state => state.reducer.allUsers);
  const [filterValue, setFilterValue] = useState('');
  const [data, setData] = useState();
  const adddata = useSelector(state => state.reducer.addDataForTransfer);
  const dataScaned = useSelector(state => state.reducer.dataScaned);
  const [longitude, setLongitude] = useState(props?.route?.params?.log);
  const [latitude, setLatitude] = useState(props?.route?.params?.lat);
  const dispatch = useDispatch();
  const allUsers = async () => {
    let url = `${baseUrl}/api/public/user/all?role=retailer`;
    const AuthStr = 'Bearer '.concat(token);
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: AuthStr,
        },
      });
      console.log('all User Response ----', response?.data);
      if (response?.data) {
        setData(response?.data);
        dispatch(actions.setAllUsers(response?.data));
      }
    } catch (error) {
      console.log('all User Response =====', error);
      if (error.response?.data.error === 'Token is expired') {
        console.error('API No Response:', error.response?.data.error);
        props.navigation.navigate('Logout');
      }
    }
  };
  useEffect(() => {
    allUsers();
  }, [token]);
  const transferDelivery = async () => {
    let url = `${baseUrl}/api/public/order/placeorderintransfer`;
    const AuthStr = 'Bearer '.concat(token);
    let body = {
      product_id: adddata,
      ordered_by: checked,
      lat: latitude.toString(),
      lon: longitude.toString(),
    };
    console.log(body, 'tran------');
    try {
      const response = await axios.post(url, body, {
        headers: {
          Authorization: AuthStr,
        },
      });
      console.log('Transfer Delivery Response ----', response?.data?.Message);
      dispatch(actions.setDataScaned(dataScaned ? false : true));
      if (response?.data) {
        data
          .filter(item => item.userId === checked)
          .map((item, key) => {
            props.navigation.navigate('TransferredItems', {
              userName: item.name,
              userEmail: item.email,
            });
          });
      }
    } catch (error) {
      console.log('Transfer Delivery error =====', error?.response?.data);
      if (error.response?.data.error === 'Token is expired') {
        console.error('API No Response:', error.response?.data.error);
        props.navigation.navigate('Logout');
      }
    }
  };
  const transferredItems = () => {
    transferDelivery();
  };

  const handleFilterChange = text => {
    const inputValue = text.toLowerCase();
    const filteredData = allUsersData.filter(
      item =>
        (item.name && item.name.toLowerCase().includes(inputValue)) ||
        (item.email && item.email.toLowerCase().includes(inputValue)),
    );
    setData(filteredData);
    setFilterValue(inputValue);
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header title={'Transfer Delivery'} navigation={props.navigation} />

      <View style={styles.searchView}>
        <TextInput
          style={styles.input}
          value={filterValue}
          onChangeText={handleFilterChange}
          placeholder="Search Retailer"
          placeholderTextColor={colorConstant.lightBlackText}
        />
        <Image source={imageConstant.search} style={styles.searchImg} />
      </View>

      <ScrollView style={{marginBottom: 80}}>
        {data &&
          data.map((item, key) => {
            return (
              <View key={key}>
                <View style={styles.rowContainer}>
                  <View style={styles.columView}>
                    <Text style={styles.titleText}>{item.name}</Text>
                    <Text style={styles.subText}>{item.email}</Text>
                  </View>

                  {checked === item.userId ? (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => setChecked(item.userId)}>
                      <Image
                        source={imageConstant.success}
                        style={styles.img}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => setChecked(item.userId)}>
                      <Image source={imageConstant.round} style={styles.img} />
                    </TouchableOpacity>
                  )}
                </View>
                <View style={styles.line}></View>
              </View>
            );
          })}
      </ScrollView>
      <Button
        title={'Continue'}
        position={'absolute'}
        bottom={width / 20}
        onButtonPress={transferredItems}
      />
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
