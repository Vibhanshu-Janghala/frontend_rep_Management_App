
const AppHeader = (props)=>{
    let header ="Home";
    if(props.headerUrl === ""){
        header = "Home"
    }
    else if(props.headerUrl === "announcement"){
        header = "Announcement"
    }
    else if(props.headerUrl === "todolist"){
        header = "To Do List"
    }
    else if(props.headerUrl === "online"){
        header = "Users Online"
    }
    else if(props.headerUrl === "chat"){
        header = "Chat"
    }
    else if(props.headerUrl === "workflow"){
        header = "Workflow"
    }
    return(
        <span>{header}</span>
    )
}
export default AppHeader;