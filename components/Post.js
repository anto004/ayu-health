import React, { useState } from "react";
import {
	View,
	Image,
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from "react-native";
import { connect } from "react-redux";
import { AntDesign, FontAwesome, Entypo, Octicons } from "@expo/vector-icons";
import { Text, Button, Avatar } from "react-native-elements";

function ShowSingleComment({ comment, commentUserName }) {
	return (
		<View>
			{comment && (
				<View style={styles.commentContainer}>
					<Text style={styles.username}>{commentUserName}</Text>
					<Text style={{ marginLeft: 4 }}>{comment}</Text>
				</View>
			)}
		</View>
	);
}

function PostHeader({ username }) {
	return (
		<View style={styles.headerContainer}>
			<View style={{ flexDirection: "row" }}>
				<Avatar
					rounded
					source={require("../assets/profile-images/profileimage1.jpeg")}
					size="small"
					containerStyle={{ marginLeft: 2, marginTop: 2 }}
				/>
				<Text style={{ fontSize: 15, marginLeft: 10 }}>{username}</Text>
			</View>

			<Button
				type="clear"
				icon={<Octicons name="kebab-vertical" size={24} color="black" />}
			/>
		</View>
	);
}

function Post({ route, navigation, post, username, commentUserName, comment }) {
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
	const handleDoubleTap = () => {
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
			<PostHeader username={username} />
			<TouchableWithoutFeedback onPress={() => handleDoubleTap()}>
				<Image source={post.uri} style={styles.image} />
			</TouchableWithoutFeedback>
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
			<View style={{ marginLeft: 10 }}>
				<Text>{`Liked`}</Text>
			</View>
			<View style={styles.postDescriptionContainer}>
				<Text style={styles.username}>{username}</Text>
				<Text style={{ marginLeft: 4 }}>{post.postDescription}</Text>
			</View>
			<ShowSingleComment comment={comment} commentUserName={commentUserName} />
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
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		margin: 7,
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
	postDescriptionContainer: {
		flexDirection: "row",
		marginLeft: 10,
		marginTop: 4,
	},
	username: {
		fontWeight: "bold",
	},
	commentContainer: {
		flexDirection: "row",
		marginLeft: 10,
		marginTop: 4,
	},
});

const mapStateToProps = (state, { route }) => {
	const { userId, postId } = route.params;
	let comment = "";
	let commentUserName = null;

	const post = state
		.filter((user) => user.id === userId)[0]
		.posts.filter((post) => post.id === postId)[0];

	const comments = post.comments;

	if (comments) {
		const commentUserId = comments[comments.length - 1].commentUserId;
		comment = comments[comments.length - 1].comment;

		commentUserName = state.filter((user) => user.id === commentUserId)[0]
			.username;
	}
	console.log("Post: ", post);
	console.log("CommentUserName", commentUserName);

	return {
		username: state.filter((user) => user.id === userId)[0].username,
		post: post,
		comment: comment,
		commentUserName: commentUserName,
	};
};

const dispatchPropsToState = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, dispatchPropsToState)(Post);
