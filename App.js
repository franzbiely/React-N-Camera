/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import { RNCamera } from 'react-native-camera';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends React.PureComponent {
  state = {
    type: RNCamera.Constants.Type.back,
    view: 'camera',
    path : null
  }

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true, doNotSave:false };
      const data = await this.camera.takePictureAsync(options)
      this.setState({path : data.uri})
      console.log('Take Picture Response : ', data);
    }
  };
  flipCamera = function() {
    return this.setState({ 
      type: this.state.type === RNCamera.Constants.Type.back 
        ? RNCamera.Constants.Type.front 
        : RNCamera.Constants.Type.back 
    });
  } 
  flipView = function() {
    return this.setState({ 
      view: this.state.view === 'camera'
        ? 'image' 
        : 'camera'
    });
  }
  renderCamera() {
    const { type } = this.state
    return (
      <View style={styles.container}>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={type}
            flashMode={RNCamera.Constants.FlashMode.on}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
            onGoogleVisionBarcodesDetected={({ barcodes }) => {
              console.log(barcodes)
            }}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
          <TouchableOpacity
              onPress={this.takePicture.bind(this)}
              style = {styles.capture}
          >
              <Text style={{fontSize: 14}}> SNAP </Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={this.flipCamera.bind(this)}
              style = {styles.capture}
          >
              <Text style={{fontSize: 14}}> FLIP </Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={this.flipView.bind(this)}
              style = {styles.capture}
          >
              <Text style={{fontSize: 14}}> Change View </Text>
          </TouchableOpacity>
          
        </View>
      </View>
    )
  }
  renderImage() {
    console.log('renderImage', this.state.path)
    return (
      <View>
        <Image
          source={{ uri: this.state.path }}
          style={styles.preview}
        />
        <Text
          style = {styles.capture}
          onPress={() => this.setState({ view: 'camera' })}
        >Cancel
        </Text>
      </View>
    );
  }
  render() {
    
    return this.state.view === 'camera' ? this.renderCamera() : this.renderImage()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
});
