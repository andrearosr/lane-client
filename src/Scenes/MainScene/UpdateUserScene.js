import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button
} from 'react-native';
import { gql } from 'apollo-boost';
import { Mutation } from "react-apollo";

const mutation = gql`
  mutation UpdateUser($user: UserInput!) {
    updateUser(user: $user) {
      id
      name
    }
  }
`;

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#888'
  },
  label: {

  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    padding: 10,
  }
});

export default class UpdateUserScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    const user = navigation.getParam('user');
    this.setState({
      name: user.name,
      email: user.email,
    });
  }

  updateFieldValue = (field) => (value) => {
    this.setState({ [field]: value });
  }

  onSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    console.log(this.state)
    return (
      <Mutation mutation={mutation}>
        {(updateUser, { data }) => {
          return (
            <View style={styles.container}>
              <Text style={styles.header}>Update User</Text>
              <Text style={styles.label}>Name</Text>
              <TextInput style={styles.input} onChangeText={this.updateFieldValue('name')} value={this.state.name} />
              <Text style={styles.label}>Email</Text>
              <TextInput style={styles.input} onChangeText={this.updateFieldValue('email')} value={this.state.email} />
              <Button title="Save" onPress={this.onSubmit} />
            </View>
          )
        }}
      </Mutation>
    );
  }
}