import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ItemImage from './ItemImage';

const styles = StyleSheet.create({
  container: {
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

export default memo(({ item, style }) => {
  return (
    <View style={styles.container}>
      <ItemImage item={item} style={styles.image} />
      <View style={styles.text}>
        <Text style={styles.textName}>{item.name}</Text>
        {item.email && <Text style={styles.textEmail}>{item.email}</Text>}
      </View>
    </View>
  );
})