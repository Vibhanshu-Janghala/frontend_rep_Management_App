import React from "react"
const NavPane = (props) =>{

    // props.user has name and level
    return(
        <>
            <div>Render User Name and level</div>
            <nav>
                <Link to="/">Announcements</Link>
                <Link to="/todolist">ToDo List</Link>
                <Link to="/workflow">Workflow</Link>
                <Link to="/chat">Chat</Link>
            </nav>
        </>
    )
}
export default NavPane;