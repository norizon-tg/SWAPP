import React from 'react';
import { View, Button, Text } from 'react-native'

import { FormLabel, FormInput } from 'react-native-elements'

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email:'', password:'', error:'', loading:false};
    }

    onLoginPress(){
        this.state({error:'', loading:true});

        const{email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() =>{
            this.state({error:'', loading:false});
            this.props.navigation.navigate('SocialFeedScreen');
        })
        .catch(()=> {
            this.state({error:'Authentication failed', loading:false});
        })
    }

    onSignUpPress(){
        this.state({error:'', loading:true});

        const{email, password} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() =>{
            this.state({error:'', loading:false});
            this.props.navigation.navigate('Browse');
        })
        .catch(()=> {
            this.state({error:'Authentication failed', loading:false});
        })
    }

    renderButtonOrLoading(){
        if(this.state.loading){
            return <Text> Loading </Text>
        }
        return <View>
            <Button
            onPres={this.onLoginPress.bind(this)}>Login</Button>
            <Button
            onPres={this.onSignUpPress.bind(this)}>SignUp</Button>
        </View> 
    }
    render() {
        return (
            <View>
                <FormLabel>Email</FormLabel>
                <FormInput onChangetext={email => this.state({email})} />
                <FormLabel>Email</FormLabel>
                <FormInput onChangetext={password => this.state({password})} />
                {this.renderButtonOrLoading()}
            </View>
        )
    }

}