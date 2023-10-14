import {
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNotes} from '../hooks/useProviderNotes';
import {useNavigation, useRoute} from '@react-navigation/native';
import {encryptText} from '../utils/crypto';
import {styles} from './styles';

export default function FormNoteScreen() {
  const navigation = useNavigation();
  const {addNotes, secretKey} = useNotes();
  const [note, setNote] = useState<string>('');
  const route: any = useRoute();

  useEffect(() => {
    if (route.params?.note) {
      setNote(route.params?.note);
    }
  }, [route.params]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#20274A',
        flex: 1,
        paddingHorizontal: 20,
      }}>
      <TextInput
        placeholder="Please input your note"
        style={styles.input}
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
