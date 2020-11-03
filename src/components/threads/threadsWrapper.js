import React, { useContext } from "react"
import Thread from "./thread"
import ThreadTemplate from "./threadTemplate"
import "./threads.scss"

const ThreadsWrapper = ({ threads, boardId }) => {
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
