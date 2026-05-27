import React from 'react';
import { Provider } from 'react-redux';
import RootStack from './navigation/RootStack';
import { store } from './store';

export default function App() {
  return (
    <Provider store={store}>
        <RootStack />
    </Provider>
  ); 
}
