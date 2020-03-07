import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { ItemImage, ErrorScene } from '../../components';

const query = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      color
      name
      email
      image
      friends {
        id
        color
        name
        email
        image
      }
    }
  }
`;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  image: {
    marginBottom: 20,
  },
  text: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  textName: {
    fontSize: 32,
    marginBottom: 10,
  },
  textEmail: {
    fontSize: 18
  }
});

export default class UserScene extends PureComponent {
  render() {
    const { navigation } = this.props;
    const id = navigation.getParam('id');

    // Done (2) - displayed full user data that is contained in the user data object.

    // todo: 3. would be extra cool to include their company info, and if you tap on it you can go that CompanyScene.
    // if this is done correctly, we should be re-using components from the CompaniesScene.

    // todo: 4. would be even cooler to see a list of their friends, so I can tap on them an get more info about that user.
    // todo: 5. would be cool to make the user name and email updateable and saved ot the database, so we can let our users change their info.
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
            return (
              <React.Fragment>
                <ItemImage item={user} style={styles.image} />
                <View style={styles.text}>
                  <Text style={styles.textName}>{user.name}</Text>
                  <Text style={styles.textEmail}>{user.email}</Text>
                </View>
              </React.Fragment>
            )
          }}
        </Query>
      </View >
    );
  }
}
