import { useMutation } from "@apollo/client"
import { gql } from "apollo-boost"
import React, { useEffect, useState } from "react"

const PostDescription = ({ description, postId, isOpen }) => {
  const [desc, setDesc] = useState(description)
  const [isChanging, setIsChanging] = useState(false)

  const UPDATE_POST_DESCRIPTION = gql`
    mutation updatePostDescription($postId: ID!, $description: String!) {
      updatePostDescription(postId: $postId, description: $description) {
        description
      }
    }
  `
  const [updatePostDescription, { data, loading }] = useMutation(
    UPDATE_POST_DESCRIPTION
  )

  const descValue = () => {
        if (!desc) return ""
      return desc.replace(/(<br\/>)/g, "\r\n")
  }

  useEffect(() => {
    setDesc(description)
  }, [isChanging, isOpen])

  const updateClickHandler = async () => {
 
    const newDesc = desc.replace(/(\n|\r|\r\n)/g, "<br/>")

    await updatePostDescription({
      variables: { description: newDesc, postId: postId },
    })
    setIsChanging(!isChanging)
  }

  if (isChanging) {
    return (
      <div>
        <textarea
          value={descValue()}
          onChange={e => {
            setDesc(e.target.value)
          }}
          placeholder={`Enter description...`}
          className={`post post-description-textarea`}
        ></textarea>
        <div>
          {" "}
          <button onClick={updateClickHandler}>Apply</button>
          <button
            onClick={() => {
              setIsChanging(!isChanging)
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }
  return (
    <div>
      <div
        className={`post post-description-field`}
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
      <div>
        <button className = {`post post-button-div`}
          onClick={() => {
            setIsChanging(!isChanging)
          }}
        >
          Change
        </button>
      </div>
    </div>
  )
}

export default PostDescription
