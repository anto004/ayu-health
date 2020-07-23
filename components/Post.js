import React from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-elements";

function Post({ route, navigation }) {
	const { userId, postId } = route.params;
	console.log("UserId: ", userId);
	return (
		<View>
			<Text h4>Post Component</Text>
			<Button
				title="Go to Profile"
				onPress={() => navigation.navigate("Profile")}
			/>
			<Button
				title="Go to Comments"
				onPress={() =>
					navigation.navigate("Comments", { userId: userId, postId: postId })
				}
			/>
		</View>
	);
}

export default Post;
