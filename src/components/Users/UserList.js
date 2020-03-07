import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UserImage from './UserImage';

const styles = StyleSheet.create({
  userList: {
    flexDirection: 'row',
    padding: 20
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

export default memo(({ user }) => (
  <View style={styles.userList}>
    <UserImage user={user} style={styles.image} />
    <View style={styles.text}>
      <Text style={styles.textName}>{user.name}</Text>
      <Text style={styles.textEmail}>{user.email}</Text>
    </View>
  </View>
));
