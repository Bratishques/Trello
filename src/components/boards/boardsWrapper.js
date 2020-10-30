import { useMutation, useQuery, useSubscription } from "@apollo/client"
import { gql } from "apollo-boost"
import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/authContext"
import Loader from "../loader"
import Board from "./board"
import "./boards.scss"
import BoardTemplate from "./BoardTemplate"

const BoardsWrapper = () => {
  const [boards, setBoards] = useState([])
  const auth = useContext(AuthContext)

  const FETCH_BOARDS = gql`
    query userBoards($userId: ID!) {
      userBoards(userId: $userId) {
        name
      }
    }
  `

  const LISTEN_FOR_BOARDS = gql`
    subscription onBoardAdded($userId: ID!) {
      boardAdded(userId: $userId) {
        name
      }
    }
  `

  const { data } = useSubscription(LISTEN_FOR_BOARDS, {
    variables: { userId: auth.data.userId }, 
    onSubscriptionData: (data) =>{
        if (data.subscriptionData.data.boardAdded) {
            const candidate = data.subscriptionData.data.boardAdded
            setBoards([...boards, candidate])
        }
    }
  })


  const { loading } = useQuery(FETCH_BOARDS, {
    variables: { userId: auth.data.userId },
    onCompleted: data => {
      setBoards([...data.userBoards])
    },
  })

  if (loading) {
    return <Loader />
  }

  return (
    <div className="boards boards-wrapper">
      {boards.map((a, i) => {
        return <BoardTemplate key={i} name={a.name} />
      })}

      <Board />
    </div>
  )
}

export default BoardsWrapper
