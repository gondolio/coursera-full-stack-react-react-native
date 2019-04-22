/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {
  Card,
  ListItem,
} from 'react-native-elements';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = state => ({
  leaders: state.leaders,
});

function History() {
  const history = "Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.\n\nThe restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.";
  return (
    <Card title="Our History">
      <Text style={{ margin: 10, fontSize: 16 }}>
        {history}
      </Text>
    </Card>
  );
}

function CorporateLeadership(props) {
  const { leaders } = props;

  if (leaders != null) {
    const renderLeader = ({ item, index }) => (
      <ListItem
        key={index}
        title={item.name}
        titleStyle={{ fontWeight: 'bold' }}
        subtitle={item.description}
        subtitleStyle={{ color: '#6c757d' }} // #6c757d taken from Bootstrap blockquote-footer CSS
        hideChevron
        leftAvatar={{ source: { uri: baseUrl + item.image } }}
      />
    );

    let corporateLeaderCardBody;
    if (props.isLoading) {
      corporateLeaderCardBody = <Loading />;
    } else if (props.errMess) {
      corporateLeaderCardBody = <Text>{props.errMess}</Text>;
    } else {
      corporateLeaderCardBody = (
        <FlatList
          data={leaders}
          renderItem={renderLeader}
          keyExtractor={item => item.id.toString()}
        />
      );
    }

    return (
      <Card title="Corporate Leadership">
        {corporateLeaderCardBody}
      </Card>
    );
  }

  return (<View />);
}

class About extends Component {
  static navigationOptions = {
    title: 'About Us',
  };

  render() {
    const { leaders } = this.props;

    return (
      <ScrollView>
        <Animatable.View animation="fadeInDown" duration={2000}>
          <History />
          <CorporateLeadership
            leaders={leaders.leaders}
            isLoading={leaders.isLoading}
            errMess={leaders.errMess}
          />
        </Animatable.View>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(About);
