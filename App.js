import React from 'react';
import { NativeRouter, Route, Link } from "react-router-native";
import Home from './pages/Home'
import SearchPage from './pages/SearchPage'

const App = () => {
  return (
    <NativeRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/search" component={SearchPage} />
    </NativeRouter>
  );
}

export default App
