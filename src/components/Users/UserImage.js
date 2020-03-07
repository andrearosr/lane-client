import React, { memo } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  imageWrapper: {
    borderRadius: 40,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'rgba(0,0,0,0.2)',
    width: 80,
    height: 80,
    overflow: 'hidden'
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain'
  }
});

export default memo(({ user, style }) => (
  <View style={[styles.imageWrapper, style, { borderColor: user.color }]}>
    <Image style={styles.image} source={{ uri: user.image }} />
  </View>
));
