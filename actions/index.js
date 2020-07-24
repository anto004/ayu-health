export const ADD_COMMENT = "add_comment";

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
