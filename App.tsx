/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import NoteScreen from './src/screens/NoteScreen';
import FormNoteScreen from './src/screens/FormNoteScreen';
import {ProviderNotes} from './src/hooks/useProviderNotes';
import AuthScreen from './src/screens/AuthScreen';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <ProviderNotes>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="Notes" component={NoteScreen} />
          <Stack.Screen name="FormNote" component={FormNoteScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProviderNotes>
  );
}

export default App;
