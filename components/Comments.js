import React, { useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { CommonActions } from "@react-navigation/native";
import { Text, Button, Input } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { addComment } from "../actions/index";
import { uuid } from "../utils/helper";

function Comments({ route, navigation, comments, dispatchAddComment }) {
	const [comment, setComment] = useState("");

	// Args for dispatchAddComment
	// id, userId, postId, commentUserId, comment
	const handleSubmit = () => {
		const { userId, postId } = route.params;
		const id = uuid();
		const commentUserId = userId; // User commenting on their post
		const newComment = {
			id,
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
		<View>
			<Text h4>Comments Component</Text>
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
	console.log("UserId: ", userId, " postId, ", postId);
	const post = state
		.filter((user) => user.id === userId)[0]
		.posts.filter((post) => post.id === postId)[0];

	return {
		comments: post.comments,
	};
};

const dispatchPropsToState = (dispatch) => {
	return {
		dispatchAddComment: (userId, postId, newComment) =>
			dispatch(addComment(userId, postId, newComment)),
	};
};

export default connect(mapStateToProps, dispatchPropsToState)(Comments);
