/* eslint-disable react/no-multi-comp */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-console */
import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
import {
  Button,
  CheckBox,
  Icon,
  Image,
  Input,
} from 'react-native-elements';
import {
  ImageManipulator,
  ImagePicker,
  Permissions,
  SecureStore,
} from 'expo';
import { createBottomTabNavigator } from 'react-navigation';
import { baseUrl } from '../shared/baseUrl';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: 20,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'space-between',
  },
  image: {
    margin: 10,
    width: 80,
    height: 60,
  },
  formInput: {
    margin: 20,
    width: '80%',
  },
  formCheckbox: {
    margin: 20,
    backgroundColor: null,
  },
  formButton: {
    margin: 60,
  },
});

class LoginTab extends Component {
  static navigationOptions = {
    title: 'Login',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name="sign-in"
        type="font-awesome"
        size={24}
        iconStyle={{ color: tintColor }}
      />
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      remember: false,
    };
  }

  componentDidMount() {
    SecureStore.getItemAsync('userinfo')
      .then((userdata) => {
        const userinfo = JSON.parse(userdata);
        if (userinfo) {
          this.setState({ username: userinfo.username });
          this.setState({ password: userinfo.password });
          this.setState({ remember: true });
        }
      });
  }

  handleLogin() {
    const {
      remember,
      password,
      username,
    } = this.state;

    console.log(JSON.stringify(this.state));
    if (remember) {
      SecureStore.setItemAsync(
        'userinfo',
        JSON.stringify({
          username,
          password,
        }),
      )
        .catch(error => console.log('Could not save user info', error));
    } else {
      SecureStore.deleteItemAsync('userinfo')
        .catch(error => console.log('Could not delete user info', error));
    }
  }

  render() {
    const {
      remember,
      password,
      username,
    } = this.state;

    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Input
          placeholder="Username"
          leftIcon={{ type: 'font-awesome', name: 'user-o' }}
          onChangeText={username => this.setState({ username })}
          value={username}
          containerStyle={styles.formInput}
        />
        <Input
          placeholder="Password"
          leftIcon={{ type: 'font-awesome', name: 'key' }}
          onChangeText={password => this.setState({ password })}
          value={password}
          containerStyle={styles.formInput}
        />
        <CheckBox
          title="Remember Me"
          checked={remember}
          center
          onPress={() => this.setState({ remember: !remember })}
          containerStyle={styles.formCheckbox}
        />
        <View style={styles.formButton}>
          <Button
            onPress={() => this.handleLogin()}
            title="Login"
            icon={(
              <Icon
                name="sign-in"
                type="font-awesome"
                color="white"
              />
            )}
            buttonStyle={{ backgroundColor: '#512DA8' }}
          />
        </View>
        <View style={styles.formButton}>
          <Button
            onPress={() => navigation.navigate('Register')}
            title="Register"
            clear
            icon={(
              <Icon
                name="user-plus"
                type="font-awesome"
                color="blue"
              />
            )}
            titleStyle={{ color: 'blue' }}
          />
        </View>
      </View>
    );
  }
}

class RegisterTab extends Component {
  static navigationOptions = {
    title: 'Register',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name="user-plus"
        type="font-awesome"
        size={24}
        iconStyle={{ color: tintColor }}
      />
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstname: '',
      imageUrl: `${baseUrl}images/logo.png`,
      lastname: '',
      password: '',
      remember: false,
      username: '',
    };
  }


  getImageFromCamera = async () => {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
      const capturedImage = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!capturedImage.cancelled) {
        this.processImage(capturedImage.uri);
      }
    }
  }

  getImageFromGallery = async () => {
    const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (cameraRollPermission.status === 'granted') {
      const libraryImage = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        mediaTypes: 'Images',
      });

      if (!libraryImage.cancelled) {
        this.processImage(libraryImage.uri);
      }
    }
  }

  processImage = async (imageUri) => {
    try {
      const processedImage = await ImageManipulator.manipulateAsync(
        imageUri,
        [
          { resize: { width: 400 } },
        ],
        { format: 'png' },
      );

      this.setState({ imageUrl: processedImage.uri });
    } catch (error) {
      console.log(error);
    }
  }

  handleRegister() {
    const {
      password,
      remember,
      username,
    } = this.state;

    console.log(JSON.stringify(this.state));

    if (remember) {
      SecureStore.setItemAsync(
        'userinfo',
        JSON.stringify({
          username,
          password,
        }),
      )
        .catch(error => console.log('Could not save user info', error));
    } else {
      SecureStore.deleteItemAsync('userinfo')
        .catch(error => console.log('Could not delete user info', error));
    }
  }

  render() {
    const {
      email,
      firstname,
      imageUrl,
      lastname,
      password,
      remember,
      username,
    } = this.state;
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: imageUrl }}
              // eslint-disable-next-line global-require
              loadingIndicatorSource={require('./images/logo.png')}
              style={styles.image}
            />
            <Button
              title="Camera"
              onPress={this.getImageFromCamera}
            />
            <Button
              title="Gallery"
              onPress={this.getImageFromGallery}
            />

          </View>
          <Input
            placeholder="Username"
            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
            onChangeText={username => this.setState({ username })}
            value={username}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder="Password"
            leftIcon={{ type: 'font-awesome', name: 'key' }}
            onChangeText={password => this.setState({ password })}
            value={password}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder="First Name"
            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
            onChangeText={firstname => this.setState({ firstname })}
            value={firstname}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder="Last Name"
            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
            onChangeText={lastname => this.setState({ lastname })}
            value={lastname}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder="Email"
            leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
            onChangeText={email => this.setState({ email })}
            value={email}
            containerStyle={styles.formInput}
          />
          <CheckBox
            title="Remember Me"
            checked={remember}
            center
            onPress={() => this.setState({ remember: !remember })}
            containerStyle={styles.formCheckbox}
          />
          <View style={styles.formButton}>
            <Button
              onPress={() => this.handleRegister()}
              title="Register"
              icon={(
                <Icon
                  name="user-plus"
                  type="font-awesome"
                  color="white"
                />
              )}
              buttonStyle={{ backgroundColor: '#512DA8' }}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const Login = createBottomTabNavigator(
  {
    Login: LoginTab,
    Register: RegisterTab,
  },
  {
    tabBarOptions: {
      activeBackgroundColor: '#9575CD',
      inactiveBackgroundColor: '#D1C4E9',
      activeTintColor: 'white',
      inactiveTintColor: 'gray',
    },
  },
);

export default Login;
