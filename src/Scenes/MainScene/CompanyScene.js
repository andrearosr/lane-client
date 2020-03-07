import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { List, ItemData, ErrorScene } from '../../components';

const query = gql`
  query Company($id: ID!) {
    company(id: $id) {
      id
      color
      name
      image
      employees {
        id
        name
        color
        image
        email
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

export default class CompanyScene extends PureComponent {
  render() {
    // Done (2) show the company info here.
    // todo: 3. would be extra cool to show the employee list and make it navigate to that user on tap.
    const { navigation } = this.props;
    const id = navigation.getParam('id');

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

            const { company } = data;
            return (
              <View>
                <ItemData item={company} />
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Employees</Text>
                  <List data={[]} onPress={(item) => navigation.navigate('UserScene', { id: item.id })} />
                </View>
              </View>
            )
          }}
        </Query>
      </View >
    );
  }
}
