import React from "react"
import PostAdder from "../post/postAdder"
import PostTemplate from "../post/postTemplate"

const ThreadTemplate = ({name, posts, id}) => {
    return (
        <div className= "threads thread-wrapper">
        <div className="thread thread-scroll-wrap">
            <div className="threads thread-wrapper-top">
            <h3 style={{
                margin:"0"
            }}>{name}</h3>
            </div>
            <div className="threads thread-wrapper-middle">
            {posts.map((a,i) => {
                return <PostTemplate name = {a.name} key={i} id = {a._id}/>
            })}
            <PostAdder id ={id} />
            </div>
            <div className="threads thread-wrapper-bottom">
            To be added
            </div>
            </div>
        </div>
    )

}

export default ThreadTemplate