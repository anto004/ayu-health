import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { CommonActions } from "@react-navigation/native";
import { Text, Button, Input, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { addComment, commentLiked } from "../actions/index";
import { elapsedDays } from "../utils/helper";

function Comment({ route, navigation, comment, dispatchCommentLiked }) {
	const { userId, postId } = route.params;
	const [heartPress, setHeartPress] = useState(false);
	const [liked, setLiked] = useState(comment.liked);
	console.log("Timestamp: ", comment.timestamp);
	const daysAgo = elapsedDays(comment.timestamp);

	useEffect(() => {
		//userId, postId, commentId, likedCount
		const commentId = comment.id;
		dispatchCommentLiked(userId, postId, commentId, liked);
	});

	const heartName = heartPress ? "heart" : "hearto";

	const handleLikedCount = () => {
		if (!heartPress) {
			setLiked(liked + 1);
		} else {
			setLiked(liked - 1);
		}
	};

	return (
		<View style={styles.container}>
			<Avatar
				rounded
				source={require("../assets/profile-images/profileimage2.jpeg")}
				size="small"
				containerStyle={styles.avatarStyle}
			/>

			<View style={styles.comment}>
				<View style={styles.commentContainer}>
					<Text style={styles.username}>pebchryz</Text>
					<Text style={{ marginLeft: 4 }}>{comment.comment}</Text>
				</View>
				<View style={styles.timestamp}>
					<Text style={styles.like}>{daysAgo}</Text>
					{liked !== 0 && <Text style={styles.like}>{`${liked} like`}</Text>}
					<Button
						type="clear"
						title="Reply"
						titleStyle={{ color: "gray", fontSize: 13 }}
					/>
				</View>
				<View style={styles.seperator}></View>
			</View>
			<Button
				type="clear"
				icon={
					<AntDesign
						name={heartName}
						size={12}
						color={heartPress ? "#fb3958" : "black"}
					/>
				}
				onPress={() => {
					setHeartPress(!heartPress);
					handleLikedCount();
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 2,
		backgroundColor: "white",
	},
	avatarStyle: {
		marginRight: 8,
	},
	commentContainer: {
		flexDirection: "row",
		marginTop: 4,
	},
	seperator: {
		borderWidth: 1,
		borderColor: "lightgray",
		width: 330,
		marginTop: 0,
	},
	comment: {
		marginTop: 5,
		justifyContent: "center",
		alignItems: "flex-start",
	},
	username: {
		fontWeight: "bold",
	},
	timestamp: {
		flexDirection: "row",
		alignItems: "center",
		paddingLeft: 2,
	},
	like: {
		fontSize: 12,
		color: "gray",
		marginRight: 12,
	},
});

const mapStateToProps = (state, { route }) => {
	//const { userId, postId, commentId } = route.params;
	//console.log(
	//	"UserId: ",
	//	userId,
	//	" postId, ",
	//	postId,
	//	"commentId: ",
	//	commentId
	//);
	//const post = state
	//	.filter((user) => user.id === userId)[0]
	//	.posts.filter((post) => post.id === postId)[0];

	//const comment = post.comments.filter(
	//	(comment) => comment.id === commentId
	//)[0];

	return {};
};

const dispatchPropsToState = (dispatch) => {
	return {
		dispatchCommentLiked: (userId, postId, commentId, likedCount) =>
			dispatch(commentLiked(userId, postId, commentId, likedCount)),
	};
};

export default connect(mapStateToProps, dispatchPropsToState)(Comment);
