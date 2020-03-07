import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ItemImage from './ItemImage';

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
  },
  text: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  textName: {
    fontSize: 24,
  },
  textEmail: {
    fontSize: 18
  },
  image: {
    marginRight: 20,
  }
});

export default memo(({ item }) => (
  <View style={styles.container}>
    <ItemImage item={item} style={styles.image} />
    <View style={styles.text}>
      <Text style={styles.textName}>{item.name}</Text>
      {item.email && <Text style={styles.textEmail}>{item.email}</Text>}
    </View>
  </View>
));