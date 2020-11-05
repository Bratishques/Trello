import React, { useContext, useEffect } from "react"
import Thread from "./thread"
import ThreadTemplate from "./threadTemplate"
import "./threads.scss"

const ThreadsWrapper = ({ threads, boardId, subscribeToMore, SUBSCRIBE_TO_POST}) => {
  const sleep = ms => {
    return new Promise(resolve => {
      return setTimeout(resolve, ms)
    })
  }

 
 

  const scrollHandler = async (e) => {
    const scroller = document.getElementById("scrollContainer")
    const containers = document.getElementsByClassName("thread-wrapper-middle")
    for (let i = 0; i < containers.length - 1; i++) {
      const {top, bottom, left, right} = containers[i].getBoundingClientRect()
      if ((e.clientX > left && e.clientX < right) && (e.clientY > top && e.clientY < bottom)) {
        return
      }
    }
    
    if (e.deltaY > 0) {
      const timer = setInterval(() => {
        scroller.scrollLeft += 2
      }, 6)
      await sleep(300)
      clearInterval(timer)
    } else {
      const timer = setInterval(() => {
        scroller.scrollLeft -= 2
      }, 6)
      await sleep(300)
      clearInterval(timer)
    }
  }

  useEffect(() => {
    var threadIds = threads.map(a => {
      return a._id
    })
    let unsubscribe = subscribeToMore({
      document: SUBSCRIBE_TO_POST,
      variables: { threadIds: threadIds },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const newFeedItem = subscriptionData.data.postAdded
        let targetThreadIndex
        const targetThread = prev.board.threads.find((a, i) => {
          targetThreadIndex = i
          return a._id === newFeedItem.threadId
        })
        const ThreadwithNewPost = Object.assign(
          {},
          {
            ...targetThread,
            posts: [...targetThread.posts, newFeedItem],
          }
        )
        const oldThreads = i => {
          const first = prev.board.threads.slice(0, i)
          const second = prev.board.threads.slice(i + 1)
          return [first, second]
        }

        console.log(ThreadwithNewPost, targetThreadIndex)
        return Object.assign(
          {},
          {
            ...prev,
            board: {
              ...prev.board,
              threads: [
                ...oldThreads(targetThreadIndex)[0],
                ThreadwithNewPost,
                ...oldThreads(targetThreadIndex)[1],
              ],
            },
          }
        )
      },
    })

    return () => unsubscribe()
  }, [threads.length])

  return (
    <div
      id="scrollContainer"
      className="threads threads-wrapper"
      onWheel={scrollHandler}
    >
      {threads.map((a, i) => {
        return <ThreadTemplate key={i} name={a.name} posts={a.posts} id={a._id} />
      })}
      <div className="threads thread-wrapper">
        <Thread boardId = {boardId}/>
      </div>
    </div>
  )
}

export default ThreadsWrapper
