import {
  Text,
  SafeAreaView,
  FlatList,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useNotes} from '../hooks/useProviderNotes';
import {decryptText} from '../utils/crypto';

export default function NoteScreen() {
  const navigation = useNavigation();
  const {notes, secretKey} = useNotes();

  return (
    <SafeAreaView style={{backgroundColor: '#20274A', flex: 1}}>
      <StatusBar backgroundColor={'#20274A'} />
      <FlatList
        data={notes}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('FormNote', {
                  note: decryptText(item, secretKey),
                })
              }
              style={{
                backgroundColor: '#445093',
                borderRadius: 12,
                paddingHorizontal: 15,
                paddingVertical: 20,
                marginHorizontal: 20,
              }}>
              <Text style={{color: 'white'}}>
                {decryptText(item, secretKey)}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      <View style={{position: 'absolute', left: 20, bottom: 10, right: 20}}>
        <TouchableOpacity
          style={{
            backgroundColor: '#7F92F9',
            padding: 15,
            paddingHorizontal: 30,
            alignSelf: 'center',
            borderRadius: 10,
          }}
          onPress={() => navigation.navigate('FormNote')}>
          <Text>Add New Note</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
