import {Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#20274A',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        style={{backgroundColor: '#7F92F9', padding: 10, borderRadius: 10}}
        onPress={() => navigation.navigate('Auth')}>
        <Text>Authentication</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
