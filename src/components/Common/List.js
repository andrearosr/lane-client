import React, { memo } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import ListItem from './ListItem';

export default memo(({ data, onPress }) => (
  <FlatList
    data={data}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <TouchableOpacity onPress={() => onPress(item)}>
        <ListItem item={item} />
      </TouchableOpacity>
    )}
  />
));