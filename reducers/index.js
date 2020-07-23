import { ADD_COMMENT } from "../actions/index";
import { DATA } from "../data/userdata";

export default (state = DATA, actions) => {
	const { userId, postId, comment } = actions;

	switch (actions.type) {
		case ADD_COMMENT:
			return state.map((user) => {
				if (user.id === userId) {
					user.posts.map((post) => {
						if (post.id === postId) {
							post.comments = post.comments.concat([comment]);
							console.log("Added comment to this post: ", post);
							return post;
						}
						return post;
					});
				}
				return user;
			});

		default:
			return state;
	}
};
