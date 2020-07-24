export const ADD_COMMENT = "add_comment";
export const POST_LIKED = "post_liked";
export const COMMENT_LIKED = "comment_liked";

/**
	comment {id, commentUserId, "new comment"}
*/
export const addComment = (userId, postId, comment) => {
	return {
		type: ADD_COMMENT,
		userId,
		postId,
		comment,
	};
};

export const postLiked = (userId, postId, likedCount) => {
	return {
		type: POST_LIKED,
		userId,
		postId,
		likedCount,
	};
};

export const commentLiked = (userId, postId, commentId, likedCount) => {
	return {
		type: COMMENT_LIKED,
		userId,
		postId,
		commentId,
		likedCount,
	};
};
