import { useMutation } from "@apollo/client"
import { gql } from "apollo-boost"
import React, { useState } from "react"

const PostDescription = ({description, postId}) => {
    const [desc, setDesc] = useState(description)
    const [isChanging, setIsChanging] = useState(false)

    const UPDATE_POST_DESCRIPTION = gql`
        mutation updatePostDescription($postId: ID!, $description: String!) {
            updatePostDescription(postId: $postId, description: $description) {
                description
            }
        }
    `
    const [updatePostDescription, {data, loading}] = useMutation(UPDATE_POST_DESCRIPTION)


    const updateClickHandler = () => {
        updatePostDescription({
            variables: {description: desc, postId: postId}
        })

    }

    if (isChanging) {
        return (
            <div>
        <input value={desc} onChange={(e) => {setDesc(e.target.value)}}></input>
        <div> <button onClick={updateClickHandler}>Apply</button><button onClick={() => {setIsChanging(!isChanging)}}>Cancel</button></div>
        </div>
        )
    }
    return (
        <div>
           <div>{description}</div>
           <div><button onClick={() => {setIsChanging(!isChanging)}}>Change</button></div>
        </div>

    )
}

export default PostDescription