import React, { Component } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
    return {
        leaders: state.leaders
    }
};

function History() {
    return(
        <Card title='Our History'>
            <Text style={{margin: 10, fontSize: 16}}>
            Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.{"\n\n"}
            The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
           </Text>
        </Card>
    );
}

function CorporateLeadership(props) {
    const leaders = props.leaders;

    if (leaders != null) {
        const renderLeader = ({item, index}) => {
            return(
                <ListItem
                    key={index}
                    title={item.name}
                    titleStyle={{fontWeight: 'bold'}}
                    subtitle={item.description}
                    subtitleStyle={{color: '#6c757d'}} // #6c757d taken from Bootstrap blockquote-footer CSS
                    hideChevron={true}
                    leftAvatar={{ source: { uri: baseUrl + item.image}}}
                    />
            );
        };

        let corporateLeaderCardBody;
        if (props.isLoading) {
             corporateLeaderCardBody = <Loading />
        } 
        else if (props.errMess) {
            corporateLeaderCardBody = <Text>{props.errMess}</Text>
        }
        else {
            corporateLeaderCardBody = <FlatList
                data={leaders}
                renderItem={renderLeader}
                keyExtractor={item => item.id.toString()}
            />                
        }

        return(
            <Card title='Corporate Leadership'>
                {corporateLeaderCardBody}
            </Card>
        );
    }
    else {
        return(<View></View>)
    }
}

class About extends Component{

    static navigationOptions = {
        title: 'About Us'
    };
    
    render() {

        return(
            <ScrollView>
                <History />
                <CorporateLeadership 
                    leaders={this.props.leaders.leaders} 
                    isLoading={this.props.leaders.isLoading}
                    errMess={this.props.leaders.errMess}
                    />
            </ScrollView>
        );
    };
}

export default connect(mapStateToProps)(About);
