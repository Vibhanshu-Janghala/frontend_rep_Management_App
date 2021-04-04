import React from "react";

const ChatWindow = (props)=>{

    const renderMessages = () => {
        let messageDiv = props.chatContent.forEach((item) => {
            if (item.senderId === props.userName) {
                return <div className="iSent"><span>{item.sender}</span>
                    <span>{item.message}</span>
                </div>
            }
            return <div className="othersSent"><span>{item.sender}</span>
                    <span>{item.message}</span>
            </div>
        })

        return (<div className="messageDisplay">
            {messageDiv}
        </div>)
        }

    return(
        <div>
            <span>{props.chatTitle}</span>
            {renderMessages}
        </div>
    )
}
export default ChatWindow;