import 'react-native-gesture-handler';
import React, { createContext } from 'react';
import RootNavigator from './src/routes/RootRouter';
import ContextProviders from './src/context/ContextProviders';

const App = () => {
  return (
    <ContextProviders>
      <RootNavigator />
    </ContextProviders>
  );
};

export default App;