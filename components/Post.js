import React from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-elements";

function Post({ navigation }) {
	return (
		<View>
			<Text h4>Post Component</Text>
			<Button
				title="Go to Profile"
				onPress={() => navigation.navigate("Profile")}
			/>
		</View>
	);
}

export default Post;
