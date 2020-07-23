export const ADD_COMMENT = "add_comment";

/**
	comment {id, userId, postId, commentUserId, comment}
*/
export const addComment = (comment) => {
	return {
		type: ADD_COMMENT,
		comment,
	};
};
