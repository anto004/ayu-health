import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";
import { Avatar, Text } from "react-native-elements";
import Profile from "./components/Profile";
import Post from "./components/Post";
import { DATA } from "./data/userdata";

const USERNAME = DATA[0].username;

function ActivityScreen() {
	return (
		<View style={styles.container}>
			<Text>Activity Component</Text>
		</View>
	);
}

function AddScreen() {
	return (
		<View style={styles.container}>
			<Text>Add Component</Text>
		</View>
	);
}

function SearchScreen() {
	return (
		<View style={styles.container}>
			<Text>Search Component</Text>
		</View>
	);
}

function HomeScreen() {
	return (
		<View style={styles.container}>
			<Text h1>Open up App.js to start working on your app!</Text>
		</View>
	);
}

const Tab = createBottomTabNavigator();

function HomeTabs() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === "Home") {
						return focused ? (
							<Ionicons name="md-home" size={size} color={color} />
						) : (
							<AntDesign name="home" size={size} color={color} />
						);
					}

					if (route.name === "Search") {
						return <Ionicons name="md-search" size={size} color={color} />;
					}

					if (route.name === "Add") {
						iconName = focused ? "md-add-circle" : "md-add-circle-outline";
						return <Ionicons name={iconName} size={size} color={color} />;
					}

					if (route.name === "Activity") {
						iconName = focused ? "md-heart" : "md-heart-empty";
						return <Ionicons name={iconName} size={size} color={color} />;
					}

					if (route.name === "Profile") {
						return (
							<Avatar
								rounded
								source={require("./assets/profile-images/profileimage1.jpeg")}
							/>
						);
					}
				},
			})}
			tabBarOptions={{
				activeTintColor: "black",
				inactiveTintColor: "gray",
			}}
		>
			<Tab.Screen name="Profile" component={Profile} />
			<Tab.Screen name="Home" component={HomeScreen} />
			<Tab.Screen name="Search" component={SearchScreen} />
			<Tab.Screen name="Add" component={AddScreen} />
			<Tab.Screen name="Activity" component={ActivityScreen} />
		</Tab.Navigator>
	);
}

// We don't want to display the bottom tab navigator in the Post screen
// We place the bottom tab navigator in a stack
const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Home"
					component={HomeTabs}
					options={{
						title: USERNAME,
						headerTitleStyle: {
							alignSelf: "center",
							fontSize: 18,
						},
					}}
				/>
				<Stack.Screen name="Post" component={Post} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
