import {
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {useNotes} from '../hooks/useProviderNotes';
import {useNavigation} from '@react-navigation/native';
import {encryptText} from '../utils/crypto';

export default function FormNoteScreen() {
  const navigation = useNavigation();
  const {addNotes, secretKey} = useNotes();
  const [note, setNote] = useState<string>('');

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#20274A',
        flex: 1,
      }}>
      <TextInput
        placeholder="Please input your note"
        style={{
          borderWidth: 1,
          backgroundColor: '#445093',
          marginHorizontal: 10,
          marginTop: 10,
          paddingHorizontal: 20,
          borderRadius: 10,
        }}
        value={note}
        onChangeText={(text: string) => setNote(text)}
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
          onPress={async () => {
            if (note) {
              const value = encryptText(note, secretKey);
              addNotes(value);
              navigation.goBack();
            } else {
              Alert.alert('Oops!', 'Note is Required, please your input note');
            }
          }}>
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
