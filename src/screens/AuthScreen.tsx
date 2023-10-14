import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as Keychain from 'react-native-keychain';
import {useNotes} from '../hooks/useProviderNotes';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';

export default function AuthScreen() {
  const {setSecretKey} = useNotes();
  const navigation = useNavigation();
  const [isSupportBiometric, setIsSupportBiometric] = useState(false);

  const username = 'hariirawan';
  const password = 'secretKey123';

  const [name, setName] = useState('');
  const [pass, setPass] = useState('');

  async function load() {
    await Keychain.setGenericPassword(username, password, {
      accessControl:
        Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET_OR_DEVICE_PASSCODE,
      securityLevel: Keychain.SECURITY_LEVEL.SECURE_SOFTWARE,
      storage: Keychain.STORAGE_TYPE.RSA,
    });

    try {
      const credentials = await Keychain.getGenericPassword({});
      if (credentials) {
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
    Keychain.getSupportedBiometryType({}).then(biometryType => {
      if (biometryType === Keychain.BIOMETRY_TYPE.FINGERPRINT) {
        load();
        setIsSupportBiometric(true);
      }
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#20274A',
        flex: 1,
        justifyContent: 'center',
      }}>
      <View style={{padding: 10}}>
        <Text style={{color: 'white', fontSize: 25}}>Notetaking</Text>
        <View>
          <TextInput
            placeholder="Username"
            style={styles.input}
            placeholderTextColor={'white'}
            value={name}
            onChangeText={text => setName(text)}
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            placeholderTextColor={'white'}
            secureTextEntry
            value={pass}
            onChangeText={text => setPass(text)}
          />
          <TouchableOpacity
            style={[styles.button, {width: '100%'}]}
            onPress={() => {
              if (username == name && password == pass) {
                setSecretKey(name);
                navigation.navigate('Notes');
              } else {
                Alert.alert('Oopps!', 'Please input Username & Password!');
              }
            }}>
            <Text style={{textAlign: 'center', color: 'white'}}>Login</Text>
          </TouchableOpacity>
          {isSupportBiometric && (
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => {
                load();
              }}>
              <Text style={{textAlign: 'center', color: 'white'}}>
                Biometrik
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
