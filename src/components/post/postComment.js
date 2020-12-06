import React from "react"
import CommentReplies from "./commentReplies"

 const PostComment = ({commentText, commentAuthor, commentId}) => {

 
    return (
        <div>
            {commentAuthor._id}
            {commentText}
            <CommentReplies commentId = {commentId}/>
        </div>
    )
}

export default PostComment