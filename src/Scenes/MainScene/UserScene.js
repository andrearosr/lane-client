import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Button
} from 'react-native';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { List, ListItem, ItemData, ErrorScene } from '../../components';

const query = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      color
      name
      email
      image
      address {
        city
        state
        zipCode
        country
        streetAddress
        secondaryAddress
      }
      friends {
        id
        color
        name
        email
        image
      }
      company {
        id
        color
        name
        image
      }
    }
  }
`;

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  section: {
    marginTop: 10,
    paddingTop: 10
  },
  sectionTitle: {
    fontSize: 24,
    marginBottom: 10
  },
  updateButton: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#0074D9',
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  updateButtonText: {
    fontWeight: 'bold',
    color: 'white'
  }
});

export default class UserScene extends PureComponent {
  render() {
    const { navigation } = this.props;
    const id = navigation.getParam('id');

    // Done (2) - displayed full user data that is contained in the user data object.

    // Done (3) - include their company info, and if you tap on it you can go that CompanyScene. Re-used presentation components

    // Done (4) - see a list of their friends, so I can tap on them an get more info about that user.
    // Done (5) - would be cool to make the user name and email updateable and saved ot the database, so we can let our users change their info.
    return (
      <View style={styles.container}>
        <Query query={query} variables={{ id }}>
          {({ loading, error, data }) => {
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error) {
              return <ErrorScene message={error.message} />;
            }

            const { user } = data;
            const {
              streetAddress,
              secondaryAddress,
              city,
              state,
              zipCode,
              country
            } = user.address;

            return (
              <View>
                <ItemData item={user} />
                <Button title="Edit User" onPress={() => navigation.navigate('UpdateUserScene', { user })} />
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Company</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('CompanyScene', { id: user.company.id })}>
                    <ListItem item={user.company} />
                  </TouchableOpacity>
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Address</Text>
                  <Text>{streetAddress}</Text>
                  <Text>{secondaryAddress}</Text>
                  <Text>{city}, {state} {zipCode}</Text>
                  <Text>{country}</Text>
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Friends</Text>
                  <List data={user.friends} onPress={(item) => navigation.navigate('UserScene', { id: item.id })} />
                </View>
              </View>
            )
          }}
        </Query>
      </View >
    );
  }
}
