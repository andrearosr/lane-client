import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  companyList: {
    flexDirection: 'row',
    padding: 20
  }
});

export default memo(({ company }) => (
  <View style={styles.companyList}>
    <Text>{company.name}</Text>
  </View>
));
