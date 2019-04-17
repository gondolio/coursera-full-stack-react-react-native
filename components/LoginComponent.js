/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-console */
import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  View,
} from 'react-native';
import {
  Input,
  CheckBox,
} from 'react-native-elements';
import { SecureStore } from 'expo';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: 20,
  },
  formInput: {
    margin: 40,
    width: "80%",
  },
  formCheckbox: {
    margin: 40,
    backgroundColor: null,
  },
  formButton: {
    margin: 60,
  },
});

class Login extends Component {
  static navigationOptions = {
    title: 'Login',
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
            color="#512DA8"
          />
        </View>
      </View>
    );
  }
}

export default Login;
