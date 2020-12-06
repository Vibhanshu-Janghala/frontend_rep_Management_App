import React from "react";

const UsersOnline = (props)=>{
    //usersList is collection of div containing individual user
    const usersList = props.list.forEach((user) => {

        return <div className="onlineUser">
            {user}
            </div>
    })

    return(
        <div>
            {usersList}
        </div>
    )
}
export default UsersOnline;