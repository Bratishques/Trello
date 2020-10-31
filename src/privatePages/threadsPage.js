import { useQuery } from "@apollo/client"
import { gql } from "apollo-boost"
import React  from "react"
import { useContext } from "react"
import ThreadsWrapper from "../components/threads/threadsWrapper"
import { AuthContext } from "../context/authContext"

const ThreadsPage = ({id}) => {
    const auth = useContext(AuthContext)
    const FETCH_BOARD_DATA = gql`
        query board($userId: ID!, $boardId: ID!){
            board(userId: $userId, boardId: $boardId) {
                name
            }
        }
    
    `
    const {data, loading, error} = useQuery(FETCH_BOARD_DATA, {
        variables: {userId: auth.data.userId, boardId: id}
    })

    return (
        <div>
            <h1>Threads at {loading ? `..Loading` : data.board.name}</h1>
            {!loading && <ThreadsWrapper/>}
        </div>
    )
}

export default ThreadsPage