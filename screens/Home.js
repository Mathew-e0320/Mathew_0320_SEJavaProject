import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import {nearBy} from '../api/Api';
import {SearchBar, Button} from 'react-native-elements';
import {dummyData} from '../res/constants';
import LottieView from 'lottie-react-native';
import ReactNativeModal from 'react-native-modal';
import success from '../res/success.json';
import mech from '../res/mech.json';

export default class Home extends React.PureComponent {
  state = {data: dummyData, txt: 'Toronto', visible: false, suc: false};
  componentDidMount = async () => {
    // await this.search();
  };
  search = async () => {
    const data = await nearBy(this.state.txt);
    this.setState({data});
  };
  render() {
    return (
      <View Style={styles.container}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={(txt) => this.setState({txt})}
          value={this.state.txt}
          clearIcon={() => (
            <Button
              title="Search"
              titleStyle={{color: '#727e8b'}}
              buttonStyle={{
                backgroundColor: '#3c4043',
                padding: 5,
                paddingHorizontal: 10,
              }}
              onPress={async () => await this.search()}
            />
          )}
          onClear={() => {}}
        />
        <ScrollView
          style={{backgroundColor: '#fff'}}
          contentContainerStyle={{paddingBottom: 150}}>
          {this.state.data.map((itm, i) => (
            <View
              key={i}
              style={{
                padding: 20,
                backgroundColor: '#fff',
                elevation: 10,
                marginTop: 20,
                marginHorizontal: 20,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  textAlign: 'left',
                  fontWeight: 'bold',
                  fontSize: 12,
                  color: itm.opening_hours?.open_now ? '#2ecc71' : 'red',
                  alignSelf: 'flex-end',
                  marginBottom: 10,
                  borderColor: itm.opening_hours?.open_now ? '#2ecc71' : 'red',
                  borderWidth: 0.5,
                  padding: 5,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                }}>
                {itm.opening_hours?.open_now ? 'OPEN' : 'CLOSED'}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{width: 60, height: 60}}
                  source={{uri: itm.icon}}
                />
                <View>
                  <Text
                    style={{
                      width: 200,
                      marginLeft: 20,
                      textAlign: 'left',
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    {itm.name}
                  </Text>
                  <Text
                    style={{
                      width: 200,
                      marginLeft: 20,
                      textAlign: 'left',
                      fontSize: 14,
                    }}>
                    {itm.vicinity}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                  alignItems: 'center',
                  borderTopWidth: 0.2,
                  borderTopColor: 'darkgrey',
                  paddingTop: 10,
                }}>
                <Text
                  style={{
                    textAlign: 'left',
                    fontWeight: 'bold',
                    fontSize: 12,
                    borderRadius: 5,
                    borderWidth: 0.5,
                    color: '#0372fe',
                    borderColor: '#0372fe',
                    padding: 5,
                    paddingHorizontal: 10,
                  }}>
                  {itm.rating}
                </Text>
                <Button
                  title="Book Now"
                  titleStyle={{
                    fontSize: 14,
                  }}
                  buttonStyle={{
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    backgroundColor: '#0372fe',
                  }}
                  onPress={() => {
                    this.setState({visible: true});
                  }}
                />
              </View>
            </View>
          ))}
        </ScrollView>
        <ReactNativeModal isVisible={this.state.visible}>
          <View
            style={{
              borderRadius: 10,
              width: '100%',
              backgroundColor: '#fff',
              padding: 20,
            }}>
            <StatusBar hidden />
            <Button
              title=""
              icon={{name: 'close', type: 'font-awsome'}}
              buttonStyle={{backgroundColor: 'rgba(0,0,0,0)'}}
              containerStyle={{alignSelf: 'flex-end'}}
              onPress={() => this.setState({visible: false, suc: false})}
            />
            <Text
              style={{
                fontWeight: 'bold',
                color: '#0372fe',
                fontSize: 18,
                alignSelf: 'center',
                marginBottom: 10,
              }}>
              {this.state.suc ? 'Booked successfully' : 'Confirm booking?'}
            </Text>
            <LottieView
              autoPlay
              style={{
                width: 100,
                height: 100,
                alignSelf: 'center',
                marginBottom: this.state.suc ? 20 : 0,
              }}
              source={this.state.suc ? success : mech}
              loop={!this.state.suc}
            />
            {!this.state.suc && (
              <Button
                title={'Confirm'}
                buttonStyle={{
                  backgroundColor: '#0372fe',
                  borderRadius: 10,
                  marginTop: 10,
                }}
                onPress={() => {
                  this.setState({suc: true});
                }}
              />
            )}
          </View>
        </ReactNativeModal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
