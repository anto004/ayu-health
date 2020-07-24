import { ADD_COMMENT, POST_LIKED, COMMENT_LIKED } from "../actions/index";
import { DATA } from "../data/userdata";

export default (state = DATA, actions) => {
	const { userId, postId, comment, likedCount } = actions;

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

		case POST_LIKED:
			return state.map((user) => {
				if (user.id === userId) {
					user.posts.map((post) => {
						if (post.id === postId) {
							post.liked = likedCount;
							console.log("POST_LIKED: ", post);
							return post;
						}
						return post;
					});
				}
				return user;
			});

		case COMMENT_LIKED:
			return state.map((user, i) => {
				if (user.id === userId) {
					return user.posts.map((post, j) => {
						if (post.id === postId) {
							return post.comments.map((comment) => {
								if (comment.id === commentId) {
									comment.liked = likedCount;
									console.log("comment: ", comment);
									return comment;
								}
								return comment;
							});
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
