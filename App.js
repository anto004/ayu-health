import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";
import { Avatar, Text } from "react-native-elements";

function ProfileScreen() {
	return (
		<View style={styles.container}>
			<Text>Profile Component</Text>
		</View>
	);
}

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

export default function App() {
	//<StatusBar style="auto" />
	return (
		<NavigationContainer>
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
							//iconName = focused ? "md-heart" : "md-heart-empty";
							return (
								<Avatar
									rounded
									source={require("./assets/profile-images/profileimage3.jpeg")}
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
				<Tab.Screen name="Home" component={HomeScreen} />
				<Tab.Screen name="Search" component={SearchScreen} />
				<Tab.Screen name="Add" component={AddScreen} />
				<Tab.Screen name="Activity" component={ActivityScreen} />
				<Tab.Screen name="Profile" component={ProfileScreen} />
			</Tab.Navigator>
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
