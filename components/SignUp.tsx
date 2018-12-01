import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AppRegistry, View, TextInput, Text} from 'react-native';
import {FormLabel, FormInput, FormValidationMessage, Button, Form} from 'react-native-elements';
import firebase from 'firebase';


class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state=({
      firstName:'',
      lastName:'',
      userName:'',
      email:'',
      password:''
    })
  }
  signUp = (email,password) => {
        try{
          firebase.auth().createUserWithEmailAndPassword(email,password)
        }
        catch(error){
          console.log(error.toString())
        }
      }
  render() {
    return (
    <View>
      <FormLabel>First Name</FormLabel>
      <FormInput
      onChangeText={(firstName) => this.setState({firstName})}
      />
      <FormLabel>Last Name</FormLabel>
      <FormInput
      onChangeText={(lastName) => this.setState({lastName})}
      />
      <FormLabel>User Name</FormLabel>
      <FormInput
      onChangeText={(userName) => this.setState({userName})}
      />
      <FormLabel>Email</FormLabel>
      <FormInput
        onChangeText={(email) => this.setState({email})}
      />
      <FormLabel>Password</FormLabel>
      <FormInput
        onChangeText={(password) => this.setState({password})}
      />
      <Button
        raised
        backgroundColor='#3E9428'
        title='Sign Up'
        onPress={() => this.signUp(this.state.email, this.state.password)}
        />
      </View>
    )
  }
}


export default connect(null)(SignUp);