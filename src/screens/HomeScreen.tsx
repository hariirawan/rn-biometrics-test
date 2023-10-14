import {Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as Keychain from 'react-native-keychain';
import {useNavigation} from '@react-navigation/native';
import {useNotes} from '../hooks/useProviderNotes';

export default function HomeScreen() {
  const {setSecretKey} = useNotes();
  const navigation = useNavigation();

  async function load() {
    const username = 'hariirawan';
    const password = 'secretKey123';

    await Keychain.setGenericPassword(username, password, {
      accessControl:
        Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET_OR_DEVICE_PASSCODE,
      securityLevel: Keychain.SECURITY_LEVEL.SECURE_SOFTWARE,
      storage: Keychain.STORAGE_TYPE.RSA,
    });

    try {
      const credentials = await Keychain.getGenericPassword({});
      if (credentials) {
        console.log(credentials);
        setSecretKey(credentials?.password);
        navigation.navigate('Notes');
      } else {
        console.log('no credential');
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#20274A',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        style={{backgroundColor: '#7F92F9', padding: 10, borderRadius: 10}}>
        <Text>Authentication</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
