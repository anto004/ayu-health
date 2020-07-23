import React, { useState } from "react";
import {
	View,
	Image,
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from "react-native";
import { connect } from "react-redux";
import { AntDesign, FontAwesome, Entypo } from "@expo/vector-icons";
import { Text, Button } from "react-native-elements";

function Post({ route, navigation, post }) {
	const [heartPress, setHeartPress] = useState(false);
	const [sharePress, setSharePress] = useState(false);
	const [savePress, setSavePress] = useState(false);
	const { userId, postId } = route.params;
	const heartName = heartPress ? "heart" : "hearto";
	const shareIcon = sharePress ? (
		<Entypo name="share" size={24} color="black" />
	) : (
		<AntDesign name="sharealt" size={24} color="black" />
	);

	const saveIcon = savePress ? (
		<Entypo name="save" size={24} color="black" />
	) : (
		<AntDesign name="save" size={24} color="black" />
	);

	let lastTap = null;
	handleDoubleTap = () => {
		const now = Date.now();
		const DOUBLE_PRESS_DELAY = 300;
		if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
			setHeartPress(!heartPress);
		} else {
			lastTap = now;
		}
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => handleDoubleTap()}>
				<Image source={post.uri} style={styles.image} />
			</TouchableOpacity>
			<View style={styles.likes}>
				<Button
					type="clear"
					icon={
						<AntDesign
							name={heartName}
							size={24}
							color={heartPress ? "#fb3958" : "black"}
						/>
					}
					onPress={() => setHeartPress(!heartPress)}
				/>
				<Button
					type="clear"
					icon={<FontAwesome name="comment-o" size={24} color="black" />}
					onPress={() =>
						navigation.navigate("Comments", {
							userId: userId,
							postId: postId,
						})
					}
				/>
				<Button
					type="clear"
					icon={shareIcon}
					onPress={() => setSharePress(!sharePress)}
				/>
				<Button
					type="clear"
					icon={saveIcon}
					onPress={() => setSavePress(!savePress)}
					containerStyle={styles.saveButton}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		//alignItems: "center",
		justifyContent: "flex-start",
	},
	image: {
		height: 300,
		width: 440,
	},
	likes: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		marginTop: 5,
		marginLeft: 2,
		marginRight: 2,
	},
	saveButton: {
		alignSelf: "flex-end",
		marginLeft: 250,
	},
});
const mapStateToProps = (state, { route }) => {
	const { userId, postId } = route.params;
	const post = state
		.filter((user) => user.id === userId)[0]
		.posts.filter((post) => post.id === postId)[0];
	console.log("Post: ", post);
	return {
		post: post,
	};
};

const dispatchPropsToState = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, dispatchPropsToState)(Post);
