import React from "react";


    // props contain chat room names and state handler for rooms
const ChatRooms = (props )=>{

    const  setItem = (e)=> (props.onChange(e.target.name));

    const list = props.rooms.forEach((item)=>{
        return <buttom type="button" name={item} onClick={(e)=>{setItem(e)}}>
            {item}
        </buttom>
    })

    return(
        <div>
            {list}
        </div>
    )
}

export default ChatRooms;