import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { CommonActions } from "@react-navigation/native";
import { Text, Button, Input } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { addComment, commentLiked } from "../actions/index";
import { uuid } from "../utils/helper";
import Comment from "./Comment";
import { ScrollView } from "react-native-gesture-handler";
import { timeToString } from "../utils/helper";

function Comments({ route, navigation, comments, dispatchAddComment }) {
	const [comment, setComment] = useState("");

	// Args for dispatchAddComment
	// id, userId, postId, commentUserId, comment
	// comment: id, liked, timestamp, comment, commentUserId
	const handleSubmit = () => {
		const { userId, postId } = route.params;
		const id = uuid();
		const liked = 0;
		const timestamp = timeToString();
		const commentUserId = userId; // User commenting on their post
		const newComment = {
			id,
			liked,
			timestamp,
			commentUserId,
			comment,
		};

		if (!comment) {
			return;
		}

		dispatchAddComment(userId, postId, newComment);

		// Go back to Post screen
		navigation.dispatch(CommonActions.goBack());
	};

	return (
		<View style={styles.container}>
			<ScrollView>
				{comments.map((comment) => (
					<Comment key={comment.id} comment={comment} route={route} />
				))}
			</ScrollView>

			<Input
				placeholder="Add a comment"
				autoFocus={true}
				leftIcon={<AntDesign name="sharealt" size={24} color="black" />}
				rightIcon={
					<Button title="Post" type="clear" onPress={() => handleSubmit()} />
				}
				onChangeText={(text) => setComment(text)}
				onSubmitEditing={({ nativeEvent }) => handleSubmit()}
				inputContainerStyle={{ margin: 5 }}
			/>
		</View>
	);
}
const mapStateToProps = (state, { route }) => {
	const { userId, postId } = route.params;

	const post = state
		.filter((user) => user.id === userId)[0]
		.posts.filter((post) => post.id === postId)[0];

	return {
		comments: post.comments,
	};
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
});

const dispatchPropsToState = (dispatch) => {
	return {
		dispatchAddComment: (userId, postId, newComment) =>
			dispatch(addComment(userId, postId, newComment)),
		dispatchCommentLiked: (userId, postId, commentId, likedCount) =>
			dispatch(commentLiked(userId, postId, commentId, likedCount)),
	};
};

export default connect(mapStateToProps, dispatchPropsToState)(Comments);
