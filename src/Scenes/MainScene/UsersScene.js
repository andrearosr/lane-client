import React, { PureComponent } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { List } from '../../components';

import { ErrorScene } from '../../components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  }
});

const query = gql`
  query Users {
    users {
      id
      color
      name
      email
      image
    }
  }
`;

export default class UsersScene extends PureComponent {
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Query query={query}>
          {({ loading, error, data }) => {
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error) {
              return <ErrorScene message={error.message} />;
            }

            return (
              <List
                data={data.users}
                onPress={(item) => navigation.navigate('UserScene', { id: item.id })}
              />
            );
          }}
        </Query>
      </View>
    );
  }
}
