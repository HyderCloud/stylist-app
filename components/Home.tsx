import React, { useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Animated,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Image
} from 'react-native';
const { height: windowHeight } = Dimensions.get('window');

const Home = () => {
    const scrollY = useRef(new Animated.Value(0)).current;

    const headerHeight = scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [windowHeight * 0.75, windowHeight * 0.7],
      extrapolate: 'clamp',
    });
  
    const headerHeightGap = scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [windowHeight * 0.12, windowHeight * 0.01],
      extrapolate: 'clamp',
    });
  
    const viewOpacity = scrollY.interpolate({
      inputRange: [0, 100], // Adjust this range as needed
      outputRange: [1, 0], // Opacity goes from 1 to 0
      extrapolate: 'clamp',
    });
    const animatedMargin = scrollY.interpolate({
      inputRange: [0, 100], // Adjust this range as needed
      outputRange: [0, 50], // Margins grow from 10 to 50
      extrapolate: 'clamp',
    });
    const animatedMargin2 = scrollY.interpolate({
      inputRange: [0, 100], // Adjust this range as needed
      outputRange: [-50, -110], // Margins grow from 10 to 50
      extrapolate: 'clamp',
    });
  
    const animatedMargin3 = scrollY.interpolate({
      inputRange: [0, 100], // Adjust this range as needed
      outputRange: [0, 0], // Margins grow from 10 to 50
      extrapolate: 'clamp',
    });
  return (
    <SafeAreaView style={styles.container}>
    {/* Resizable Header */}
    <ScrollView
    contentContainerStyle={styles.scrollContent}
    onScroll={Animated.event(
      [{ nativeEvent: { contentOffset: { y: scrollY } } }],
      { useNativeDriver: false }
    )}
    scrollEventThrottle={16}
    >

    <Animated.View style={[styles.header, { height: headerHeight }]}>
      <Animated.View style={[{marginTop: animatedMargin3}]}>
        <Text style={styles.helpText}>איך אוכל לעזור לך</Text>
        <Text style={styles.helpText}>היום?</Text>
      </Animated.View>
      <Animated.View style={[styles.gap, { height: headerHeightGap,opacity: viewOpacity }]}>
      <Image source={require('../assets/images/stylistlogo.png')}
      width={280}
      height={210}
      />
      </Animated.View>
      <Animated.View style={[styles.gap,, { height: headerHeightGap }]}></Animated.View>
      <Animated.View style={[styles.row, {marginBottom: animatedMargin, }]}>
        <Animated.View style={[styles.biggerCube, ]}>
        </Animated.View>
        <View>
          <Animated.View style={[styles.smallerCube, {}]}></Animated.View>
          <Animated.View style={[styles.smallerCube2, {}]}></Animated.View>
        </View>
      </Animated.View>
    </Animated.View>

    {/* Scrollable Content */}
    <Animated.View style={[styles.fixedHeightView, {marginBottom: animatedMargin2, marginTop: animatedMargin2}]}>
    <ScrollView>
      <Text style={styles.contentText}>
        <View>
          <View style={styles.row}>
          <Text style={styles.historySeeAll}></Text>
          <Text style={styles.historyText}>היסטוריה</Text> 
          </View>
          <Text>
            {Array(1000)
          .fill('Scroll down to see the header resize. ')
          .join('')}
          </Text>
          </View>
      </Text>
    </ScrollView>
    </Animated.View>
    </ScrollView>
  </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
    fixedHeightView: {
      alignItems: "center",
      height: 400, // Fixed height of 200px
      width: '100%', // Adjust the width as needed
      overflow: 'hidden', // Ensures content doesn't overflow the fixed height
    },
    container: {
      flex: 1,
      backgroundColor: "#010101",
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    biggerCube: {
      width: 200,
      height:260,
      backgroundColor: "#7EE7FC",
      shadowColor: '#7EE7FC', // Shadow color
      shadowOffset: {
        width: -110.26,  // Horizontal offset
        height: -110.26, // Vertical offset
      },
      shadowOpacity: 0.7,  // Opacity of the shadow
      shadowRadius: 110.26, // The blur radius (half of the offset to simulate 220.51px spread)
      elevation: 10, 
        borderRadius: 24
    },
    header: {
      backgroundColor: '#010101',
      alignItems: "flex-end",
      padding: 10
    },
    headerText: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold',
    },
    scrollContent: {
      padding: 20,
    },
    contentText: {
      fontSize: 16,
      lineHeight: 24,
    },
    historyText:{
      fontSize: 20,
      fontWeight: 500,
      color: "#FFFFFF",
      lineHeight: 24
    },
    historySeeAll: {
      color: "#FFFFFF",
      opacity: 50,
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 24
    },
    helpText: {
      fontFamily:"Inter",
      fontSize: 35.5,
      fontWeight: "bold",
      color: "#FFFFFF",
      lineHeight: 44,
      textAlign: "right",
    }, 
    smallerCube:{
      width: 180,
      height: 105,
      margin: 8,
      backgroundColor: '#C09FF8',
      borderRadius: 24,
    },
    smallerCube2:{
      width: 180,
      margin: 8,
      height: 130,
      backgroundColor: '#FF95E1',
      borderRadius: 24,
    },
    gap: {
      width: "100%",
      alignItems: "center"
    },
    gap2: {
      alignItems: "center"
    }
  });
  