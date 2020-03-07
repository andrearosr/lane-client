import React, { PureComponent } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import { ErrorScene, List } from '../../components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  }
});

const query = gql`
  query Companies {
    companies {
      id
      color
      name
      image
    }
  }
`;

export default class CompaniesScene extends PureComponent {
  render() {
    // Done (2) -  queried the graphql server for companies and displayed them here.
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
                data={data.companies}
                onPress={item => navigation.navigate('CompanyScene', { id: item.id })}
              />
            );
          }}
        </Query>
      </View>
    );
  }
}
