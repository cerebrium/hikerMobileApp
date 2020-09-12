import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Animated, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import backgroundImage from '../pictures/garrett-sears-mainPage.jpg';
import { useFonts, Caveat_700Bold } from '@expo-google-fonts/caveat';
import { Link } from "react-router-native";
import _ from 'lodash'

const WidthMaker = (props) => {
    // variables for the animations, don't use state since it is less efficient
    const growthWidth = useRef(new Animated.Value(0)).current  // Initial width
    const growthHeight = useRef(new Animated.Value(10)).current  // Intitial height
    
    React.useEffect(() => {
      Animated.timing(
        growthWidth,
        {
          toValue: 250,
          duration: 1000,
          useNativeDriver: false
        }
        ).start();
      }, [growthWidth])
      
      React.useEffect(() => {
        Animated.timing(
          growthHeight,
          {
            delay: 1000,
            toValue: 100,
            duration: 1000,
            useNativeDriver: false
          }
          ).start();
        }, [growthHeight])
        
        return (
          <Animated.View                 // Special animatable View
          style={{
            ...props.style,
            width: growthWidth,
            height: growthHeight   
          }}
          >
        {props.children}
      </Animated.View>
    );
  }
  
  // make the search bar appear after the intro animation
const SearchOpacity = (props) => {
  const viewOpacity = useRef(new Animated.Value(0)).current // set initial opacity to zero

  // make the effect
  React.useEffect(() => {
    Animated.timing(
      viewOpacity,
      {
        delay: 3000,
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }
    ).start()
  }, [viewOpacity])

  // return the animatable view
  return (
    <Animated.View
    style={{
      ...props.style,
      opacity: viewOpacity
    }}
    >
      {props.children}
    </Animated.View>
  )
}

const Home = () => {
  const [ inputText, setInputText ] = useState('')

  let [fontsLoaded] = useFonts({
    Caveat_700Bold
  })

  // load the font before rendering
  if (!fontsLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={backgroundImage} style={styles.image}>
        </ImageBackground>
      </SafeAreaView>
    )
  } else {
    return (
      <SafeAreaView
        style={styles.container}
      >
        <ImageBackground 
          source={backgroundImage} 
          style={styles.image}
        >
          <WidthMaker 
            style={styles.welcomeBox}
          >
            <Text 
              style={styles.introText}
            >
              HIKEPANION
            </Text>
          </WidthMaker>
          <SearchOpacity
            style={styles.searchView}
          >
            <Text 
              style={styles.searchLabel}
            >
              Search Locations:
            </Text>
            <TextInput
              style={styles.inputBar}
              placeholder='Ex: Seattle'
              onChangeText={inputText => setInputText(inputText)}
              defaultValue={inputText}
            />
              <TouchableOpacity
              // onPress={handlePress}
                style={styles.buttonStyle}
              >
                <Link to={`/search/:${inputText}`}>
                  <Text 
                    style={styles.searchText}
                  >
                    Search
                  </Text>
                </Link>
              </TouchableOpacity>
          </SearchOpacity>
          <StatusBar style="auto" />
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      alignItems: "center"
    },
    welcomeBox: {
      marginTop: 150,
      borderRadius: 20,
      height: 100,
      width: 250,
      backgroundColor: "black",
      opacity: .7,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    introText: {
      fontSize: 34,
      color: "#DBDFEB",
      padding: 10,
      // fontFamily: 'Caveat_700Bold'
    }, 
    inputBar: {
      backgroundColor: "black",
      padding: 3,
      marginTop: 1,
      width: 240,
      height: 35,
      opacity: .7,
      color: "#DBDFEB",
      borderRadius: 5,
    },
    searchView: {
    },
    searchLabel: {
      marginTop: 20,
      padding: 0,
      fontSize: 20
    },
    buttonStyle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "black",
      color: "white",
      opacity: .7,
      marginTop: 10,
      width: 150,
      borderRadius: 20,
      height: 40,
      shadowColor: "black",
      shadowOffset: {
        width: -1,
        height: 3
      },
      shadowOpacity: 1
    },
    searchText: {
      color: "white",
      fontSize: 18,
    }
  });

  export default Home