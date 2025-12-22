import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IWorker } from '../../interfaces/worker';
import { globalStyle } from '../../styles/globalStyle';
import ButtonCustom from './ui/button';

interface IProps {
  worker: IWorker;
  inlineImageLeft?: string;
  onHandlePress: () => void;
}

export default function WorkerItem({
  worker,
  onHandlePress,
  inlineImageLeft,
}: IProps) {
  return (
    <SafeAreaView>
      <TouchableHighlight
        underlayColor={globalStyle.warning}
        onPress={onHandlePress}
        style={styles.worker}
      >
        <View>
          <Image
            source={require('../../assets/img/3.jpg')}
            style={styles.workerImage}
          />
          <Text style={styles.workerName}>
            {worker.firstName} {worker.lastName}
          </Text>
          <Text style={styles.workerPhone}>{worker.phone}</Text>
          <View style={styles.footerWorkerItem}>
            <ButtonCustom
              label='Modifier'
              onHandlePress={() => console.log('Modifier')}
              iconName='edit'
            />
            <ButtonCustom
              label='Supprimer'
              onHandlePress={() => console.log('Supprimer')}
              iconName='delete'
            />
          </View>
        </View>
      </TouchableHighlight>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  worker: {
    height: 300,
    width: '100%',
    padding: 10,
    backgroundColor: globalStyle.white,
  },
  workerImage: {
    width: '100%',
    height: '70%',
    objectFit: 'cover',
  },
  workerName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  workerPhone: {
    fontSize: 15,
    marginTop: 10,
  },
  footerWorkerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: 10,
    width: '100%',
  },
});
