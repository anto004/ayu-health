import React from "react";
import {
	StyleSheet,
	View,
	Image,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import { Avatar, Text, Button } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { DATA } from "../data/userdata";

const Header = () => {
	return (
		<View style={styles.header}>
			<Avatar
				rounded
				source={require("../assets/profile-images/profileimage1.jpeg")}
				size="large"
				containerStyle={styles.avatarStyle}
			/>
			<View style={{ backgroundColor: "white" }}>
				<View style={styles.postFollowStyle}>
					<View style={{ alignItems: "center", justifyContent: "center" }}>
						<Text style={styles.numFollowersText}>238</Text>
						<Text style={styles.followersText}>posts</Text>
					</View>
					<View style={{ alignItems: "center", justifyContent: "center" }}>
						<Text style={styles.numFollowersText}>328K</Text>
						<Text style={styles.followersText}>followers</Text>
					</View>
					<View style={{ alignItems: "center", justifyContent: "center" }}>
						<Text style={styles.numFollowersText}>381K</Text>
						<Text style={styles.followersText}>following</Text>
					</View>
				</View>
				<View style={styles.followButtonsContainer}>
					<Button
						title="Follow"
						type="solid"
						buttonStyle={styles.followButtonStyle}
						titleStyle={{ fontSize: 12 }}
					/>
					<Button
						icon={<Ionicons name="md-arrow-dropdown" size={18} color="white" />}
						buttonStyle={styles.dropDownButonStyle}
					/>
				</View>
			</View>
		</View>
	);
};

const Profile = ({ route, navigation }) => {
	const user = DATA[0];

	return (
		<View style={styles.container}>
			<StatusBar
				style="dark"
				hidden={false}
				backgroundColor="lightgray"
				translucent={false}
			/>
			<Header />
			<View style={styles.bio}>
				<Text>{user.bio}</Text>
			</View>
			<Button
				type="outline"
				title="Call"
				raised={true}
				buttonStyle={styles.callButton}
			/>

			<ScrollView contentContainerStyle={styles.scrollView}>
				{user.posts.map((post, index) => (
					<TouchableOpacity
						key={index}
						onPress={() =>
							navigation.navigate("Post", { userId: user.id, postId: post.id })
						}
					>
						<Image source={post.uri} style={{ width: 137, height: 150 }} />
					</TouchableOpacity>
				))}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	header: {
		flexDirection: "row",
		justifyContent: "flex-start",
	},

	avatarStyle: {
		margin: 10,
		marginRight: 20,
	},
	postFollowStyle: {
		flexDirection: "row",
		justifyContent: "space-around",
		//backgroundColor: "yellow",
		width: 270,
		marginTop: 12,
		marginLeft: 5,
		marginBottom: 2,
	},
	followButtonsContainer: {
		flexDirection: "row",
		width: 250,
		marginLeft: 7,
		//backgroundColor: "brown",
	},
	followButtonStyle: {
		height: 22,
		marginRight: 2,
		width: 240,
	},
	dropDownButonStyle: {
		height: 22,
		marginRight: 2,
	},
	numFollowersText: {
		fontSize: 14,
		fontWeight: "bold",
		margin: 0,
		padding: 0,
	},
	followersText: {
		color: "darkgray",
		margin: 0,
		padding: 0,
	},

	bio: {
		marginLeft: 12,
		marginTop: 2,
		marginBottom: 10,
	},
	callButton: {
		height: 36,
		marginTop: 15,
		marginLeft: 1.5,
		marginRight: 1.5,
	},
	scrollView: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignContent: "center",
		padding: 0,
		margin: 0,
	},
});

export default Profile;
