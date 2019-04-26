import React, { Component } from 'react';
import { Image, NetInfo, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-root-toast';
import { Icon } from 'react-native-elements';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Reservation from './ReservationComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';
import { createDrawerNavigator, createStackNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { fetchComments, fetchDishes, fetchLeaders, fetchPromos } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
    }
};

const mapDispatchToProps = dispatch => ({
    fetchComments: () => dispatch(fetchComments()),
    fetchDishes: () => dispatch(fetchDishes()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    fetchPromos: () => dispatch(fetchPromos()),
});

const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu,
        navigationOptions: ({ navigation }) => ({ // navigationOptions can be an object or be a function that takes in props 
            headerLeft: <Icon name='menu' size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()}
            />
        }) }, 
    Dishdetail: { screen: Dishdetail }, 
}, {
    initialRouteName: 'Menu',
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        }
    }
});

const HomeNavigator = createStackNavigator({
    Home: { screen: Home },
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24}
            color='white'
            onPress={() => navigation.toggleDrawer()}
        />
    })
});

const ContactNavigator = createStackNavigator({
    Contact: { screen: Contact },
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24}
            color='white'
            onPress={() => navigation.toggleDrawer()}
        />
    })
});

const AboutNavigator = createStackNavigator({
    About: { screen: About },
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24}
            color='white'
            onPress={() => navigation.toggleDrawer()}
        />
    })
});

const ReservationNavigator = createStackNavigator({
    Reservation: { screen: Reservation },
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24}
            color='white'
            onPress={() => navigation.toggleDrawer()}
        />
    })
});

const FavoritesNavigator = createStackNavigator({
    Favorites: { screen: Favorites },
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24}
            color='white'
            onPress={() => navigation.toggleDrawer()}
        />
    })
});

const LoginNavigator = createStackNavigator({
    Login: { screen: Login },
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24}
            color='white'
            onPress={() => navigation.toggleDrawer()}
        />
    })
});

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <SafeAreaView style={styles.container}
            forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={styles.drawerHeader}>
                <View style={{flex: 1}}>
                    <Image source={require('./images/logo.png')}
                        style={styles.drawerImage} />
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                </View>
            </View>
            <DrawerItems {...props}></DrawerItems>
        </SafeAreaView>
    </ScrollView>
);

const MainNavigator = createDrawerNavigator({
    Login: {
        screen: LoginNavigator,
        navigationOptions: {
            title: 'Login',
            drawerLabel: 'Login',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='sign-in'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='home'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    Menu: {
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawerLabel: 'Menu',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='list'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }    
    },
    Contact: {
        screen: ContactNavigator,
        navigationOptions: {
            title: 'Contact Us',
            drawerLabel: 'Contact Us',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='address-card'
                    type='font-awesome'
                    size={22} // 24 seems a bit big
                    color={tintColor}
                />
            )

        }    
    },
    About: {
        screen: AboutNavigator,
        navigationOptions: {
            title: 'About Us',
            drawerLabel: 'About Us',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='info-circle'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }    
    },
    Favorites: {
        screen: FavoritesNavigator,
        navigationOptions: {
            title: 'My Favorites',
            drawerLabel: 'My Favorites',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='heart'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )

        }    
    },
    Reservation: {
        screen: ReservationNavigator,
        navigationOptions: {
            title: 'Reserve Table',
            drawerLabel: 'Reserve Table',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='cutlery'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )

        }    
    },
}, {
    initialRouteName: 'Home',
    drawerBackgroundColor: '#D1C4E9',
    contentComponent: CustomDrawerContentComponent,
})

class Main extends Component {

    componentDidMount() {
        this.props.fetchComments();
        this.props.fetchDishes();
        this.props.fetchLeaders();
        this.props.fetchPromos();

        NetInfo.getConnectionInfo()
            .then((connectionInfo) => {
                Toast.show(
                    `Initial Network Connectivity Type: ${connectionInfo.type}, effectiveType: ${connectionInfo.effectiveType}`,
                    { duration: Toast.durations.LONG },
                )
            });
        
        NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillUnmount() {
        NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange = (connectionInfo) => {
        switch (connectionInfo.type) {
            case 'none':
                Toast.show('You are now offline!', { duration: Toast.durations.LONG });
                break;
            case 'wifi':
                Toast.show('You are now connected to WiFi!', { duration: Toast.durations.LONG });
                break;
            case 'cellular':
                Toast.show('You are now connected to Cellular!', { duration: Toast.durations.LONG });
                break;
            case 'unknown':
                Toast.show('You now have an unknown connection!', { duration: Toast.durations.LONG });
                break;
            default:
                break;
        }
    }

    render() {
        return(
            <View style={{ flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                <MainNavigator />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);