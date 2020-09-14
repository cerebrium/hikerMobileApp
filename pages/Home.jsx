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
    const growthHeight = useRef(new Animated.Value(0)).current  // Intitial height
    
    React.useEffect(() => {
      Animated.timing(
        growthWidth,
        {
          toValue: 270,
          duration: 1000,
          delay: 2000,
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
            duration: 2000,
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

const HeightMaker = (props) => {
    // variables for the animations, don't use state since it is less efficient
    const growthHeight = useRef(new Animated.Value(10)).current  // Intitial height
      
      React.useEffect(() => {
        Animated.timing(
          growthHeight,
          {
            // delay: 2000,
            toValue: 100,
            duration: 2000,
            useNativeDriver: false
          }
          ).start();
        }, [growthHeight])
        
        return (
          <Animated.View                 // Special animatable View
          style={{
            ...props.style,
            height: growthHeight   
          }}
          >
            {props.children}
          </Animated.View>
    );
  }

  // box for bottom
  const BottomBoxMaker = (props) => {
    // variables for the animations, don't use state since it is less efficient
    const growthWidth = useRef(new Animated.Value(0)).current  // Initial width
    const growthHeight = useRef(new Animated.Value(0)).current  // Intitial height
    
    React.useEffect(() => {
      Animated.timing(
        growthWidth,
        {
          toValue: 300,
          duration: 1000,
          delay: 2000,
          useNativeDriver: false
        }
        ).start();
      }, [growthWidth])
      
      React.useEffect(() => {
        Animated.timing(
          growthHeight,
          {
            delay: 1000,
            toValue: 150,
            duration: 2000,
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

// top opacity change  
const TitleOpacity = (props) => {
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
            <TitleOpacity>
              <Text 
                style={styles.introText}
              >
                HIKEPANION
              </Text>
            </TitleOpacity>
          </WidthMaker>
          <HeightMaker style={styles.middleBar}></HeightMaker>
          <BottomBoxMaker style={styles.bottomBox}>
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
          </BottomBoxMaker>
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
      marginTop: 30,
      borderRadius: 20,
      marginBottom: 0,
      height: 90,
      width: 270,
      height: 100,

      // bottom
      borderBottomColor: 'rgba(0, 0, 0, .75)',
      borderBottomWidth: 4,
      borderBottomRightRadius: 50,
      borderBottomLeftRadius: 50,

      // right
      borderRightColor: 'rgba(0, 0, 0, .75)',
      borderRightWidth: 4,

      // left
      borderLeftColor: 'rgba(0, 0, 0, .75)',
      borderLeftWidth: 4,

      //top
      borderTopColor: 'rgba(0, 0, 0, .75)',
      borderTopWidth: 4,
      borderTopRightRadius: 50,
      borderTopLeftRadius: 50,

      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    middleBar: {
      width: 4,
      opacity: .75,
      backgroundColor: 'black',
    },
    introText: {
      fontSize: 35,
      color: "black",
      padding: 10,
      fontFamily: 'Noteworthy',
      opacity: .75
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
    bottomBox: {
      height: 170,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      

      // bottom
      borderBottomColor: 'rgba(0, 0, 0, 0.75)',
      borderBottomWidth: 4,
      borderBottomRightRadius: 50,
      borderBottomLeftRadius: 50,

      // right
      borderRightColor: 'rgba(0, 0, 0, 0.75)',
      borderRightWidth: 4,

      // left
      borderLeftColor: 'rgba(0, 0, 0, 0.75)',
      borderLeftWidth: 4,

      //top
      borderTopColor: 'rgba(0, 0, 0, 0.75)',
      borderTopWidth: 4,
      borderTopRightRadius: 50,
      borderTopLeftRadius: 50,
    },
    searchView: {

    },
    searchLabel: {
      padding: 0,
      fontSize: 20,
      fontFamily: 'Noteworthy',
      opacity: .75
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
      fontFamily: 'Noteworthy',
      shadowOffset: {
        width: -1,
        height: 3
      },
      shadowOpacity: 1
    },
    searchText: {
      color: "white",
      fontSize: 18,
      fontFamily: 'Noteworthy'
    }
  });

  export default Home