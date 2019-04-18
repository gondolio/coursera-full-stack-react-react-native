/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import {
  Alert,
  Text,
  ScrollView,
} from 'react-native';
import {
  Button,
  Card,
  Icon,
} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { MailComposer } from 'expo';

class Contact extends Component {
  static navigationOptions = {
    title: 'Contact Us',
  };

  static sendMail() {
    MailComposer.composeAsync({
      recipients: ['confusion@food.net'],
      subject: 'Enquiry',
      body: 'To whom it may concern:',
    })
      .catch(error => Alert.alert(`Unable to send mail:\n${error}`));
  }

  render() {
    return (
      <ScrollView>
        <Animatable.View animation="fadeInDown" duration={2000}>
          <Card title="Contact Information">
            <Text style={{ margin: 10, lineHeight: 50, fontSize: 18 }}>
              {`121, Clear Water Bay Road
Clear Water Bay, Kowloon
HONG KONG
Tel: +852 1234 5678
Fax: +852 8765 4321
Email:confusion@food.net`}
            </Text>
            <Button
              title=" Send Email"
              buttonStyle={{ backgroundColor: '#512DA8' }}
              icon={<Icon name="envelope-o" type="font-awesome" color="white" />}
              onPress={Contact.sendMail}
            />
          </Card>
        </Animatable.View>
      </ScrollView>
    );
  }
}

export default Contact;
