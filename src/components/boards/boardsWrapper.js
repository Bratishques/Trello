import { useMutation, useQuery, useSubscription } from "@apollo/client"
import { gql } from "apollo-boost"
import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/authContext"
import Loader from "../loader"
import Board from "./board"
import "./boards.scss"
import BoardTemplate from "./BoardTemplate"

const BoardsWrapper = () => {
  const auth = useContext(AuthContext)

  const FETCH_BOARDS = gql`
    query userBoards($userId: ID!) {
      userBoards(userId: $userId) {
        name
        _id
      }
    }
  `

  const LISTEN_FOR_BOARDS = gql`
    subscription onBoardAdded($userId: ID!) {
      boardAdded(userId: $userId) {
        name
        _id
      }
    }
  `

 /* useSubscription(LISTEN_FOR_BOARDS, {
    variables: { userId: auth.data.userId },
    onSubscriptionData: data => {
      if (data.subscriptionData.data.boardAdded) {
        const candidate = data.subscriptionData.data.boardAdded
        console.log(data.subscriptionData.data)
      }
    },
  }) */

  const { data, loading, subscribeToMore } = useQuery(FETCH_BOARDS, {
    variables: { userId: auth.data.userId },
  })

  useEffect(() => {
    subscribeToMore({
      document: LISTEN_FOR_BOARDS,
      variables: { userId: auth.data.userId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const newFeedItem = subscriptionData.data.boardAdded
        return Object.assign({}, {
          userBoards : [...prev.userBoards.concat(newFeedItem)]
        })
      },
    })
  },[])

  if (loading) {
    return <Loader />
  }

  return (
    <div className="boards boards-wrapper">
      {data.userBoards.map((a, i) => {
        return <BoardTemplate key={i} name={a.name} id={a._id} />
      })}

      <Board />
    </div>
  )
}

export default BoardsWrapper
