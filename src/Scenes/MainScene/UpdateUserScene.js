import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator
} from 'react-native';
import { gql } from 'apollo-boost';
import { Mutation } from "react-apollo";
import { ErrorScene } from '../../components';

const mutation = gql`
  mutation UpdateUser($user: UserInput!) {
    updateUser(user: $user) {
      id
      name
      email
    }
  }
`;

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#888'
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    padding: 10,
  },
  successMessage: {
    fontSize: 24,
    textAlign: 'center',
    color: '#39CCCC',
    marginTop: 40,
  }
});

export default class UpdateUserScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      id: ''
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    const user = navigation.getParam('user');
    this.setState({
      name: user.name,
      email: user.email,
      id: user.id
    });
  }

  updateFieldValue = (field) => (value) => {
    this.setState({ [field]: value });
  }

  onSuccess = () => {
    this.props.navigation.navigate('UserScene', { id: this.state.id });
  }

  render() {
    // Build a form using Mutation component
    // Allows changing the name and email
    // Would be nice (hehe) to go back automatically to the user page on save (1) and validate name, the required field (1)  
    return (
      <Mutation mutation={mutation}>
        {(updateUser, { data, loading, error }) => {
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error) {
            return <ErrorScene message={error.message} />;
          }

          return (
            <View style={styles.container}>
              <Text style={styles.header}>Update User</Text>
              <Text>Name</Text>
              <TextInput style={styles.input} onChangeText={this.updateFieldValue('name')} value={this.state.name} />
              <Text>Email</Text>
              <TextInput style={styles.input} onChangeText={this.updateFieldValue('email')} value={this.state.email} />
              <Button title="Save" onPress={() => updateUser({ variables: { user: this.state } })} />
              {data && (
                <React.Fragment>
                  <Text style={styles.successMessage}>Success!</Text>
                  <Button onPress={this.onSuccess} title="Go Back" />
                </React.Fragment>
              )}
            </View>
          )
        }}
      </Mutation>
    );
  }
}