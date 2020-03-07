import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { List, ItemData, ErrorScene } from '../../components';

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
  },
  section: {
    marginTop: 10,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 24,
  }
});

export default class UserScene extends PureComponent {
  render() {
    const { navigation } = this.props;
    const id = navigation.getParam('id');

    // Done (2) - displayed full user data that is contained in the user data object.

    // todo: 3. would be extra cool to include their company info, and if you tap on it you can go that CompanyScene.
    // if this is done correctly, we should be re-using components from the CompaniesScene.

    // Done (4) - see a list of their friends, so I can tap on them an get more info about that user.
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
              <View>
                <ItemData item={user} />
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
