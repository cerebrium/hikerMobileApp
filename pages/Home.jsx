import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Animated, TextInput } from 'react-native';
import backgroundImage from '../pictures/garrett-sears-mainPage.jpg';
import { useFonts, Caveat_700Bold } from '@expo-google-fonts/caveat';

const WidthMaker = (props) => {
    const [ locationInput, setLocationInput ] = useState('')

    // variables for the animations, don't use state since it is less efficient
    const growthWidth = useRef(new Animated.Value(0)).current  // Initial width
    const growthHeight = useRef(new Animated.Value(10)).current  // Intitial height
  
    React.useEffect(() => {
      Animated.timing(
        growthWidth,
        {
          toValue: 250,
          duration: 1000,
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
  
  const Home = () => {
    let [fontsLoaded] = useFonts({
      Caveat_700Bold
    })
  
    if (!fontsLoaded) {
      return (
        <View style={styles.container}>
        <ImageBackground source={backgroundImage} style={styles.image}>
        </ImageBackground>
      </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <ImageBackground source={backgroundImage} style={styles.image}>
            <WidthMaker style={styles.welcomeBox}>
              <Text style={styles.introText}>
                HIKEPANION
              </Text>
            </WidthMaker>
            <View>
                <TextInput
                    style={styles.inputBar}
                >

                </TextInput>
            </View>
            <StatusBar style="auto" />
          </ImageBackground>
        </View>
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
      fontFamily: 'Caveat_700Bold'
    }, 
    inputBar: {
        backgroundColor: "black",
        marginTop: 20,
        width: 200,
        height: 30,
        opacity: .7,
        color: "#DBDFEB",
        borderRadius: 20,
    }
  });

  export default Home