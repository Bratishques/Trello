import { gql, useQuery } from "@apollo/client"
import React from "react"

const CommentReplies = ({commentId}) => {
    console.log(commentId)

    const GET_COMMENT_REPLIES = gql`
        query commentReplies($commentId: ID!) {
            commentReplies(commentId: $commentId) {
                replies {
                    _id
                    text
                    author {
                        _id
                    }
                }
            }
        }
    `

    const {data} = useQuery(GET_COMMENT_REPLIES, {
        variables: {commentId: commentId}
    })


    return (
        <div>
           {data && data.commentReplies.replies.map((a,i) => {
               console.log(a)
               return <div>
               
               {a.text}
               
               </div>
           })}
           123
        </div>
    )
}

export default CommentReplies