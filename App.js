import { StatusBar } from 'expo-status-bar';
import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, Animated } from 'react-native';
import backgroundImage from './pictures/garrett-sears-mainPage.jpg';
import { useFonts, Caveat_700Bold } from '@expo-google-fonts/caveat';
import { NativeRouter, Route, Link } from "react-router-native";
import Home from './pages/Home'

const App = () => {
  return (
    <NativeRouter>
      <Route exacr path="/" component={Home} />
    </NativeRouter>
  );
}

export default App
