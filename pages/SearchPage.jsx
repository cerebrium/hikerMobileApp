import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, Animated, ScrollView, SafeAreaView, Image} from 'react-native';
import backgroundImage from '../pictures/forest.jpg'

const SearchPage = () => {
    const [ data, setData ] = useState([])
    const [ renderArray, setRenderArray ] = useState([])

    // map some sample data
    useEffect( () => {
        let exampleObject = {
            "ascent": 2022,
            "conditionDate": "2020-08-21 15:33:51",
            "conditionDetails": "Dry - dusty, cold, windy.",
            "conditionStatus": "All Clear",
            "descent": -2058,
            "difficulty": "blueBlack",
            "high": 6914,
            "id": 7013152,
            "imgMedium": "https://cdn2.apstatic.com/photos/hike/7012490_medium_1554821374.jpg",
            "imgSmall": "https://cdn2.apstatic.com/photos/hike/7012490_small_1554821374.jpg",
            "imgSmallMed": "https://cdn2.apstatic.com/photos/hike/7012490_smallMed_1554821374.jpg",
            "imgSqSmall": "https://cdn2.apstatic.com/photos/hike/7012490_sqsmall_1554821374.jpg",
            "latitude": 48.5168,
            "length": 7.2,
            "location": "Stehekin, Washington",
            "longitude": -120.7358,
            "low": 4873,
            "name": "Heather/Maple Pass Loop",
            "starVotes": 41,
            "stars": 4.9,
            "summary": "The best day hike in the area for fantastic panoramic views!",
            "type": "Recommended Route",
            "url": "https://www.hikingproject.com/trail/7013152/heathermaple-pass-loop",
          }
    
        let exampleArray = []
        for (let i = 0; i < 10; i++) {
            exampleArray.push(exampleObject)
        }
        setData(exampleArray)
    }, [])

    // when there is data, render the images and hikes
    useEffect( () => {
        let finalArray = []
        if (data.length > 0) {
            data.forEach( (hike, hikeId) => {
                finalArray.push(
                    <View 
                        style={styles.hikeDisplay}
                        key={hikeId}
                    >
                        <Text style={styles.titleHikes}>
                            {hike.name}
                        </Text>
                        <Text style={styles.description}>
                            {hike.location}
                        </Text>
                        <View style={styles.horizontalRule}></View>
                        <Text style={styles.description}>
                            Description: {hike.summary}
                        </Text>
                        <Text style={styles.stats}>
                            Stars: {hike.stars}
                        </Text>
                        <Text style={styles.stats}>
                            Status: {hike.conditionStatus}
                        </Text>
                        <Text style={styles.stats}>
                            Ascent: {hike.ascent}'
                        </Text>
                        <Text style={styles.stats}>
                            Total Miles: {hike.length}
                        </Text>
                        {/* <View style={styles.horizontalRule}></View> */}
                        <Image 
                            source={{uri: hike.imgSmall}}
                            style={styles.imageStyle}
                        />
                    </View>
                )
            })
        }
        setRenderArray(finalArray)
    }, [data])

    return (
        <>
            <SafeAreaView style={styles.mainContainer}>
                <ImageBackground source={backgroundImage} style={styles.image}>
                    <View style={styles.darkOverlayContainer}> 
                    </View>
                    <ScrollView>
                        {renderArray}
                    </ScrollView>
                </ImageBackground>
            </SafeAreaView>
        </>
    )
} 

// styles
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        alignItems: "center"
    },
    darkOverlayContainer: {
        position: 'absolute',
        backgroundColor: 'black',
        width: '100%',
        height: '100%',
        opacity: .4,
    },
    hikeDisplay: {
        borderRadius: 10,
        opacity: .8,
        padding: 10,
        margin: 15,
        width: 300,
        height: 300,
        backgroundColor: 'white',
    },
    imageStyle: {
        position: 'absolute',
        width: 100,
        height: 100,
        bottom: 10,
        right: 10,
    },
    titleHikes: {
        fontSize: 20,
        marginBottom: 2,
    },
    description: {
        fontSize: 17
    },
    stats: {
        fontSize: 17,
        marginTop: 5,
    },
    horizontalRule: {
        width: 280,
        height: 2,
        backgroundColor: 'black',
        opacity: .4,
        marginBottom: 10
    }
})

export default SearchPage