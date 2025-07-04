import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, } from 'react-native';
import AppNaivagator from './navigation/AppNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <AppNaivagator/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
