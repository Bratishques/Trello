import React from "react"

const BoardTemplate = ({name}) => {

    return (
        <button className="boards board-wrap" style={{
            padding: '0',
            display: 'grid',
            gridTemplateRows: "1fr 1fr",
            justifyContent: "stretch",
            overflow: "hidden"

        }}>
         <div>Image</div>
          <div style={{
              backgroundColor: "ghostwhite",
              width: "100%",
              height: "100%",
              justifySelf: "stretch",
              alignSelf: "stretch",
              padding: "10px 20px",
              textAlign: "start",
              fontSize: "20px",
              fontWeight: "300",
              color: "rgba(0, 0, 0, 0.8)"
          }}>{name}</div>
        </button>
    )
}

export default BoardTemplate