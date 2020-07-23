import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { Text, Button } from "react-native-elements";

function Comments({ route, navigation }) {
	const { userId, postId } = route.params;
	console.log("UserId: ", userId, " postId, ", postId);
	return (
		<View>
			<Text h4>Comments Component</Text>
		</View>
	);
}
const mapStateToProps = (state) => {
	return {};
};

const dispatchPropsToState = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, dispatchPropsToState)(Comments);
