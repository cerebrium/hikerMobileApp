import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, SafeAreaView, Animated, Image, TouchableOpacity} from 'react-native';
import backgroundImage from '../pictures/forest.jpg'
import { Link } from "react-router-native";
import { WebView } from 'react-native-webview'
import loadingTree from '../pictures/fun.gif'

const SearchPage = (props) => {
    const [ data, setData ] = useState([])
    const [ renderArray, setRenderArray ] = useState([])
    const [ hamburgerGate, setHamburgerGate ] = useState('true')
    const [ hamburgerContent, setHamburgerContent ] = useState(null)
    const [ navBar, setNavBar ] = useState(null)
    const [ webViewRender, setWebViewRender ] = useState(null)
    const [ loadingScreen, setLoadingScreen ] = useState(null)
    const [ webViewGate, setWebViewGate ] = useState('false')
    const [ content, setContent ] = useState(null)

    // get the parameter
    useEffect( () => {
        setLoadingScreen(
            <>
                <Image source={loadingTree} style={styles.loadingGif}></Image>
                <Text style={styles.loadingText}>Loading...</Text>
            </>
        )
         // function for get request
        async function postData(url = '', data={}) {
            let myBody = JSON.stringify(data)
            const response = await fetch(url, {
                method: 'POST', 
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: myBody
            });
            return response ? response.json() : console.log('no reponse')
        }; 
        if (props.match.params.value !== ':') {
            // function for searching
            const handlePress = () => {
                try {
                // in dev have to use manual localhost
                postData('http://192.168.0.27:8080/trails', {
                    City: props.match.params.value.slice(1)
                }).then( response => {
                    console.log(response.trails)
                    setData(response.trails)
                        setLoadingScreen(null)
                })
                } catch(error) {
                    console.log(error)
                }
            }
            handlePress()
        }
    }, [])

    // map some sample data
    // useEffect( () => {
    //     setLoadingScreen(
    //         <>
    //             <Image source={loadingTree} style={styles.loadingGif}></Image>
    //             <Text style={styles.loadingText}>Loading...</Text>
    //         </>
    //     )
    //     setTimeout( () => {
    //         let myArray = [
    //             {
    //                 "ascent": 814,
    //                 "conditionDate": "2020-06-17 14:14:03",
    //                 "conditionDetails": "Dry",
    //                 "conditionStatus": "All Clear",
    //                 "descent": -814,
    //                 "difficulty": "blueBlack",
    //                 "high": 2792,
    //                 "id": 7022385,
    //                 "imgMedium": "https://cdn2.apstatic.com/photos/hike/7021172_medium_1554839235.jpg",
    //                 "imgSmall": "https://cdn2.apstatic.com/photos/hike/7021172_small_1554839235.jpg",
    //                 "imgSmallMed": "https://cdn2.apstatic.com/photos/hike/7021172_smallMed_1554839235.jpg",
    //                 "imgSqSmall": "https://cdn2.apstatic.com/photos/hike/7021172_sqsmall_1554839235.jpg",
    //                 "latitude": 34.2371,
    //                 "length": 9.8,
    //                 "location": "La Verne, California",
    //                 "longitude": -117.7649,
    //                 "low": 2016,
    //                 "name": "Bridge to Nowhere - East Fork Trail #8W13",
    //                 "starVotes": 72,
    //                 "stars": 4.5,
    //                 "summary": "A great out-and-back to a large solitary bridge.",
    //                 "type": "Recommended Route",
    //                 "url": "https://www.hikingproject.com/trail/7022385/bridge-to-nowhere-east-fork-trail-8w13",
    //               },
    //               {
    //                 "ascent": 382,
    //                 "conditionDate": "2020-07-03 13:11:00",
    //                 "conditionDetails": "Dry",
    //                 "conditionStatus": "All Clear",
    //                 "descent": -382,
    //                 "difficulty": "blue",
    //                 "high": 1359,
    //                 "id": 7021812,
    //                 "imgMedium": "https://cdn2.apstatic.com/photos/hike/7023492_medium_1554845093.jpg",
    //                 "imgSmall": "https://cdn2.apstatic.com/photos/hike/7023492_small_1554845093.jpg",
    //                 "imgSmallMed": "https://cdn2.apstatic.com/photos/hike/7023492_smallMed_1554845093.jpg",
    //                 "imgSqSmall": "https://cdn2.apstatic.com/photos/hike/7023492_sqsmall_1554845093.jpg",
    //                 "latitude": 34.1784,
    //                 "length": 3.6,
    //                 "location": "Altadena, California",
    //                 "longitude": -118.0966,
    //                 "low": 981,
    //                 "name": "Eaton Falls",
    //                 "starVotes": 90,
    //                 "stars": 4.1,
    //                 "summary": "A beautiful out-and-back to Eaton Falls with easy access from the Eaton Canyon Nature Center.",
    //                 "type": "Recommended Route",
    //                 "url": "https://www.hikingproject.com/trail/7021812/eaton-falls",
    //               },
    //               {
    //                 "ascent": 112,
    //                 "conditionDate": "1970-01-01 00:00:00",
    //                 "conditionDetails": null,
    //                 "conditionStatus": "Unknown",
    //                 "descent": -111,
    //                 "difficulty": "greenBlue",
    //                 "high": 4262,
    //                 "id": 7016879,
    //                 "imgMedium": "https://cdn2.apstatic.com/photos/hike/7031364_medium_1554930885.jpg",
    //                 "imgSmall": "https://cdn2.apstatic.com/photos/hike/7031364_small_1554930885.jpg",
    //                 "imgSmallMed": "https://cdn2.apstatic.com/photos/hike/7031364_smallMed_1554930885.jpg",
    //                 "imgSqSmall": "https://cdn2.apstatic.com/photos/hike/7031364_sqsmall_1554930885.jpg",
    //                 "latitude": 34.0124,
    //                 "length": 1,
    //                 "location": "Twentynine Palms, California",
    //                 "longitude": -116.168,
    //                 "low": 4180,
    //                 "name": "Hidden Valley Nature Trail",
    //                 "starVotes": 55,
    //                 "stars": 4.6,
    //                 "summary": "An easy loop that provides brief introductions to the fauna and flora of Joshua Tree National Park.",
    //                 "type": "Recommended Route",
    //                 "url": "https://www.hikingproject.com/trail/7016879/hidden-valley-nature-trail",
    //               },
    //               {
    //                 "ascent": 1469,
    //                 "conditionDate": "2020-09-03 16:42:21",
    //                 "conditionDetails": "Dry",
    //                 "conditionStatus": "All Clear",
    //                 "descent": -1471,
    //                 "difficulty": "blueBlack",
    //                 "high": 1532,
    //                 "id": 7021815,
    //                 "imgMedium": "https://cdn2.apstatic.com/photos/hike/7023507_medium_1554845113.jpg",
    //                 "imgSmall": "https://cdn2.apstatic.com/photos/hike/7023507_small_1554845113.jpg",
    //                 "imgSmallMed": "https://cdn2.apstatic.com/photos/hike/7023507_smallMed_1554845113.jpg",
    //                 "imgSqSmall": "https://cdn2.apstatic.com/photos/hike/7023507_sqsmall_1554845113.jpg",
    //                 "latitude": 34.0473,
    //                 "length": 7.5,
    //                 "location": "Las Flores, California",
    //                 "longitude": -118.5601,
    //                 "low": 270,
    //                 "name": "Parker Mesa Overlook",
    //                 "starVotes": 50,
    //                 "stars": 4.5,
    //                 "summary": "A one-day adventure into the southern hills of Topanga State Park to arguably the best view around.",
    //                 "type": "Recommended Route",
    //                 "url": "https://www.hikingproject.com/trail/7021815/parker-mesa-overlook",
    //               },
    //               {
    //                 "ascent": 390,
    //                 "conditionDate": "2020-06-14 12:19:25",
    //                 "conditionDetails": "Dry",
    //                 "conditionStatus": "All Clear",
    //                 "descent": -390,
    //                 "difficulty": "blueBlack",
    //                 "high": 4711,
    //                 "id": 7023357,
    //                 "imgMedium": "https://cdn2.apstatic.com/photos/hike/7029988_medium_1554925694.jpg",
    //                 "imgSmall": "https://cdn2.apstatic.com/photos/hike/7029988_small_1554925694.jpg",
    //                 "imgSmallMed": "https://cdn2.apstatic.com/photos/hike/7029988_smallMed_1554925694.jpg",
    //                 "imgSqSmall": "https://cdn2.apstatic.com/photos/hike/7029988_sqsmall_1554925694.jpg",
    //                 "latitude": 36.1624,
    //                 "length": 2.3,
    //                 "location": "Summerlin South, Nevada",
    //                 "longitude": -115.4504,
    //                 "low": 4321,
    //                 "name": "Calico Tanks Trail",
    //                 "starVotes": 46,
    //                 "stars": 4.7,
    //                 "summary": "A popular out-and-back trail through sandstone formations to an overlook of the city and the Las Vegas strip.",
    //                 "type": "Recommended Route",
    //                 "url": "https://www.hikingproject.com/trail/7023357/calico-tanks-trail",
    //               },
    //               {
    //                 "ascent": 1029,
    //                 "conditionDate": "1970-01-01 00:00:00",
    //                 "conditionDetails": null,
    //                 "conditionStatus": "Unknown",
    //                 "descent": -1028,
    //                 "difficulty": "blueBlack",
    //                 "high": 5452,
    //                 "id": 7016889,
    //                 "imgMedium": "https://cdn2.apstatic.com/photos/hike/7028016_medium_1554917409.jpg",
    //                 "imgSmall": "https://cdn2.apstatic.com/photos/hike/7028016_small_1554917409.jpg",
    //                 "imgSmallMed": "https://cdn2.apstatic.com/photos/hike/7028016_smallMed_1554917409.jpg",
    //                 "imgSqSmall": "https://cdn2.apstatic.com/photos/hike/7028016_sqsmall_1554917409.jpg",
    //                 "latitude": 34.0025,
    //                 "length": 2.9,
    //                 "location": "Twentynine Palms, California",
    //                 "longitude": -116.1359,
    //                 "low": 4423,
    //                 "name": "Ryan Mountain Trail",
    //                 "starVotes": 57,
    //                 "stars": 4.2,
    //                 "summary": "A trail up Ryan Mountain where sweeping view of Joshua Tree NP await.",
    //                 "type": "Recommended Route",
    //                 "url": "https://www.hikingproject.com/trail/7016889/ryan-mountain-trail",
    //               },
    //               {
    //                 "ascent": 1144,
    //                 "conditionDate": "2020-08-02 21:54:55",
    //                 "conditionDetails": "Dry",
    //                 "conditionStatus": "All Clear",
    //                 "descent": -1144,
    //                 "difficulty": "blueBlack",
    //                 "high": 2996,
    //                 "id": 7003186,
    //                 "imgMedium": "https://cdn2.apstatic.com/photos/hike/7002245_medium_1554225583.jpg",
    //                 "imgSmall": "https://cdn2.apstatic.com/photos/hike/7002245_small_1554225583.jpg",
    //                 "imgSmallMed": "https://cdn2.apstatic.com/photos/hike/7002245_smallMed_1554225583.jpg",
    //                 "imgSqSmall": "https://cdn2.apstatic.com/photos/hike/7002245_sqsmall_1554225583.jpg",
    //                 "latitude": 34.1117,
    //                 "length": 6.1,
    //                 "location": "Thousand Oaks, California",
    //                 "longitude": -118.9268,
    //                 "low": 2115,
    //                 "name": "Sandstone Peak Loop",
    //                 "starVotes": 44,
    //                 "stars": 4.5,
    //                 "summary": "Hike this six-mile loop to summit Sandstone Peak.",
    //                 "type": "Recommended Route",
    //                 "url": "https://www.hikingproject.com/trail/7003186/sandstone-peak-loop",
    //               },
    //               {
    //                 "ascent": 10444,
    //                 "conditionDate": "1970-01-01 00:00:00",
    //                 "conditionDetails": null,
    //                 "conditionStatus": "Unknown",
    //                 "descent": -172,
    //                 "difficulty": "dblack",
    //                 "high": 10751,
    //                 "id": 7012359,
    //                 "imgMedium": "https://cdn2.apstatic.com/photos/hike/7008862_medium_1554395303.jpg",
    //                 "imgSmall": "https://cdn2.apstatic.com/photos/hike/7008862_small_1554395303.jpg",
    //                 "imgSmallMed": "https://cdn2.apstatic.com/photos/hike/7008862_smallMed_1554395303.jpg",
    //                 "imgSqSmall": "https://cdn2.apstatic.com/photos/hike/7008862_sqsmall_1554395303.jpg",
    //                 "latitude": 33.8252,
    //                 "length": 14.4,
    //                 "location": "Palm Springs, California",
    //                 "longitude": -116.5505,
    //                 "low": 479,
    //                 "name": "Cactus to Clouds: Palm Springs - Mt. San Jacinto",
    //                 "starVotes": 36,
    //                 "stars": 4.7,
    //                 "summary": "From desert floor to mountain peak in the greatest elevation gain of any trail in the USA.",
    //                 "type": "Recommended Route",
    //                 "url": "https://www.hikingproject.com/trail/7012359/cactus-to-clouds-palm-springs-mt-san-jacinto",
    //               },
    //               {
    //                 "ascent": 4739,
    //                 "conditionDate": "1970-01-01 00:00:00",
    //                 "conditionDetails": null,
    //                 "conditionStatus": "Unknown",
    //                 "descent": -4739,
    //                 "difficulty": "black",
    //                 "high": 5668,
    //                 "id": 7009633,
    //                 "imgMedium": "https://cdn2.apstatic.com/photos/hike/7007359_medium_1554322682.jpg",
    //                 "imgSmall": "https://cdn2.apstatic.com/photos/hike/7007359_small_1554322682.jpg",
    //                 "imgSmallMed": "https://cdn2.apstatic.com/photos/hike/7007359_smallMed_1554322682.jpg",
    //                 "imgSqSmall": "https://cdn2.apstatic.com/photos/hike/7007359_sqsmall_1554322682.jpg",
    //                 "latitude": 34.1709,
    //                 "length": 13.6,
    //                 "location": "Sierra Madre, California",
    //                 "longitude": -118.0488,
    //                 "low": 1044,
    //                 "name": "Mount Wilson",
    //                 "starVotes": 39,
    //                 "stars": 4.5,
    //                 "summary": "Looking for a hill to conquer in the Los Angeles area? Look no further!",
    //                 "type": "Recommended Route",
    //                 "url": "https://www.hikingproject.com/trail/7009633/mount-wilson",
    //               },
    //         ]
    //         setData(myArray)
    //         setLoadingScreen(null)
    //     }, 100)
    // }, [])

    // function for changing rendering of hamburger menu
    
    const toggleHamburger = () => {
        hamburgerGate === 'true' ? setHamburgerGate('false') : setHamburgerGate('true')
    }

    // handel rendering hamburger
    useEffect( () => {
        if (hamburgerGate === 'true') {
            setHamburgerContent(
                <TouchableOpacity 
                    style={styles.hamburgerMenuContainer}
                    onPress={toggleHamburger}
                >
                    <View style={styles.hamburgerMenuLine}></View>
                    <View style={styles.hamburgerMenuLine}></View>
                    <View style={styles.hamburgerMenuLine}></View>
                </TouchableOpacity>
            )
            setNavBar(null)
        } else {
            setHamburgerContent(
                <TouchableOpacity 
                    style={styles.hamburgerMenuContainerCross}
                    onPress={toggleHamburger}
                >
                    <View style={styles.hamburgerMenuLineCross}></View>
                    <View style={styles.hamburgerMenuLineCrossTwo}></View>
                </TouchableOpacity>
            )
            setNavBar(
                <View style={styles.navBarContainer}>
                    <Link to='/'>
                        <Text style={styles.linkStyle}>
                            Home
                        </Text>
                    </Link>
                </View>
            )
        }
    }, [hamburgerGate, data])

    // handle return
    const handleReturn = () => {
        setWebViewGate('false')
        setWebViewRender(null)
    }

    // handle loading the url
    const handleWebView = (e, theUrl) => {
        setWebViewGate('true')
        setWebViewRender(
            <>
                <WebView
                    source={{ uri: theUrl }}
                    // style={styles.webViewStyle}
                    renderLoading={() => <Loading />}
                />
                <TouchableOpacity 
                    style={styles.webTouchableOpacityReturnView}
                    onPress={handleReturn}    
                >
                    <Text style={styles.returnText}>Return</Text>
                </TouchableOpacity>
            </>
        )
    }

    // when there is data, render the images and hikes
    useEffect( () => {
        let finalArray = []
        if (data.length > 0) {
            data.forEach( (hike, hikeId) => {
                const uri = hike.url;
                finalArray.push(
                    <TouchableOpacity
                        style={styles.hikeDisplay}
                        key={hikeId}
                        onPress={(e, theUrl) => handleWebView(e, uri)}
                    >
                        <Text style={styles.titleHikes} >
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
                        <Image 
                            source={{uri: hike.imgSmall}}
                            style={styles.imageStyle}
                        />
                    </TouchableOpacity>
                )
            })
        }
        setRenderArray(finalArray)
    }, [data])

    useEffect( () => {
        if (webViewGate === 'false') {
            setContent(
                <SafeAreaView style={styles.mainContainer}>
                    <ImageBackground source={backgroundImage} style={styles.image}>
                    {navBar}
                    {loadingScreen}
                        <View style={styles.darkOverlayContainer}> 
                        </View>
                        {hamburgerContent}
                        <ScrollView>
                            {renderArray}
                        </ScrollView>
                    </ImageBackground>
                </SafeAreaView>
            )
        } else {
            setContent(null)
        }
    }, [data, navBar, loadingScreen, webViewGate])

    return (
        <>
            {webViewRender}
            {content}
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
    },
    hamburgerMenuContainer: {
        position: 'absolute',
        display: 'flex',
        left: 0,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        opacity: .8
    },
    hamburgerMenuContainerCross: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
        width: 50,
        height: 50,
        opacity: .8
    },
    hamburgerMenuLine: {
        margin: 2,
        backgroundColor: 'white',
        width: 35,
        height: 4,
        borderRadius: 30
    },
    hamburgerMenuLineCross: {
        backgroundColor: 'white',
        width: 35,
        height: 4,
        borderRadius: 30,
        transform: [
            { rotate: "45deg" },
            { translateY: 1},
            {translateX: 1.5}
          ]
    },
    hamburgerMenuLineCrossTwo: {
        backgroundColor: 'white',
        marginRight: 2,
        width: 35,
        height: 4,
        borderRadius: 30,
        transform: [
            { rotate: "135deg" },
            { translateX: -2}
          ]
    },
    navBarContainer: {
        width: 300,
        height: 700,
        backgroundColor: 'white',
        margin: 50,
        opacity: .7,
        display: 'flex',
        alignItems: 'center',
        shadowColor: 'white',
        shadowOffset: { width: -3, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 1,
        zIndex: 1
    },
    linkStyle: {
        color: 'black',
        fontSize: 40,
        marginTop: 15
    },
    loadingGif: {
        width: 200,
        height: 200,
        marginTop: 200
    },
    loadingText: {
        color: 'white',
        fontSize: 30,
        opacity: .3
    },
    webViewStyle: {
        height: 190
    },
    webViewContainer :{
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    webTouchableOpacityReturnView: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        top: 20,
        left: 20,
        height: 100,
        backgroundColor: 'white',
        width: 100,
        zIndex: 1,
        borderRadius: 20,
        opacity: .8
    },
    returnText: {
        fontSize: 25
    }

})

export default SearchPage