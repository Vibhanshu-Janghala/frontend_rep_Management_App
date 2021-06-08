const UsersOnline = (props) => {
    // props.list = [{socketId,username},...]
    const usersList = props.list.map((obj) => {
        return <div className="onlineUser">
            {obj.name}
        </div>
    })

    return (
        <div>
            {usersList}
        </div>
    )
}
export default UsersOnline;