/* eslint-disable react/jsx-filename-extension */

import React, { Component } from 'react';
import {
  Button,
  Modal,
  Picker,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import DatePicker from 'react-native-datepicker';

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
  modal: {
    justifyContent: 'center',
    margin: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#512DA8',
    textAlign: 'center',
    color: 'white',
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    margin: 10,
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
        showModal: false,
      });
    }

    constructor(props) {
      super(props);
      this.state = Reservation.defaultState();
    }

    toggleModal() {
      const { showModal } = this.state;
      this.setState({ showModal: !showModal });
    }

    handleReservation() {
      this.toggleModal();
    }

    resetForm() {
      this.setState(Reservation.defaultState());
    }

    render() {
      const todayDate = new Date().toISOString().split('T')[0];
      const {
        date,
        guests,
        showModal,
        smoking,
      } = this.state;

      return (
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
          <Modal
            animationType="slide"
            transparent={false}
            visible={showModal}
            onDismiss={() => { this.resetForm(); }}
            onRequestClose={() => { this.resetForm(); }}
          >
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>Your Reservation</Text>
              <Text style={styles.modalText}>
                {`Number of Guests: ${guests}`}
              </Text>
              <Text style={styles.modalText}>
                {`Smoking? ${smoking ? 'Yes' : 'No'}`}
              </Text>
              <Text style={styles.modalText}>
                {`Date and Time: ${date}`}
              </Text>
              <Button
                onPress={() => { this.resetForm(); }}
                color="#512DA8"
                title="Close"
              />
            </View>
          </Modal>
        </ScrollView>
      );
    }
}

export default Reservation;
