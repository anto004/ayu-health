export const ADD_COMMENT = "add_comment";
export const POST_LIKED = "post_liked";

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
