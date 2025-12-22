import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import WorkerItem from './workerItem';

interface IProps {
  navigation: any;
}

export default function ListWorkers({ navigation }: IProps) {
  const workerData = useSelector((state: unknown) => state.workers.workerData);
  console.log('🚀 ~ ListWorkers ~ workerData:', workerData);
  return (
    <FlatList
      data={workerData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <WorkerItem
          worker={item}
          onHandlePress={() =>
            navigation.navigate('WorkerDetail', { workerId: item.id })
          }
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  listWorkersContainer: {
    flex: 1,
    gap: 10,
  },
});
