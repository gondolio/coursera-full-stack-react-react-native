/* eslint-disable react/jsx-filename-extension */

import React, { Component } from 'react';
import {
  Alert,
  Button,
  Picker,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';

const styles = StyleSheet.create({
  formRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20,
  },
  // Note formLabel and formItem will be inside formRow
  // so the flexDirection will be row, and formLabel will be 2x size formItem
  formLabel: {
    fontSize: 18,
    flex: 2,
  },
  formItem: {
    flex: 1,
  },
});
class Reservation extends Component {
    static navigationOptions = {
      title: 'Reserve Table',
    }

    static defaultState() {
      return ({
        guests: 1,
        smoking: false,
        date: '',
      });
    }

    constructor(props) {
      super(props);
      this.state = Reservation.defaultState();
    }

    resetForm() {
      this.setState(Reservation.defaultState());
    }

    confirmReservation() {
      // Stub for future code
      this.resetForm();
    }

    handleReservation() {
      const { date, guests, smoking } = this.state;

      Alert.alert(
        'Your Reservation OK?',
        `Number of guests: ${guests}\nSmoking? ${smoking ? 'Yes' : 'No'}\nDate and Time:${date}`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => this.resetForm(),
          },
          {
            text: 'OK',
            // eslint-disable-next-line no-confusing-arrow, no-console
            onPress: () => this.confirmReservation(),
          },
        ],
        { cancelable: false },
      );
    }

    render() {
      const todayDate = new Date().toISOString().split('T')[0];
      const {
        date,
        guests,
        smoking,
      } = this.state;

      return (
        <Animatable.View animation="zoomIn" duration={2000}>
          <ScrollView>
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Number of Guests</Text>
              <Picker
                style={styles.formItem}
                selectedValue={guests}
                onValueChange={itemValue => this.setState({ guests: itemValue })}
              >
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="6" value="6" />
              </Picker>
            </View>
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
              <Switch
                style={styles.formItem}
                value={smoking}
                trackColor="#512DA8"
                onValueChange={value => this.setState({ smoking: value })}
              />
            </View>
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Date and Time</Text>
              <DatePicker
                style={{ flex: 2, marginRight: 20 }}
                date={date}
                format=""
                mode="datetime"
                placeholder="Select Date and Time"
                minDate={todayDate}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                  },
                }}
                onDateChange={newDate => this.setState({ date: newDate })}
              />
            </View>
            <View style={styles.formRow}>
              <Button
                title="Reserve"
                color="#512DA8"
                onPress={() => this.handleReservation()}
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
          </ScrollView>
        </Animatable.View>
      );
    }
}

export default Reservation;
